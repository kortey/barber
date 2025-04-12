import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  const [selectedTimeType, setSelectedTimeType] = useState(null); // 'start' or 'end'
  const [selectedTime, setSelectedTime] = useState(new Date());

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

  const handleTimeChange = (event, date) => {
    if (Platform.OS === 'android') {
      hideTimePicker();
    }
    
    if (event.type === 'dismissed') {
      hideTimePicker();
      return;
    }

    if (date) {
      const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      const dayIndex = schedule.findIndex(item => item.day === selectedDay);
      
      if (dayIndex !== -1) {
        const newSchedule = [...schedule];
        newSchedule[dayIndex] = {
          ...newSchedule[dayIndex],
          [selectedTimeType === 'start' ? 'startTime' : 'endTime']: timeString
        };
        setSchedule(newSchedule);
      }
    }

    if (Platform.OS === 'android') {
      hideTimePicker();
    }
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
    // Save schedule to backend
    console.log('Saving schedule:', schedule);
  };

  return (
    <ThemedView style={styles.container}>
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

      {isTimePickerVisible && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={handleTimeChange}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
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
});