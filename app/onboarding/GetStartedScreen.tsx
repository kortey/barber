import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

const GetStartedScreen = () => {
  const router = useRouter();

  const handleSignUp = () => {
    // Navigate to the registration screen
    router.replace('/(auth)/register'); // Assuming this is your registration route
  };

  const handleLogin = () => {
    // Navigate to the login screen
    router.replace('/(auth)/login'); // Assuming this is your login route
  };

  return (
    <View style={styles.container}>
      {/* Optional: Add a final visual/icon if desired */}
      <View style={styles.content}>
        <Text style={styles.title}>Ready for a Fresh Cut?</Text>
        <Text style={styles.subtitle}>Let’s get you started.</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp}>
          <Text style={styles.primaryButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleLogin}>
          <Text style={styles.secondaryButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around', // Space out content and buttons
    paddingHorizontal: 30,
    paddingBottom: 40, // Add padding at the bottom for buttons
    backgroundColor: Colors.dark.background,
  },
  content: {
    alignItems: 'center',
    marginTop: 100, // Adjust spacing as needed
  },
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
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.dark.primary, // Use primary color from Colors.ts
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30, // Fully rounded ends
    width: '90%', // Make buttons wide
    alignItems: 'center',
    marginBottom: 15, // Space between buttons
  },
  primaryButtonText: {
    color: Colors.dark.text, // Text color for primary button
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent', // No background fill
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.dark.primary, // Border color matches primary
    width: '90%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.dark.primary, // Text color matches primary
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GetStartedScreen;
