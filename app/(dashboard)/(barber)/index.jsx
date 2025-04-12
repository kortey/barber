import React from 'react';
import { Link } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Colors } from '@/constants/Colors'; // Assuming Colors.ts is in constants folder
import { Ionicons } from '@expo/vector-icons'; // Using Expo's vector icons

// Dummy Data (Replace with actual data fetching)
const barberName = 'Alex';
const appointments = [
  {
    id: '1',
    clientName: 'John Doe',
    clientPhoto: 'https://via.placeholder.com/40', // Placeholder image
    time: '10:00 AM',
    style: 'Fade Cut',
    status: 'Pending',
  },
  {
    id: '2',
    clientName: 'Jane Smith',
    clientPhoto: 'https://via.placeholder.com/40',
    time: '11:30 AM',
    style: 'Beard Trim',
    status: 'Pending',
  },
  {
    id: '3',
    clientName: 'Mike Johnson',
    clientPhoto: 'https://via.placeholder.com/40',
    time: '01:00 PM',
    style: 'Classic Cut',
    status: 'In Progress',
  },
  {
    id: '4',
    clientName: 'Sarah Lee',
    clientPhoto: 'https://via.placeholder.com/40',
    time: '02:30 PM',
    style: 'Hair Color',
    status: 'Done',
  },
  // Add more appointments if needed
];

const quickStats = [
  { label: 'Appointments Today', value: appointments.length, icon: 'calendar-outline' },
  { label: 'Completed', value: appointments.filter(a => a.status === 'Done').length, icon: 'checkmark-done-outline' },
  { label: 'Pending', value: appointments.filter(a => a.status === 'Pending').length, icon: 'time-outline' },
  // { label: 'Avg. Rating', value: '4.8', icon: 'star-outline' }, // Optional
];

const quickActions = [
  { label: 'View Schedule', icon: 'calendar-outline', screen: '/schedule' }, // Example screen path
  { label: 'Set Availability', icon: 'timer-outline', screen: '/availability' },
  { label: 'My Reviews', icon: 'star-outline', screen: '/reviews' },
  { label: 'Edit Profile', icon: 'person-outline', screen: '/profile/edit' },
];

const BarberDashboard = () => {
  const colors = Colors.dark; // Use dark theme colors

  const renderAppointmentItem = ({ item }) => (
    <Link href={`/appointment/${item.id}`} style={{ flex: 1 }}>
    <View style={[styles.appointmentCard, { backgroundColor: colors.cardSurface }]}>
      <View style={styles.appointmentInfo}>
        <Image source={{ uri: item.clientPhoto }} style={styles.clientPhoto} />
        <View style={styles.appointmentText}>
          <Text style={[styles.clientName, { color: colors.text }]}>{item.clientName}</Text>
          <Text style={[styles.appointmentDetail, { color: colors.textSecondary }]}>
            {item.time} - {item.style}
          </Text>
        </View>
      </View>
      <View style={styles.appointmentStatusContainer}>
        <Text
          style={[
            styles.appointmentStatus,
            {
              color:
                item.status === 'Done'
                  ? colors.success
                  : item.status === 'In Progress'
                  ? colors.warning // Using warning color for In Progress
                  : colors.textSecondary,
            },
          ]}
        >
          {item.status}
        </Text>
        {item.status === 'Pending' && (
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]}>
            <Text style={[styles.actionButtonText, { color: colors.text }]}>Start</Text>
          </TouchableOpacity>
        )}
        {item.status === 'In Progress' && (
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.success }]}>
            <Text style={[styles.actionButtonText, { color: colors.text }]}>Done</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
    </Link>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>Welcome back,</Text>
          <Text style={[styles.barberName, { color: colors.text }]}>{barberName} 👋</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={26} color={colors.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            {/* Replace with actual avatar */}
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Today's Appointments */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Appointments</Text>
        <FlatList
          data={appointments}
          renderItem={renderAppointmentItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false} // Disable FlatList scrolling, rely on ScrollView
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // Add space between cards
        />
      </View>

      {/* Quick Stats */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Stats</Text>
        <View style={styles.statsGrid}>
          {quickStats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: colors.cardSurface }]}>
              <Ionicons name={stat.icon} size={24} color={colors.primary} />
              <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionCard, { backgroundColor: colors.cardSurface }]}
              onPress={() => console.log(`Navigate to ${action.screen}`)} // Add navigation logic here
            >
              <Ionicons name={action.icon} size={28} color={colors.secondary} />
              <Text style={[styles.actionLabel, { color: colors.textSecondary }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
  },
  barberName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light background for icons
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  // Appointment Card Styles
  appointmentCard: {
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000', // Basic shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Allow info to take available space
  },
  clientPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor:"#000",
  },
  appointmentText: {
    flex: 1, // Allow text to wrap if needed
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  appointmentDetail: {
    fontSize: 14,
  },
  appointmentStatusContainer: {
    alignItems: 'flex-end',
  },
  appointmentStatus: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  // Stats Styles
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow wrapping if needed
    justifyContent: 'space-between', // Distribute space
    marginHorizontal: -5, // Counteract card margin
  },
  statCard: {
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%', // Roughly two cards per row with spacing
    marginBottom: 10,
    minHeight: 100, // Ensure consistent height
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 13,
    textAlign: 'center',
  },
  // Actions Styles
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -5,
    paddingBottom:30,
  },
  actionCard: {
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    marginBottom: 10,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default BarberDashboard;
