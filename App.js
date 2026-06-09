import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as DB from './db';

// SESSION 3 — "Save It For Real"
// A persistent CRUD app backed by on-device SQLite (see db.js).
// Practice: useEffect, the change->refresh pattern, full CRUD, a Modal
// "second screen" for add/edit, and Alert confirm-before-delete.

function TaskRow({ task, onToggle, onEdit, onDelete }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.itemLeft} onPress={onToggle}>
        <Text style={styles.checkbox}>{task.done ? '✅' : '⬜️'}</Text>
        <Text style={[styles.itemText, task.done && styles.itemTextDone]}>
          {task.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onEdit} hitSlop={8}>
        <Text style={styles.action}>✏️</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} hitSlop={8}>
        <Text style={styles.action}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState(null); // null = adding, otherwise editing this id

  // run ONCE when the app starts: create the table, then load saved tasks
  useEffect(() => {
    DB.setupDatabase();
    refresh();
  }, []);

  function refresh() {
    setTasks(DB.getTasks()); // re-read the database into state
  }

  function openAdd() {
    setEditingId(null);
    setDraft('');
    setModalVisible(true);
  }

  function openEdit(task) {
    setEditingId(task.id);
    setDraft(task.title);
    setModalVisible(true);
  }

  function save() {
    const title = draft.trim();
    if (title === '') return;
    if (editingId === null) {
      DB.addTask(title); // CREATE
    } else {
      DB.updateTask(editingId, title); // UPDATE
    }
    setModalVisible(false);
    refresh();
  }

  function toggle(task) {
    DB.toggleTask(task.id, !task.done); // UPDATE done
    refresh();
  }

  function remove(task) {
    Alert.alert('Delete task?', `"${task.title}"`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          DB.deleteTask(task.id); // DELETE
          refresh();
        },
      },
    ]);
  }

  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>{remaining} left · saved on this device 💾</Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No tasks yet. Tap ＋ to add one! ✨</Text>
        }
        renderItem={({ item }) => (
          <TaskRow
            task={item}
            onToggle={() => toggle(item)}
            onEdit={() => openEdit(item)}
            onDelete={() => remove(item)}
          />
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={openAdd}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      {/* The "second screen": a pop-up form used for BOTH add and edit */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {editingId === null ? 'New Task' : 'Edit Task'}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="What needs doing?"
              placeholderTextColor="#94A3B8"
              value={draft}
              onChangeText={setDraft}
              autoFocus
              onSubmitEditing={save}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.saveBtn]}
                onPress={save}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F1F5F9', paddingTop: 60 },
  header: { paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#0F172A' },
  subtitle: { fontSize: 14, color: '#64748B', marginTop: 2 },
  list: { paddingHorizontal: 20, paddingBottom: 100 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    gap: 8,
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 12 },
  checkbox: { fontSize: 20 },
  itemText: { fontSize: 16, color: '#0F172A', flexShrink: 1 },
  itemTextDone: { textDecorationLine: 'line-through', color: '#94A3B8' },
  action: { fontSize: 18 },
  empty: { textAlign: 'center', color: '#94A3B8', marginTop: 60, fontSize: 16 },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 36,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4338CA',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  fabText: { color: '#FFFFFF', fontSize: 32, lineHeight: 34 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#0F172A', marginBottom: 16 },
  modalInput: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#0F172A',
  },
  modalButtons: { flexDirection: 'row', gap: 12, marginTop: 16 },
  modalBtn: { flex: 1, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  cancelBtn: { backgroundColor: '#F1F5F9' },
  cancelText: { color: '#475569', fontWeight: '600', fontSize: 16 },
  saveBtn: { backgroundColor: '#4338CA' },
  saveText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
});
