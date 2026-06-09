import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

// SESSION 1 — "Hello, Mobile World"
// A static profile card. Practice: components, View/Text/Image, StyleSheet, Flexbox.
// Make it yours: change the name, photo, bio, and info rows.

export default function App() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StatusBar style="light" />

      <View style={styles.card}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://i.pravatar.cc/300?img=12' }}
        />

        <Text style={styles.name}>Juan dela Cruz</Text>
        <Text style={styles.role}>Future Mobile Developer</Text>

        <View style={styles.bioBox}>
          <Text style={styles.bioText}>
            👋 Hi! I'm learning to build mobile apps with React Native & Expo.
            This entire screen is my very first app — made on my own phone!
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📍 Location</Text>
          <Text style={styles.infoValue}>Batangas City, PH</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🎓 School</Text>
          <Text style={styles.infoValue}>University of Batangas</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>💡 Learning</Text>
          <Text style={styles.infoValue}>React Native + Expo</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#4338CA',
  },
  content: {
    padding: 20,
    paddingTop: 80,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#06B6D4',
    marginBottom: 12,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  role: {
    fontSize: 16,
    color: '#06B6D4',
    fontWeight: '600',
    marginBottom: 16,
  },
  bioBox: {
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  bioText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  infoLabel: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '600',
  },
});
