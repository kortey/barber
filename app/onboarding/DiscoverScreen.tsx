import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

// Placeholder for illustration
// const HairstyleCardsIllustration = require('@/assets/images/onboarding/hairstyle-cards.png');

const DiscoverScreen = () => {
  return (
    <View style={styles.container}>
      {/* Placeholder Visual */}
      <View style={styles.visualPlaceholder}>
        <Text style={styles.placeholderText}>[Visual: Hairstyle Cards / Avatars]</Text>
        {/* Example using an Image component: */}
        {/* <Image source={HairstyleCardsIllustration} style={styles.illustration} resizeMode="contain" /> */}
      </View>

      <Text style={styles.title}>Explore the Freshest Looks</Text>
      <Text style={styles.subtitle}>Browse trending hairstyles and get AI-powered suggestions.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: Colors.dark.background,
  },
  visualPlaceholder: {
    width: 280, // Slightly different size for variety
    height: 280,
    backgroundColor: Colors.dark.cardSurface,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  placeholderText: {
    color: Colors.dark.textSecondary,
    fontSize: 16,
    textAlign: 'center', // Center text if it wraps
  },
  // illustration: {
  //   width: '100%',
  //   height: '100%',
  // },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default DiscoverScreen;
