import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './context/AppContext';
import AppNavigator from './navigation/AppNavigator';

import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
        <AppNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}