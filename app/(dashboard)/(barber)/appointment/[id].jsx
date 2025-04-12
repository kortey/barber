import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';

export default function AppointmentDetails() {
  const router = useRouter();
  const {id} = useLocalSearchParams(); // Get the appointment ID from the URL params
  
  // Example appointment data - in real app, fetch this from API/params
  const appointment = {
    client: {
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      profilePic: "https://example.com/profile.jpg"
    },
    date: "2025-04-10T14:30:00",
    duration: 45,
    id: "APT123456",
    status: "pending",
    service: {
      name: "Fade + Beard Trim",
      notes: "Please keep the sides extra short",
    }
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return { backgroundColor: Colors.dark.success };
      case 'in_progress':
        return { backgroundColor: Colors.dark.warning };
      case 'completed':
        return { backgroundColor: Colors.dark.primary };
      case 'cancelled':
        return { backgroundColor: Colors.dark.danger };
      default:
        return { backgroundColor: Colors.dark.warning };
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />
      
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={Colors.dark.text} />
          </TouchableOpacity>
          <ThemedText type="subtitle">Appointment Details</ThemedText>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color={Colors.dark.text} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Client Info Card */}
          <View style={styles.card}>
            <View style={styles.clientHeader}>
              <Image 
                source={{ uri: appointment.client.profilePic }}
                style={styles.profilePic}
                defaultSource={require('@/assets/images/icon.png')}
              />
              <View style={styles.clientInfo}>
                <ThemedText type="defaultSemiBold">{appointment.client.name}</ThemedText>
                <ThemedText style={styles.phone}>{appointment.client.phone}</ThemedText>
              </View>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.actionButton, styles.messageButton]}>
                <Ionicons name="chatbubble-outline" size={20} color={Colors.dark.primary} />
                <ThemedText style={styles.actionButtonText}>Message</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.callButton]}>
                <Ionicons name="call-outline" size={20} color={Colors.dark.primary} />
                <ThemedText style={styles.actionButtonText}>Call</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Appointment Info Card */}
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Ionicons name="calendar-outline" size={20} color={Colors.dark.textSecondary} />
                <ThemedText style={styles.infoLabel}>Date & Time</ThemedText>
                <ThemedText style={styles.infoValue}>
                  {new Date(appointment.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </ThemedText>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={20} color={Colors.dark.textSecondary} />
                <ThemedText style={styles.infoLabel}>Duration</ThemedText>
                <ThemedText style={styles.infoValue}>{appointment.duration} min</ThemedText>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Ionicons name="bookmark-outline" size={20} color={Colors.dark.textSecondary} />
                <ThemedText style={styles.infoLabel}>Appointment ID</ThemedText>
                <ThemedText style={styles.infoValue}>{appointment.id}</ThemedText>
              </View>
              <View style={styles.infoItem}>
                <View style={[styles.statusBadge, getStatusStyle(appointment.status)]}>
                  <ThemedText style={styles.statusText}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>

          {/* Service Details Card */}
          <View style={styles.card}>
            <ThemedText style={styles.cardTitle}>Service Details</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.serviceName}>
              {appointment.service.name}
            </ThemedText>
            <ThemedText style={styles.notes}>{appointment.service.notes}</ThemedText>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.bottomActions}>
          {appointment.status === 'pending' && (
            <TouchableOpacity style={[styles.mainButton, styles.startButton]}>
              <ThemedText style={styles.mainButtonText}>Start Appointment</ThemedText>
            </TouchableOpacity>
          )}
          {appointment.status === 'in_progress' && (
            <TouchableOpacity style={[styles.mainButton, styles.completeButton]}>
              <ThemedText style={styles.mainButtonText}>Mark as Complete</ThemedText>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.cancelButton}>
            <ThemedText style={styles.cancelButtonText}>Cancel Appointment</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: Colors.dark.background,
  },
  backButton: {
    padding: 8,
  },
  moreButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: Colors.dark.cardSurface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  clientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  clientInfo: {
    flex: 1,
  },
  phone: {
    color: Colors.dark.textSecondary,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.dark.primary,
    gap: 8,
  },
  actionButtonText: {
    color: Colors.dark.primary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
    gap: 4,
  },
  infoLabel: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '600',
  },
  cardTitle: {
    color: Colors.dark.textSecondary,
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 18,
    marginBottom: 8,
  },
  notes: {
    color: Colors.dark.textSecondary,
    lineHeight: 20,
  },
  bottomActions: {
    padding: 16,
    gap: 12,
  },
  mainButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: Colors.dark.primary,
  },
  completeButton: {
    backgroundColor: Colors.dark.success,
  },
  mainButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.danger,
  },
  cancelButtonText: {
    color: Colors.dark.danger,
    fontSize: 16,
    fontWeight: '600',
  },
});