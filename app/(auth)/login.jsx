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
  Alert, // Using Alert for simple feedback
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors'; // Import colors

// Placeholder for Supabase/Auth logic
// import { supabase } from '../../lib/supabase'; // Adjust path as needed

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const router = useRouter();

  // Animation values (optional, for a smoother entry)
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
    }
    // No minimum length check for login, but you could add one if desired
    setPasswordError('');
    return true;
  };

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return; // Don't proceed if validation fails
    }

    setLoading(true);
    setEmailError('');
    setPasswordError('');

    // --- Placeholder for actual login logic ---
    try {
       
      Alert.alert('Login Successful', 'Welcome back!'); // Simple feedback

      // --- Placeholder for navigation logic ---
      // Redirect to the main part of the app
      router.replace('/(dashboard)/(barber)'); // Example redirect

    } catch (error) {
      console.error('Login error:', error);
      // Use Toast/Snackbar here for better UX
      Alert.alert('Login Failed', error.message || 'Invalid email or password.');
      setPasswordError('Invalid email or password.'); // Generic error on password field
    } finally {
      setLoading(false);
    }
    // --- End Placeholder ---
  };

  const isButtonDisabled = !email || !password || loading || !!emailError || !!passwordError;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.formContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to your Babbr account</Text>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.inputWrapper, emailError ? styles.inputErrorBorder : null]}>
              <Ionicons name="mail-outline" size={20} color={Colors.dark.textSecondary} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
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
                placeholder="Your password"
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
            {/* TODO: Implement Forgot Password screen */}
            <Link href="/forgot-password" asChild>
              <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Forgot password functionality not implemented yet.')}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.button, isButtonDisabled ? styles.buttonDisabled : null]}
            onPress={handleLogin}
            disabled={isButtonDisabled}
          >
            {loading ? (
              <ActivityIndicator size="small" color={Colors.dark.text} />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* Link to Register */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Register</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

// Styles (similar to RegisterScreen, using Colors.dark)
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
    borderRadius: 15,
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
    backgroundColor: Colors.dark.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.dark.cardSurface,
    paddingHorizontal: 10,
  },
  inputErrorBorder: {
    borderColor: Colors.dark.danger,
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
    padding: 5,
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
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: Colors.dark.icon,
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: 'bold',
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
}
);
