import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
// Import Colors if needed for screenOptions example
// import { Colors } from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Configure the Stack navigator */}
      <Stack
        // No need for initialRouteName when using app/index.tsx as the root
        screenOptions={{
          // Apply default options to all screens in the stack if needed
          // Example: headerStyle: { backgroundColor: Colors.dark.background }, headerTintColor: Colors.dark.text
        }}
      >
        {/* app/index.tsx is the root route */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* Other screens */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)/(barber)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen
        name="(auth)/login"
        options={{
          headerShown: true,
          title:"",
        }} />


      <Stack.Screen
        name="(auth)/register"
        options={{
           headerShown: true,
           title:"",
        }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
