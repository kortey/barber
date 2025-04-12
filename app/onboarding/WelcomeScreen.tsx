import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/Colors';

// Placeholder for illustration - replace with actual asset path or component
// const BarberChairIllustration = require('@/assets/images/onboarding/barber-chair.png');

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Placeholder Visual */}
      <View style={styles.visualPlaceholder}>
        <Text style={styles.placeholderText}>[Illustration: Barber Chair/Tools]</Text>
        {/* Example using an Image component if you have one: */}
        {/* <Image source={BarberChairIllustration} style={styles.illustration} resizeMode="contain" /> */}
      </View>

      <Text style={styles.title}>Welcome to BarberEase</Text>
      <Text style={styles.subtitle}>Find your perfect haircut. Anytime. Anywhere.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Adjust layout as needed, maybe space-around?
    paddingHorizontal: 30, // Add padding
    backgroundColor: Colors.dark.background, // Ensure background color consistency
  },
  visualPlaceholder: {
    width: 250,
    height: 250,
    backgroundColor: Colors.dark.cardSurface, // Use a subtle background for placeholder
    borderRadius: 20, // Rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50, // Space between visual and text
  },
  placeholderText: {
    color: Colors.dark.textSecondary,
    fontSize: 16,
  },
  // Uncomment and adjust if using an actual image
  // illustration: {
  //   width: '100%',
  //   height: '100%',
  // },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.dark.text, // Primary text color
    textAlign: 'center',
    marginBottom: 15, // Space between title and subtitle
  },
  subtitle: {
    fontSize: 18,
    color: Colors.dark.textSecondary, // Muted text color
    textAlign: 'center',
    lineHeight: 24, // Improve readability
  },
});

export default WelcomeScreen;
