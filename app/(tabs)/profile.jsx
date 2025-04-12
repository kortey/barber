import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Switch,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../constants/Colors'; // Adjust path if needed

// --- Dummy Data (Same as before) ---
const userProfile = {
  fullName: 'Jane Doe',
  phone: '+1 555-123-4567',
  email: 'jane.doe@email.com',
  profilePic: 'https://via.placeholder.com/150/7209B7/F8FAFC?text=JD', // Placeholder image URL (Adjusted background/text for dark)
};

const upcomingAppointment = {
  id: 'appt1',
  barber: 'Mike Styles',
  date: 'Tomorrow, Oct 27',
  time: '2:00 PM',
  service: 'Standard Haircut',
  status: 'Confirmed',
};

const bookingHistory = [
  { id: 'hist1', date: 'Sep 15, 2023', service: 'Fade & Beard Trim', barber: 'Mike Styles', status: 'Completed' },
  { id: 'hist2', date: 'Aug 01, 2023', service: 'Standard Haircut', barber: 'Alex Cuts', status: 'Completed' },
  { id: 'hist3', date: 'Jul 10, 2023', service: 'Kids Cut', barber: 'Mike Styles', status: 'Canceled' },
];

const paymentMethods = [
  { id: 'pay1', type: 'Card', details: 'Visa **** 1234' },
];
// --- End Dummy Data ---

const ProfileScreen = () => {
  // Directly use the dark theme colors
  const colors = Colors.dark;
  const styles = createStyles(colors); // Pass dark colors to style generator

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => console.log('Logging out...') },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action is irreversible. Are you sure you want to delete your account and all associated data?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Deleting account...') },
      ]
    );
  };

  // Get status badge styles based on dark theme colors
  const getStatusBadgeStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return { backgroundColor: colors.success, textColor: colors.background }; // Light blue bg, Deep purple text
      case 'pending':
        return { backgroundColor: colors.warning, textColor: colors.text }; // Medium purple bg, White text
      case 'completed':
        // Use icon color for bg, background color for text for contrast
        return { backgroundColor: colors.icon, textColor: colors.background };
      case 'canceled':
        return { backgroundColor: colors.danger, textColor: colors.text }; // Pink bg, White text
      default:
        // Use icon color for bg, background color for text for contrast
        return { backgroundColor: colors.icon, textColor: colors.background };
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContainer}>
      {/* --- 1. Profile Information --- */}
      <View style={styles.profileSection}>
        <View style={styles.profilePicContainer}>
          <Image source={{ uri: userProfile.profilePic }} style={styles.profilePic} />
          <TouchableOpacity style={styles.editIconContainer}>
            {/* Ensure icon color contrasts with PRIMARY background */}
            <Ionicons name="pencil" size={18} color={colors.text} />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>{userProfile.fullName}</Text>
        <Text style={styles.profileDetail}>{userProfile.phone}</Text>
        {userProfile.email && <Text style={styles.profileDetail}>{userProfile.email}</Text>}
        <TouchableOpacity style={styles.editProfileButton}>
          {/* Ensure button text color contrasts with PRIMARY background */}
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* --- 2. Upcoming Appointments --- */}
      {upcomingAppointment && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Upcoming Appointment</Text>
          <View style={styles.card}>
            <View style={styles.appointmentHeader}>
                <View>
                    <Text style={styles.appointmentBarber}>{upcomingAppointment.barber}</Text>
                    <Text style={styles.appointmentService}>{upcomingAppointment.service}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusBadgeStyle(upcomingAppointment.status).backgroundColor }]}>
                    <Text style={[styles.statusBadgeText, { color: getStatusBadgeStyle(upcomingAppointment.status).textColor }]}>
                    {upcomingAppointment.status}
                    </Text>
                </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.appointmentDetailRow}>
                <Ionicons name="calendar-outline" size={18} color={colors.icon} style={styles.detailIcon} />
                <Text style={styles.appointmentDetailText}>{upcomingAppointment.date}</Text>
            </View>
             <View style={styles.appointmentDetailRow}>
                <Ionicons name="time-outline" size={18} color={colors.icon} style={styles.detailIcon} />
                <Text style={styles.appointmentDetailText}>{upcomingAppointment.time}</Text>
            </View>

            <View style={styles.appointmentActions}>
              <TouchableOpacity style={[styles.appointmentButton, styles.secondaryButton]}>
                <Text style={[styles.appointmentButtonText, styles.secondaryButtonText]}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.appointmentButton, styles.dangerButton]}>
                <Text style={[styles.appointmentButtonText, styles.dangerButtonText]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* --- 3. Booking History --- */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Booking History</Text>
        {bookingHistory.length > 0 ? (
          bookingHistory.map((booking) => (
            <View key={booking.id} style={[styles.card, styles.historyCard]}>
              <View style={styles.historyItem}>
                <View style={styles.historyDetails}>
                  <Text style={styles.historyDate}>{booking.date}</Text>
                  <Text style={styles.historyService}>{booking.service}</Text>
                  <Text style={styles.historyBarber}>
                    <MaterialCommunityIcons name="content-cut" size={14} color={colors.textSecondary} /> {booking.barber}
                  </Text>
                  <View style={[styles.statusBadge, styles.historyStatusBadge, { backgroundColor: getStatusBadgeStyle(booking.status).backgroundColor }]}>
                    <Text style={[styles.statusBadgeText, { color: getStatusBadgeStyle(booking.status).textColor }]}>
                      {booking.status}
                    </Text>
                  </View>
                </View>
                 {booking.status.toLowerCase() === 'completed' && (
                    <TouchableOpacity style={styles.rebookButton}>
                        <Ionicons name="refresh" size={16} color={colors.primary} style={{marginRight: 4}}/>
                        <Text style={styles.rebookButtonText}>Rebook</Text>
                    </TouchableOpacity>
                 )}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.card}>
            <Text style={styles.placeholderText}>No past bookings yet.</Text>
          </View>
        )}
      </View>

      {/* --- 4. Preferences --- */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Preferences</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Preferred Barber</Text>
            <View style={styles.preferenceValueContainer}>
                <Text style={styles.preferenceValue}>Any Available</Text>
                <Ionicons name="chevron-down-outline" size={20} color={colors.icon} />
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.preferenceRow}>
            <Text style={styles.preferenceLabel}>Preferred Service</Text>
             <View style={styles.preferenceValueContainer}>
                <Text style={styles.preferenceValue}>Standard Haircut</Text>
                <Ionicons name="chevron-down-outline" size={20} color={colors.icon} />
             </View>
          </TouchableOpacity>
           <View style={styles.separator} />
           <View style={[styles.preferenceRow, { paddingVertical: 10 }]}>
            <Text style={styles.preferenceLabel}>Notification Reminders</Text>
            <Switch
                trackColor={{ false: colors.icon, true: colors.primary }} // Use icon color for disabled track
                // Use a contrasting thumb color against the track/background
                thumbColor={Platform.OS === 'android' ? colors.text : colors.background}
                ios_backgroundColor={colors.icon} // Use icon color for disabled track
                onValueChange={() => setNotificationsEnabled(previousState => !previousState)}
                value={notificationsEnabled}
            />
           </View>
        </View>
      </View>

      {/* --- 5. Payment Methods --- */}
       <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Payment Methods</Text>
        <View style={styles.card}>
            {paymentMethods.length > 0 ? paymentMethods.map((method, index) => (
                 <React.Fragment key={method.id}>
                    <View style={styles.preferenceRow}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name={method.type === 'Card' ? "card-outline" : "phone-portrait-outline"} size={22} color={colors.icon} style={{marginRight: 12}}/>
                            <Text style={styles.preferenceLabel}>{method.details}</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={{color: colors.primary, fontWeight: '500'}}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                     {index < paymentMethods.length - 1 && <View style={styles.separator} />}
                </React.Fragment>
            )) : (
                 <Text style={styles.placeholderText}>No saved payment methods.</Text>
            )}
             <TouchableOpacity style={[styles.actionButton, {marginTop: paymentMethods.length > 0 ? 15 : 5}]}>
                 <Ionicons name="add-circle-outline" size={20} color={colors.primary} style={{marginRight: 6}}/>
                <Text style={[styles.actionButtonText, {color: colors.primary}]}>Add Payment Method</Text>
            </TouchableOpacity>
        </View>
      </View>

      {/* --- 6. Account Settings --- */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Account Settings</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.settingRow}>
             <Ionicons name="lock-closed-outline" size={20} color={colors.icon} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Change Password</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.icon} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.settingRow} onPress={handleDeleteAccount}>
             <Ionicons name="trash-outline" size={20} color={colors.danger} style={styles.settingIcon} />
            <Text style={[styles.settingLabel, { color: colors.danger }]}>Delete Account</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.danger} />
          </TouchableOpacity>
        </View>
      </View>

        {/* --- 7. Support --- */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Support</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.settingRow}>
             <Ionicons name="call-outline" size={20} color={colors.icon} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Contact Support</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.icon} />
          </TouchableOpacity>
          <View style={styles.separator} />
           <TouchableOpacity style={styles.settingRow}>
             <Ionicons name="help-circle-outline" size={20} color={colors.icon} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>FAQs</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.icon} />
          </TouchableOpacity>
           <View style={styles.separator} />
           <TouchableOpacity style={styles.settingRow}>
             <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.icon} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>Report an Issue</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- 8. Log Out --- */}
       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={colors.danger} style={{marginRight: 8}}/>
          <Text style={styles.logoutButtonText}>Log Out</Text>
       </TouchableOpacity>

    </ScrollView>
  );
};

// --- Styles (Using DARK Colors) ---
// Note: The function now receives and uses the 'dark' color palette
const createStyles = (colors) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background, // Deep purple background
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  // Profile Section
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: colors.background, // Use main dark background
    borderBottomWidth: 1,
    borderBottomColor: colors.icon, // Use icon color for border
    marginBottom: 20,
  },
  profilePicContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.primary, // Blue border
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary, // Blue background
    padding: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.background, // Match screen background (Deep purple)
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text, // White text
    marginBottom: 4,
  },
  profileDetail: {
    fontSize: 16,
    color: colors.textSecondary, // Use textSecondary
    marginBottom: 4,
  },
  editProfileButton: {
    marginTop: 15,
    backgroundColor: colors.primary, // Blue background
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    // Removed shadow properties
  },
  editProfileButtonText: {
    color: colors.text, // White text on blue button
    fontSize: 16,
    fontWeight: '600',
  },

  // Section Styling
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text, // White text
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.cardSurface, // Use cardSurface
    borderRadius: 12,
    padding: 24,
    borderWidth: Platform.OS === 'android' ? 0.5 : 0, // Optional: Subtle border on Android?
    borderColor: colors.icon, // Use icon color for border
    // Removed shadow properties
  },
  separator: {
    height: 1,
    backgroundColor: colors.icon, // Use icon color for separator
    marginVertical: 12,
  },
  placeholderText: {
    fontSize: 15,
    color: colors.textSecondary, // Use textSecondary
    textAlign: 'center',
    paddingVertical: 10,
  },

  // Appointment Card
  appointmentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 10,
  },
  appointmentBarber: {
      fontSize: 17,
      fontWeight: '600',
      color: colors.text, // White text
      marginBottom: 3,
  },
  appointmentService: {
    fontSize: 15,
    color: colors.textSecondary, // Use textSecondary
  },
  statusBadge: {
    paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'flex-start',
  },
   statusBadgeText: {
      fontSize: 12,
      fontWeight: '600',
      // Text color is set dynamically via getStatusBadgeStyle
  },
   appointmentDetailRow: {
       flexDirection: 'row',
       alignItems: 'center',
       marginVertical: 4,
   },
   detailIcon: {
       marginRight: 8,
       // color is already set by 'icon' color in the JSX
   },
   appointmentDetailText: {
       fontSize: 15,
       color: colors.text, // White text
   },
   appointmentActions: {
       flexDirection: 'row',
       justifyContent: 'flex-end',
       marginTop: 15,
       paddingTop: 10,
       borderTopWidth: 1,
       borderTopColor: colors.icon, // Use icon color for border
   },
   appointmentButton: {
       paddingVertical: 8,
       paddingHorizontal: 16,
       borderRadius: 20,
       marginLeft: 10,
       borderWidth: 1.5, // Slightly thicker border might look better in dark mode
   },
   appointmentButtonText: {
       fontSize: 14,
       fontWeight: '600',
   },
   secondaryButton: {
       borderColor: colors.primary, // Blue border
       backgroundColor: 'transparent',
   },
   secondaryButtonText: {
        color: colors.primary, // Blue text
   },
    dangerButton: {
       borderColor: colors.danger, // Pink border
       backgroundColor: 'transparent',
   },
   dangerButtonText: {
        color: colors.danger, // Pink text
   },

  // Booking History Card
  historyCard: {
    marginBottom: 12,
    paddingVertical: 12,
  },
  historyItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  historyDetails: {
      flex: 1,
      marginRight: 10,
  },
  historyDate: {
    fontSize: 14,
    color: colors.textSecondary, // Use textSecondary
    marginBottom: 4,
  },
  historyService: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text, // White text
      marginBottom: 4,
  },
  historyBarber: {
    fontSize: 14,
    color: colors.textSecondary, // Use textSecondary
    marginBottom: 6,
  },
  historyStatusBadge: {
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  rebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardSurface, // Use cardSurface
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
      borderWidth: 1.5, // Slightly thicker border
      borderColor: colors.primary, // Blue border
  },
  rebookButtonText: {
      color: colors.primary, // Blue text
      fontSize: 14,
      fontWeight: '600',
  },

  // Preferences & Settings Rows
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
   preferenceLabel: {
    fontSize: 16,
    color: colors.text, // White text
  },
  preferenceValueContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  preferenceValue: {
    fontSize: 16,
    color: colors.textSecondary, // Use textSecondary
    marginRight: 4,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  settingIcon: {
      marginRight: 12,
      // color set by 'icon' or 'danger' in JSX
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    color: colors.text, // White text (unless overridden like for Delete)
  },

  // Payment & Action Buttons
   actionButton: { // Style for "Add Payment Method"
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'center',
       paddingVertical: 12,
       borderRadius: 8,
       marginTop: 10,
       borderWidth: 1.5, // Slightly thicker border
       borderColor: colors.primary, // Blue border
       backgroundColor: 'transparent', // Outline style
   },
   actionButtonText: {
       fontSize: 16,
       fontWeight: '600',
        color: colors.primary, // Blue text for outline button
   },

  // Logout Button
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 14,
    backgroundColor: colors.cardSurface, // Use cardSurface
    borderRadius: 12,
    borderWidth: 1.5, // Slightly thicker border
    borderColor: colors.danger, // Pink border
    
  },
  logoutButtonText: {
    color: colors.danger, // Pink text
    fontSize: 17,
    fontWeight: '600',
  },
});

export default ProfileScreen;
