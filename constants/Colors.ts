/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#4361EE';
const tintColorDark = '#fff';

// New Color Palette
const PRIMARY = '#4361EE'; // Blue - Primary action color
const SECONDARY = '#F72585'; // Pink - Bold, energetic accent for buttons/CTAs
const BACKGROUND = '#3A0CA3'; // Deep purple - Background color
const CARD_SURFACE = '#7209B7'; // Medium purple - Used for cards
const TEXT_PRIMARY = '#F8FAFC'; // Kept the same bright white for readability
const TEXT_SECONDARY = '#CBD5E1'; // Kept the same muted white-gray for subtle text
const SUCCESS = '#4CC9F0'; // Light blue - For successful bookings or updates
const WARNING = '#7209B7'; // Medium purple - Warnings, alerts, attention
const DANGER_ERROR = '#F72585'; // Pink - Errors or canceled bookings
const ACCENT_NEON = '#4CC9F0'; // Light blue - Special elements

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: TEXT_PRIMARY,
    background: BACKGROUND,
    tint: PRIMARY,
    icon: TEXT_SECONDARY,
    tabIconDefault: TEXT_SECONDARY,
    tabIconSelected: PRIMARY,
    // Add the other defined colors for potential use
    primary: PRIMARY,
    secondary: SECONDARY,
    cardSurface: CARD_SURFACE,
    textSecondary: TEXT_SECONDARY,
    success: SUCCESS,
    warning: WARNING,
    danger: DANGER_ERROR,
    accentNeon: ACCENT_NEON,
  },
};