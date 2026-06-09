#!/usr/bin/env bash
#
# build-pdfs.sh — regenerate every workshop PDF into ./pdf
#
# Requirements: Node.js (provides npx) and Google Chrome / Chromium.
# Nothing is installed globally — Marp CLI and marked are fetched on demand via npx.
#
# Produces, in ./pdf:
#   session-N-slides.pdf           clean projection deck
#   session-N-presenter.pdf        same slides + speaker notes embedded as PDF notes
#   session-N-presenter-guide.pdf  full run-of-show handout (flowing pages)
#   session-N-activity.pdf         student worksheet
#   student-setup-guide.pdf
#   final-project-brief.pdf
#
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p pdf

# --- locate Chrome (used by Marp for slides AND by the doc renderer) ---
CHROME_BIN="$(command -v google-chrome || command -v google-chrome-stable || command -v chromium || command -v chromium-browser || true)"
if [ -z "$CHROME_BIN" ]; then
  echo "❌ Google Chrome / Chromium not found — install it to render PDFs."
  exit 1
fi
export CHROME_PATH="$CHROME_BIN"
echo "🌐 Using Chrome: $CHROME_BIN"

MARP="npx --yes @marp-team/marp-cli@latest"

echo "🎞️  Rendering slide decks (Marp)…"
for s in 1 2 3; do
  echo "   • Session $s — clean deck"
  $MARP "slides/session-$s.md" --theme-set theme/workshop.css --allow-local-files \
        --pdf -o "pdf/session-$s-slides.pdf"
  echo "   • Session $s — presenter deck (speaker notes embedded)"
  $MARP "slides/session-$s.md" --theme-set theme/workshop.css --allow-local-files \
        --pdf --pdf-notes -o "pdf/session-$s-presenter.pdf"
done

# --- flowing handout PDFs: Markdown -> HTML -> Chrome print-to-pdf ---
render_doc () {
  local md="$1" out="$2" title="$3"
  local tmp; tmp="$(mktemp --suffix=.html)"
  {
    printf '<!doctype html><html><head><meta charset="utf-8"><title>%s</title><style>\n' "$title"
    cat theme/doc.css
    printf '\n</style></head><body>\n'
    npx --yes marked@latest -i "$md"
    printf '\n</body></html>\n'
  } > "$tmp"
  "$CHROME_BIN" --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer \
      --print-to-pdf="$out" "file://$tmp" >/dev/null 2>&1
  rm -f "$tmp"
  echo "   • $out"
}

echo "📄 Rendering handout PDFs (Chrome)…"
render_doc "presenter-notes/session-1.md"   "pdf/session-1-presenter-guide.pdf" "Session 1 — Presenter Guide"
render_doc "presenter-notes/session-2.md"   "pdf/session-2-presenter-guide.pdf" "Session 2 — Presenter Guide"
render_doc "presenter-notes/session-3.md"   "pdf/session-3-presenter-guide.pdf" "Session 3 — Presenter Guide"
render_doc "activities/session-1-activity.md" "pdf/session-1-activity.pdf" "Activity 1 — About Me Card"
render_doc "activities/session-2-activity.md" "pdf/session-2-activity.pdf" "Activity 2 — To-Do App"
render_doc "activities/session-3-activity.md" "pdf/session-3-activity.pdf" "Activity 3 — SQLite CRUD"
render_doc "setup/student-setup-guide.md"   "pdf/student-setup-guide.pdf" "Student Setup Guide"
render_doc "final-project/BRIEF.md"         "pdf/final-project-brief.pdf" "Final Project Brief"

echo ""
echo "✅ Done. PDFs in ./pdf:"
ls -1 pdf
