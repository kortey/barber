import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  Platform,
  Image, // Keep Image if you plan to use actual photos for barbers
} from 'react-native';
import { Calendar } from 'react-native-calendars'; // Import Calendar
import { Colors } from '@/constants/Colors'; // Assuming your Colors setup

// --- Helper Function to get today's date in YYYY-MM-DD format ---
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// --- Helper Function to format YYYY-MM-DD for display ---
const formatDateForDisplay = (dateString) => {
  if (!dateString) return '';
  // Ensure parsing considers local timezone by adding time component
  const dateObj = new Date(dateString + 'T00:00:00'); 
  return dateObj.toLocaleDateString(undefined, { // Use device locale settings
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  });
}

// Placeholder Data (Keep as is)
const services = [
  { id: '1', name: 'Haircut', price: 30, time: '45 min' },
  { id: '2', name: 'Beard Trim', price: 15, time: '20 min' },
  { id: '3', name: 'Haircut & Beard Trim', price: 40, time: '60 min' },
  { id: '4', name: 'Shave', price: 25, time: '30 min' },
  { id: '5', name: 'Hair Coloring', price: 55, time: '90 min' },
];

const barbers = [
  { id: 'b1', name: 'John Doe', rating: 4.8, available: true, photo: 'https://via.placeholder.com/80' },
  { id: 'b2', name: 'Mike Smith', rating: 4.5, available: true, photo: 'https://via.placeholder.com/80' },
  { id: 'b3', name: 'Alex Johnson', rating: 4.9, available: false, photo: 'https://via.placeholder.com/80' },
  { id: 'b4', name: 'Chris Lee', rating: 4.7, available: true, photo: 'https://via.placeholder.com/80' },
];

// Dummy available time slots - In a real app, fetch these based on barber AND date
const getAvailableTimesForDate = (barberId, dateString) => {
  console.log(`Fetching times for barber ${barberId} on ${dateString}`);
  // Replace with actual logic (API call, etc.)
  // For now, return dummy data, maybe slightly varying it based on date?
  if (dateString.endsWith('5')) { // Example: fewer slots on days ending in 5
      return ['10:00 AM', '01:00 PM', '03:30 PM'];
  }
  return ['09:00 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];
};


// Use dark theme colors according to your color palette
const themeColors = Colors.dark; // Make sure Colors.dark exists and is structured correctly
const accentColor = themeColors.primary; // e.g., '#4361EE'
const secondaryColor = themeColors.secondary; // e.g., '#F72585'
const backgroundColor = themeColors.background; // e.g., '#3A0CA3'
const cardColor = themeColors.cardSurface; // e.g., '#7209B7'
const textColor = themeColors.text; // e.g., '#F8FAFC'
const secondaryTextColor = themeColors.textSecondary; // e.g., '#CBD5E1'
const successColor = themeColors.success; // e.g., '#4CC9F0'
const disabledColor = themeColors.disabled || '#a0a0a0'; // Add a disabled color

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  // Store date as YYYY-MM-DD string for react-native-calendars
  const [selectedDate, setSelectedDate] = useState(getTodayDateString()); 
  const [selectedTime, setSelectedTime] = useState(null);
  const [userName, setUserName] = useState('Richie Rich'); // Pre-filled example
  const [userPhone, setUserPhone] = useState('123-456-7890'); // Pre-filled example
  const [notes, setNotes] = useState('');

  // State for available times based on selection
  const [availableTimes, setAvailableTimes] = useState([]);

  // --- Calendar Theme ---
  const calendarTheme = useMemo(() => ({
    backgroundColor: backgroundColor,
    calendarBackground: cardColor, // Background for the calendar itself
    textSectionTitleColor: successColor,
    selectedDayBackgroundColor: secondaryColor,
    selectedDayTextColor: backgroundColor, // High contrast for selected date text
    todayTextColor: successColor, // Color for today's date number
    dayTextColor: textColor,
    textDisabledColor: disabledColor, // Color for dates outside min/max range or disabled month days
    dotColor: secondaryColor, // Color for marking dots
    selectedDotColor: textColor,
    arrowColor: successColor, // Color for month navigation arrows
    disabledArrowColor: disabledColor,
    monthTextColor: textColor,
    indicatorColor: successColor,
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '500',
    textDayFontSize: 16,
    textMonthFontSize: 18,
    textDayHeaderFontSize: 14,
    // You can add more theme properties from react-native-calendars documentation
    'stylesheet.calendar.header': { // Example: Customize header if needed
        week: {
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderBottomWidth: 1,
            borderColor: secondaryTextColor + '40', // Add some transparency
            paddingBottom: 8,
            marginBottom: 5,
        },
        dayHeader: {
            color: secondaryTextColor, // Color for Mon, Tue, Wed etc.
            fontWeight: 'bold',
        }
    }
  }), [backgroundColor, cardColor, successColor, secondaryColor, textColor, disabledColor, secondaryTextColor]);

  // --- Marked Dates for Calendar ---
  const markedDates = useMemo(() => {
    if (!selectedDate) return {};
    return {
      [selectedDate]: {
        selected: true,
        selectedColor: secondaryColor,
        selectedTextColor: backgroundColor, // Ensure high contrast
        // disableTouchEvent: true, // Keep it interactive if needed
      },
      // Optionally mark today differently if it's not selected
      // [getTodayDateString()]: { 
      //   // Add marking for today if it's not the selected date
      //   ...(selectedDate !== getTodayDateString() && { marked: true, dotColor: successColor }) 
      // }
    };
  }, [selectedDate, secondaryColor, backgroundColor]);

  // --- Update Available Times when Barber or Date changes ---
  React.useEffect(() => {
    if (selectedBarber && selectedDate) {
      // Fetch or calculate available times based on the selected barber and date
      const times = getAvailableTimesForDate(selectedBarber.id, selectedDate);
      setAvailableTimes(times);
      setSelectedTime(null); // Reset selected time when available times change
    } else {
      setAvailableTimes([]); // Clear times if no barber/date
    }
  }, [selectedBarber, selectedDate]);


  // --- Event Handlers ---
  const handleDayPress = (day) => {
    // day object contains { dateString: 'YYYY-MM-DD', day: DD, month: MM, year: YYYY, timestamp: ... }
    console.log('Selected day:', day.dateString);
    setSelectedDate(day.dateString);
    setSelectedTime(null); // Reset time selection when date changes
    // Note: useEffect will trigger to update availableTimes
  };

  const handleBooking = () => {
    if (!selectedService || !selectedBarber || !selectedDate || !selectedTime) {
      Alert.alert('Missing Information', 'Please select a service, barber, date, and time.');
      return;
    }
    // Add booking logic here (e.g., API call)
    Alert.alert(
      'Booking Confirmed!',
      `Service: ${selectedService.name}\nBarber: ${selectedBarber.name}\nDate: ${formatDateForDisplay(selectedDate)}\nTime: ${selectedTime}\nTotal: $${selectedService.price}`,
      [{ text: 'OK' }]
    );
    // Reset state or navigate away
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDate(getTodayDateString()); // Reset date to today
    setSelectedTime(null);
    setNotes('');
    // Maybe reset user info too, or keep it pre-filled
    // setUserName('');
    // setUserPhone('');
  };

  // --- Render Functions ---
  const renderService = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.serviceCard,
        selectedService?.id === item.id && styles.selectedCard,
      ]}
      onPress={() => setSelectedService(item)}
    >
      <Text style={styles.serviceName}>{item.name}</Text>
      <View style={styles.serviceDetailsContainer}>
        <Text style={styles.servicePrice}>${item.price}</Text>
        <Text style={styles.serviceTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderBarber = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.barberCard,
        selectedBarber?.id === item.id && styles.selectedBarberCard,
        !item.available && styles.disabledCard,
      ]}
      onPress={() => {
          if (item.available) {
              setSelectedBarber(item);
              setSelectedTime(null); // Reset time when barber changes
          }
      }}
      disabled={!item.available}
    >
      {/* Replace Placeholder with actual Image if you have URLs */}
      {item.photo ? (
         <Image source={{ uri: item.photo }} style={styles.barberPhoto} />
      ) : (
         <View style={styles.barberPhotoPlaceholder} />
      )}
      <View style={styles.barberInfo}>
        <Text style={styles.barberName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.barberRating}>⭐️ {item.rating}</Text>
        </View>
        {!item.available && <Text style={styles.barberAvailability}>Unavailable</Text>}
      </View>
    </TouchableOpacity>
  );

  const renderTimeSlot = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.timeSlot,
        selectedTime === item && styles.selectedTimeSlot,
      ]}
      onPress={() => setSelectedTime(item)}
    >
      <Text style={[
        styles.timeSlotText,
        selectedTime === item && styles.selectedTimeSlotText
      ]}>{item}</Text>
    </TouchableOpacity>
  );

  // --- Main Return ---
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Book Your Appointment</Text>

      {/* Service Selection */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>1. Select Service</Text>
        <FlatList
          data={services}
          renderItem={renderService}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />
      </View>

      {/* Barber Selection */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>2. Select Barber</Text>
        <FlatList
          data={barbers}
          renderItem={renderBarber}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />
      </View>

      {/* Date Picker - Using react-native-calendars */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>3. Select Date</Text>
        <Calendar
          // current={selectedDate} // Set the initial visible month (optional, defaults well)
          minDate={getTodayDateString()} // Disable past dates
          onDayPress={handleDayPress}
          markedDates={markedDates}
          monthFormat={'MMMM yyyy'}
          // hideExtraDays={true} // Optional: hide days of other months
          firstDay={1} // Optional: Start week on Monday (0 for Sunday)
          enableSwipeMonths={true}
          theme={calendarTheme} // Apply custom theme
          style={styles.calendarStyle} // Add specific styles if needed
        />
      </View>

      {/* Time Slot Picker */}
      {selectedBarber && selectedDate && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>4. Select Time</Text>
          {availableTimes.length > 0 ? (
             <FlatList
              data={availableTimes}
              renderItem={renderTimeSlot}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalList}
             />
           ) : (
             <Text style={styles.placeholderText}>
                No available time slots for {selectedBarber.name} on {formatDateForDisplay(selectedDate)}.
             </Text>
           )}
        </View>
      )}

      {/* User Info */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>5. Your Information</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="Your Name"
          placeholderTextColor={secondaryTextColor}
        />
        <TextInput
          style={styles.input}
          value={userPhone}
          onChangeText={setUserPhone}
          placeholder="Phone Number"
          placeholderTextColor={secondaryTextColor}
          keyboardType="phone-pad"
        />
      </View>

      {/* Additional Notes */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Additional Notes (Optional)</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
          placeholder="e.g., Fade on the sides"
          placeholderTextColor={secondaryTextColor}
          multiline
        />
      </View>

      {/* Appointment Summary */}
      {selectedService && selectedBarber && selectedDate && selectedTime && (
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Appointment Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service:</Text>
            <Text style={styles.summaryText}>{selectedService.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Barber:</Text>
            <Text style={styles.summaryText}>{selectedBarber.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date:</Text>
            {/* Display formatted date */}
            <Text style={styles.summaryText}>{formatDateForDisplay(selectedDate)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Time:</Text>
            <Text style={styles.summaryText}>{selectedTime}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total:</Text>
            <Text style={styles.summaryTotal}>${selectedService.price}</Text>
          </View>
        </View>
      )}

      {/* Booking Button */}
      <TouchableOpacity
        style={[
            styles.bookButton,
            // Disable button if selections are incomplete
            (!selectedService || !selectedBarber || !selectedDate || !selectedTime) && styles.disabledBookButton
        ]}
        onPress={handleBooking}
        activeOpacity={0.8}
        disabled={!selectedService || !selectedBarber || !selectedDate || !selectedTime}
      >
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// --- Styles (Mostly unchanged, added calendarStyle and updated barberPhoto) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    paddingBottom: Platform.OS === 'android' ? 25 : 0,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: textColor,
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  sectionContainer: {
    marginBottom: 25, // Increased spacing
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: successColor,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  horizontalList: {
    marginBottom: 8,
  },
  // Service Card Styles (unchanged)
  serviceCard: {
    backgroundColor: cardColor,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    width: 160, // Slightly wider
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderColor: secondaryColor,
    borderWidth: 2.5, // Make selection more prominent
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: textColor,
    marginBottom: 6,
  },
  serviceDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: secondaryColor,
  },
  serviceTime: {
    fontSize: 14,
    color: secondaryTextColor,
  },
  // Barber Card Styles (updated photo handling)
  barberCard: {
    backgroundColor: cardColor,
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    width: 190, // Wider to accommodate photo better
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedBarberCard: {
    borderColor: secondaryColor,
    borderWidth: 2.5,
  },
  disabledCard: {
    opacity: 0.5,
  },
  barberPhoto: { // Style for actual Image
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: '#9D4EDD', // Placeholder background if image fails
  },
  barberPhotoPlaceholder: { // Style for placeholder View
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#9D4EDD', // Lighter shade of purple
    marginRight: 12,
  },
  barberInfo: {
    flex: 1,
  },
  barberName: {
    fontSize: 16,
    fontWeight: '600',
    color: textColor,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barberRating: {
    fontSize: 14,
    color: secondaryTextColor,
  },
  barberAvailability: {
    fontSize: 12,
    color: secondaryColor,
    marginTop: 4,
    fontWeight: 'bold',
  },
  // Calendar Style
  calendarStyle: {
    borderRadius: 12,
    // Add padding inside if needed, but theme handles background
    // padding: 10,
    borderWidth: 1,
    borderColor: secondaryTextColor + '30', // Subtle border
  },
  // Date Picker (Removed button, placeholder)
  placeholderText: {
    fontSize: 14,
    color: secondaryTextColor,
    textAlign: 'center',
    marginVertical: 8,
    fontStyle: 'italic',
  },
  // Time Slot Styles (unchanged)
  timeSlot: {
    backgroundColor: cardColor,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTimeSlot: {
    backgroundColor: secondaryColor,
    borderColor: secondaryColor,
  },
  timeSlotText: {
    fontSize: 14,
    color: textColor,
    fontWeight: '500',
  },
  selectedTimeSlotText: {
    color: backgroundColor, // High contrast text on selected slot
    fontWeight: 'bold',
  },
  // Input Styles (unchanged)
  input: {
    backgroundColor: cardColor,
    color: textColor,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(203, 213, 225, 0.3)',
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  // Summary Box Styles (unchanged)
  summaryBox: {
    backgroundColor: cardColor,
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: successColor,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: textColor,
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: secondaryTextColor,
    fontWeight: '500',
  },
  summaryText: {
    fontSize: 16,
    color: textColor,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(203, 213, 225, 0.2)',
    marginVertical: 10,
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: secondaryColor,
  },
  // Book Button Styles (added disabled state)
  bookButton: {
    backgroundColor: secondaryColor,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  disabledBookButton: {
      backgroundColor: disabledColor, // Use a disabled color
      opacity: 0.6,
      elevation: 0, // Remove shadow when disabled
  },
  bookButtonText: {
    color: textColor,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});