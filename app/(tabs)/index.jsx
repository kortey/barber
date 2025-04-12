import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList, StyleSheet,Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

const dark = Colors.dark;

// Mock data for single barbershop
const featuredHairstyles = [
  { id: '1', name: 'Signature Fade', tag: 'Most Popular', image: require('@/assets/images/react-logo.png') },
  { id: '2', name: 'Classic Pompadour', tag: 'Trending', image: require('@/assets/images/react-logo.png') },
  { id: '3', name: 'Modern Undercut', tag: 'New Style', image: require('@/assets/images/react-logo.png') },
];

const upcomingAppointments = [
  { id: '1', barber: 'John (Master Barber)', date: 'Today, 3:00 PM', status: 'Confirmed' },
  { id: '2', barber: 'Mike (Senior Stylist)', date: 'Tomorrow, 11:00 AM', status: 'Pending' },
];

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning, Nana 👋</Text>
            <Text style={styles.subtitle}>Welcome to Elite Barbers</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <Image 
                source={require('@/assets/images/react-logo.png')} 
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationIcon}>
              <Text style={styles.notificationBadge}>3</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchPlaceholder}>Search hairstyles</Text>
        </View>

        {/* Main Booking CTA */}
        <TouchableOpacity 
          style={styles.mainCta}
          onPress={() => router.push('/(tabs)/bookingpage')}
        >
          <Text style={styles.ctaText}>💈 Book your appointment now</Text>
          <Text style={styles.ctaSubtext}>Same-day appointments available</Text>
        </TouchableOpacity>

        {/* Featured Hairstyles Carousel */}
        <Text style={styles.sectionTitle}>Our Signature Styles</Text>
        <FlatList
          horizontal
          data={featuredHairstyles}
          renderItem={({ item }) => (
            <View style={styles.hairstyleCard}>
              <Image source={item.image} style={styles.hairstyleImage} />
              <Text style={styles.hairstyleName}>{item.name}</Text>
              <Text style={styles.hairstyleTag}>{item.tag}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.carousel}
          showsHorizontalScrollIndicator={false}
        />

        {/* Upcoming Appointments */}
        <Text style={styles.sectionTitle}>Your Appointments</Text>
        {upcomingAppointments.map(appointment => (
          <View key={appointment.id} style={styles.appointmentCard}>
            <View>
              <Text style={styles.appointmentBarber}>{appointment.barber}</Text>
              <Text style={styles.appointmentDate}>{appointment.date}</Text>
            </View>
            <View style={[
              styles.statusBadge,
              appointment.status === 'Confirmed' ? styles.confirmedBadge : styles.pendingBadge
            ]}>
              <Text style={styles.statusText}>{appointment.status}</Text>
            </View>
          </View>
        ))}

        {/* Quick Menu */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickMenu}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/(tabs)/galery')}
            >
              <Text style={styles.menuIcon}>✂️</Text>
              <Text style={styles.menuText}>Explore Hairstyles</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/(tabs)/bookingpage')}
            >
              <Text style={styles.menuIcon}>📅</Text>
              <Text style={styles.menuText}>My Bookings</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>❤️</Text>
            <Text style={styles.menuText}>My Favorites</Text>
          </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => router.push('/(tabs)/profile')}
            >
              <Text style={styles.menuIcon}>👤</Text>
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
        </View>

        {/* Promotions Banner */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoText}>🎉 Refer a friend, get 20% off!</Text>
          <Text style={styles.promoSubtext}>Limited time offer</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: dark.background,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    paddingBottom: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: dark.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: dark.text,
  },
  subtitle: {
    fontSize: 16,
    color: dark.textSecondary,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  notificationIcon: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: dark.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    color: dark.text,
    fontWeight: 'bold',
  },
  searchContainer: {
    backgroundColor: dark.cardSurface,
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  searchPlaceholder: {
    color: dark.textSecondary,
  },
  mainCta: {
    backgroundColor: dark.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: dark.text,
    marginBottom: 5,
  },
  ctaSubtext: {
    fontSize: 14,
    color: dark.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: dark.text,
    marginBottom: 15,
  },
  carousel: {
    paddingBottom: 20,
    gap: 15,
  },
  hairstyleCard: {
    width: 150,
    marginRight: 15,
    marginBottom: 40,
  },
  hairstyleImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    marginBottom: 10,
  },
  hairstyleName: {
    fontSize: 16,
    fontWeight: '600',
    color: dark.text,
    marginBottom: 5,
  },
  hairstyleTag: {
    fontSize: 12,
    color: dark.accentNeon,
    fontWeight: 'bold',
  },
  appointmentCard: {
    backgroundColor: dark.cardSurface,
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentBarber: {
    fontSize: 16,
    fontWeight: '600',
    color: dark.text,
  },
  appointmentDate: {
    fontSize: 14,
    color: dark.textSecondary,
  },
  statusBadge: {
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  confirmedBadge: {
    backgroundColor: dark.success,
  },
  pendingBadge: {
    backgroundColor: dark.warning,
  },
  statusText: {
    color: dark.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  quickMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuItem: {
    width: '48%',
    backgroundColor: dark.cardSurface,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  menuText: {
    color: dark.text,
    fontSize: 14,
    fontWeight: '500',
  },
  promoBanner: {
    backgroundColor: dark.accentNeon,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  promoText: {
    color: dark.background,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  promoSubtext: {
    color: dark.background,
    fontSize: 14,
  },
});
