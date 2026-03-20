import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useApp } from './context/AppContext';
import AppNavigator from './navigation/AppNavigator';
import { colors } from './constants/theme';

import { useFonts } from 'expo-font';

function AppContent() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgLight,
        alignItems: 'center',
      }}
    >
      <StatusBar barStyle="dark-content" />
      {/* INNER WRAPPER (mobile width constraint) */}
      <View
        style={{
          flex: 1,
          width: '100%',
          maxWidth: Platform.OS === 'web' ? 420 : '100%',
          backgroundColor: colors.white,
          overflow: 'hidden',

          // optional polish
          ...(Platform.OS === 'web' && {
            boxShadow: '0 0 20px rgba(0,0,0,0.1)',
            borderRadius: 12,
            borderWidth: 0,
          }),
        }}
      >
        <AppNavigator />
      </View>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Ionicons: require('./assets/fonts/Ionicons.ttf'),
    MaterialIcons: require('./assets/fonts/MaterialIcons.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </SafeAreaProvider>
  );
}