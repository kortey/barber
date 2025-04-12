import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import WelcomeScreen from './WelcomeScreen';
import DiscoverScreen from './DiscoverScreen';
import BookScreen from './BookScreen';
import GetStartedScreen from './GetStartedScreen';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const onboardingScreens = [
  { id: '1', component: WelcomeScreen },
  { id: '2', component: DiscoverScreen },
  { id: '3', component: BookScreen },
  { id: '4', component: GetStartedScreen },
];

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<any> }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  const scrollToNext = () => {
    if (currentIndex < onboardingScreens.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Navigate to main app or auth flow after last screen
      // For now, let's assume navigation to login
      router.replace('/(auth)/login');
    }
  };

  const skipOnboarding = () => {
    // Navigate to main app or auth flow
    router.replace('/(auth)/login');
  };

  const renderItem = ({ item }: { item: { id: string; component: React.FC } }) => {
    const ScreenComponent = item.component;
    return (
      <View style={styles.slide}>
        <ScreenComponent />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
      <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        data={onboardingScreens}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16} // Ensure smooth scroll tracking
        bounces={false} // Prevent bouncing at the ends
      />
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingScreens.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
        {currentIndex < onboardingScreens.length - 1 && (
           <TouchableOpacity style={styles.nextButton} onPress={scrollToNext}>
             <Text style={styles.nextButtonText}>Next</Text>
           </TouchableOpacity>
        )}
         {/* Buttons for the last screen are handled within GetStartedScreen */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background, // Dark theme background
  },
  slide: {
    width: width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Center content vertically for now
    paddingHorizontal: 20,
  },
  skipButton: {
    position: 'absolute',
    top: (StatusBar.currentHeight || 0) + 15, // Position below status bar
    right: 20,
    zIndex: 1, // Ensure it's above the FlatList
  },
  skipText: {
    color: Colors.dark.textSecondary, // Use the correct muted text color from Colors.ts
    fontSize: 16,
  },
  footer: {
    height: 80, // Fixed height for footer
    flexDirection: 'row',
    justifyContent: 'space-between', // Space out pagination and button
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10, // Add some padding at the bottom
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  dotActive: {
    width: 20, // Make active dot wider
    backgroundColor: Colors.dark.primary, // Use primary color from Colors.ts as accent
  },
  dotInactive: {
    width: 10,
    backgroundColor: Colors.dark.textSecondary, // Use correct muted color
  },
  nextButton: {
    backgroundColor: Colors.dark.primary, // Use primary color from Colors.ts
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25, // Rounded button
  },
  nextButtonText: {
    color: Colors.dark.text, // Use primary text color for contrast
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Default export for Expo Router file-based routing
export default Onboarding;

// Removed the fallback color logic as we are using Colors.ts directly
