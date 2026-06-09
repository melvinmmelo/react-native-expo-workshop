import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// SESSION 2 — "Make It Interactive"
// An in-memory To-Do list. Practice: useState, onPress, TextInput,
// arrays in state (spread/filter/map), FlatList, and a child component with props.
// NOTE: tasks live in memory only — they reset when the app restarts.
//       Session 3 fixes that with a real SQLite database.

function TodoItem({ task, onToggle, onDelete }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.itemLeft} onPress={onToggle}>
        <Text style={styles.checkbox}>{task.done ? '✅' : '⬜️'}</Text>
        <Text style={styles.itemText}>{task.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} hitSlop={10}>
        <Text style={styles.delete}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Welcome to your To-Do app 👋', done: false },
    { id: 2, title: 'Tap a task to mark it done', done: false },
  ]);

  function addTask() {
    const title = text.trim();
    if (title === '') return; // ignore empty input
    const newTask = { id: Date.now(), title, done: false };
    setTasks([newTask, ...tasks]); // new array, new task on top
    setText(''); // clear the box
  }

  function toggleTask(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>{remaining} left to do</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          placeholderTextColor="#94A3B8"
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text style={styles.addBtnText}>＋</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No tasks yet. Add one above! ✨</Text>
        }
        renderItem={({ item }) => (
          <TodoItem
            task={item}
            onToggle={() => toggleTask(item.id)}
            onDelete={() => deleteTask(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F1F5F9', paddingTop: 60 },
  header: { paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#0F172A' },
  subtitle: { fontSize: 15, color: '#64748B', marginTop: 2 },
  inputRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  addBtn: {
    width: 48,
    backgroundColor: '#4338CA',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: { color: '#FFFFFF', fontSize: 28, fontWeight: '600', lineHeight: 30 },
  list: { paddingHorizontal: 20, paddingBottom: 40 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 12 },
  checkbox: { fontSize: 20 },
  itemText: { fontSize: 16, color: '#0F172A', flexShrink: 1 },
  // Used in the Session 2 stretch goal (strike-through completed tasks):
  itemTextDone: { textDecorationLine: 'line-through', color: '#94A3B8' },
  delete: { fontSize: 20, paddingLeft: 12 },
  empty: { textAlign: 'center', color: '#94A3B8', marginTop: 40, fontSize: 16 },
});
