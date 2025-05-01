import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Platform,
  Modal,
  FlatList,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';

const generateTimeSlots = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      times.push(timeString);
    }
  }
  return times;
};

export default function AvailabilityScreen() {
  const [schedule, setSchedule] = useState([
    { day: 'Monday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Tuesday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Wednesday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Thursday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Friday', enabled: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Saturday', enabled: true, startTime: '10:00', endTime: '16:00' },
    { day: 'Sunday', enabled: false, startTime: '10:00', endTime: '16:00' },
  ]);

  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeType, setSelectedTimeType] = useState(null);
  const timeSlots = generateTimeSlots();


  const showTimePicker = (day, timeType) => {
    setSelectedDay(day);
    setSelectedTimeType(timeType);
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
    setSelectedDay(null);
    setSelectedTimeType(null);
  };

  const handleTimeSelect = (time) => {
    const dayIndex = schedule.findIndex(item => item.day === selectedDay);
    if (dayIndex !== -1) {
      const newSchedule = [...schedule];
      newSchedule[dayIndex] = {
        ...newSchedule[dayIndex],
        [selectedTimeType === 'start' ? 'startTime' : 'endTime']: time
      };
      setSchedule(newSchedule);
    }
    hideTimePicker();
  };

  const toggleDay = (day) => {
    const newSchedule = schedule.map(item => {
      if (item.day === day) {
        return { ...item, enabled: !item.enabled };
      }
      return item;
    });
    setSchedule(newSchedule);
  };

  const handleSave = () => {
    console.log('Schedule saved:', schedule);
  };

  const renderTimePickerModal = () => (
    <Modal
      visible={isTimePickerVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={hideTimePicker}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ThemedText style={styles.modalHeader}>
            Select {selectedTimeType === 'start' ? 'Start' : 'End'} Time
          </ThemedText>
          <FlatList
            data={timeSlots}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.timeItem}
                onPress={() => handleTimeSelect(item)}
              >
                <ThemedText style={styles.timeItemText}>{item}</ThemedText>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity style={styles.cancelButton} onPress={hideTimePicker}>
            <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="title" style={styles.header}>
          Set Your Availability
        </ThemedText>
        
        {schedule.map((item) => (
          <View key={item.day} style={styles.dayCard}>
            <View style={styles.dayHeader}>
              <ThemedText type="defaultSemiBold" style={styles.dayText}>
                {item.day}
              </ThemedText>
              <Switch
                value={item.enabled}
                onValueChange={() => toggleDay(item.day)}
                trackColor={{ 
                  false: Colors.dark.cardSurface,
                  true: Colors.dark.primary
                }}
                thumbColor={Platform.OS === 'android' ? Colors.dark.text : undefined}
              />
            </View>
            
            {item.enabled && (
              <View style={styles.timeContainer}>
                <TouchableOpacity 
                  style={styles.timeButton}
                  onPress={() => showTimePicker(item.day, 'start')}
                >
                  <ThemedText style={styles.timeLabel}>Start</ThemedText>
                  <ThemedText style={styles.timeText}>{item.startTime}</ThemedText>
                </TouchableOpacity>
                
                <ThemedText style={styles.timeText}>to</ThemedText>
                
                <TouchableOpacity 
                  style={styles.timeButton}
                  onPress={() => showTimePicker(item.day, 'end')}
                >
                  <ThemedText style={styles.timeLabel}>End</ThemedText>
                  <ThemedText style={styles.timeText}>{item.endTime}</ThemedText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
        </TouchableOpacity>
      </View>

      {renderTimePickerModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    paddingBottom: Platform.OS === 'android' ? 20 : 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
    fontSize: 28,
    textAlign: 'center',
  },
  dayCard: {
    backgroundColor: Colors.dark.cardSurface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: item => item.enabled ? 16 : 0,
  },
  dayText: {
    fontSize: 18,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  timeButton: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    maxWidth: '40%',
  },
  timeLabel: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(203, 213, 225, 0.1)',
  },
  saveButton: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.dark.cardSurface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 16,
    maxHeight: '70%',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  timeItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(203, 213, 225, 0.1)',
  },
  timeItemText: {
    fontSize: 16,
    textAlign: 'center',
  },
  cancelButton: {
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  cancelButtonText: {
    color: Colors.dark.primary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});