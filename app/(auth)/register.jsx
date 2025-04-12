import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert, // Using Alert for simple feedback for now
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Assuming you have expo vector icons
import { Colors } from '../../constants/Colors'; // Import colors

// Placeholder for Supabase/Auth logic
// import { supabase } from '../../lib/supabase'; // Adjust path as needed

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // Added phone number state
  const [role, setRole] = useState(null); // null, 'customer', 'barber', 'admin'
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState(''); // Added phone number error state
  const [roleError, setRoleError] = useState('');

  const router = useRouter();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(text)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (text) => {
    if (!text) {
      setPasswordError('Password is required');
      return false;
    } else if (text.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validatePhoneNumber = (text) => {
    const phoneRegex = /^\+?[0-9\s-()]{7,}$/; // Basic regex for phone numbers (adjust as needed)
    if (!text) {
      setPhoneNumberError('Phone number is required');
      return false;
    } else if (!phoneRegex.test(text)) {
      setPhoneNumberError('Please enter a valid phone number');
      return false;
    }
    setPhoneNumberError('');
    return true;
  };

  const validateRole = (value) => {
    if (!value) {
      setRoleError('Please select a role');
      return false;
    }
    setRoleError('');
    return true;
  }

  const handleRegister = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isPhoneNumberValid = validatePhoneNumber(phoneNumber); // Validate phone number
    const isRoleValid = validateRole(role);

    if (!isEmailValid || !isPasswordValid || !isPhoneNumberValid || !isRoleValid) {
      return; // Don't proceed if validation fails
    }

    setLoading(true);
    setEmailError('');
    setPasswordError('');
    setPhoneNumberError(''); // Reset phone number error
    setRoleError('');

    // --- Placeholder for actual registration logic ---
    try {
      // Example with Supabase (replace with your actual logic)
      // const { data, error } = await supabase.auth.signUp({
      //   email: email,
      //   password: password,
      //   options: {
      //     data: {
      //       role: role, // Store role in user metadata
      //       phone_number: phoneNumber, // Add phone number
      //     }
      //   }
      // });

      // if (error) throw error;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Registration successful (simulated)');
      Alert.alert('Registration Successful', 'Please check your email to verify your account.'); // Simple feedback

      // --- Placeholder for navigation logic ---
      // Redirect based on role or to a verification pending screen
      // if (role === 'admin') {
      //   router.replace('/admin/dashboard');
      // } else if (role === 'barber') {
      //   router.replace('/barber/schedule');
      // } else {
      //   router.replace('/(tabs)'); // Default redirect
      // }
      router.replace('/(auth)/login'); // Redirect to login after registration for now

    } catch (error) {
      console.error('Registration error:', error);
      // Use Toast/Snackbar here for better UX
      Alert.alert('Registration Failed', error.message || 'An unexpected error occurred.');
      setPasswordError('Registration failed. Please try again.'); // Generic error on password field
    } finally {
      setLoading(false);
    }
    // --- End Placeholder ---
  };

  const isButtonDisabled = !email || !password || !phoneNumber || loading || !!emailError || !!passwordError || !!phoneNumberError || !!roleError; // Added phoneNumber and phoneNumberError

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.formContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the Babbr community!</Text>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.inputWrapper, emailError ? styles.inputErrorBorder : null]}>
              <Ionicons name="mail-outline" size={20} color={Colors.dark.textSecondary} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholderTextColor={Colors.dark.textSecondary}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  validateEmail(text); // Validate on change
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={() => validateEmail(email)} // Validate on blur
              />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.inputWrapper, passwordError ? styles.inputErrorBorder : null]}>
              <Ionicons name="lock-closed-outline" size={20} color={Colors.dark.textSecondary} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholderTextColor={Colors.dark.textSecondary}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  validatePassword(text); // Validate on change
                }}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                onBlur={() => validatePassword(password)} // Validate on blur
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} color={Colors.dark.textSecondary} />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            {/* Optional: Password strength indicator could go here */}
          </View>

          {/* Phone Number Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={[styles.inputWrapper, phoneNumberError ? styles.inputErrorBorder : null]}>
              <Ionicons name="call-outline" size={20} color={Colors.dark.textSecondary} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholderTextColor={Colors.dark.textSecondary}
                value={phoneNumber}
                onChangeText={(text) => {
                  setPhoneNumber(text);
                  validatePhoneNumber(text); // Validate on change
                }}
                keyboardType="phone-pad"
                autoCapitalize="none"
                onBlur={() => validatePhoneNumber(phoneNumber)} // Validate on blur
              />
            </View>
            {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
          </View>


          {/* Remember Me & Forgot Password */}
          <View style={styles.optionsContainer}>
            <View style={styles.switchContainer}>
              <Switch
                trackColor={{ false: Colors.dark.cardSurface, true: Colors.dark.secondary }}
                thumbColor={rememberMe ? Colors.dark.primary : Colors.dark.textSecondary}
                ios_backgroundColor={Colors.dark.cardSurface}
                onValueChange={setRememberMe}
                value={rememberMe}
              />
              <Text style={styles.optionText}>Remember Me</Text>
            </View>
            <Link href="/forgot-password" asChild>
              <TouchableOpacity>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.button, isButtonDisabled ? styles.buttonDisabled : null]}
            onPress={handleRegister}
            disabled={isButtonDisabled}
          >
            {loading ? (
              <ActivityIndicator size="small" color={Colors.dark.text} />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

          {/* Social Logins (Optional) */}
          <View style={styles.socialLoginContainer}>
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('Social Login', 'Google login not implemented yet.')}>
                <Ionicons name="logo-google" size={24} color={Colors.dark.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('Social Login', 'Apple login not implemented yet.')}>
                <Ionicons name="logo-apple" size={24} color={Colors.dark.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Link to Login */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    padding: 25,
    backgroundColor: Colors.dark.cardSurface,
    borderRadius: 15, // Added border radius
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    marginBottom: 30,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.background, // Slightly different background for input
    borderRadius: 10, // Added border radius
    borderWidth: 1,
    borderColor: Colors.dark.cardSurface, // Subtle border
    paddingHorizontal: 10,
  },
   pickerWrapper: {
    backgroundColor: Colors.dark.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.dark.cardSurface,
    justifyContent: 'center', // Center the picker content vertically
    // The height might need adjustment depending on the picker's internal padding
    minHeight: 50, // Ensure minimum height
   },
  inputErrorBorder: {
    borderColor: Colors.dark.danger, // Use danger color for error border
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: Colors.dark.text,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5, // Easier to tap
  },
  errorText: {
    color: Colors.dark.danger,
    fontSize: 12,
    marginTop: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 8,
    color: Colors.dark.textSecondary,
    fontSize: 14,
  },
  linkText: {
    color: Colors.dark.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 15,
    borderRadius: 10, // Added border radius
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: Colors.dark.icon, // Use a muted color when disabled
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialLoginContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  dividerText: {
    color: Colors.dark.textSecondary,
    marginBottom: 15,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20, // Add gap between buttons
  },
  socialButton: {
    backgroundColor: Colors.dark.cardSurface, // Match card surface
    padding: 12,
    borderRadius: 25, // Circular buttons
    borderWidth: 1,
    borderColor: Colors.dark.icon,
  },
  footer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
  },
  footerLink: {
    color: Colors.dark.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  pickerIcon: {
     position: 'absolute',
     right: 15,
     top: 13, // Adjust vertical position as needed
   },
});

// Styles for RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: Colors.dark.text,
    paddingRight: 30, // to ensure the text is never behind the icon
    minHeight: 50,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: Colors.dark.text,
    paddingRight: 30, // to ensure the text is never behind the icon
    minHeight: 50,
  },
  placeholder: {
    color: Colors.dark.textSecondary,
  },
  iconContainer: { // Hides the default Android arrow
     top: 20,
     right: 15,
   },
});
