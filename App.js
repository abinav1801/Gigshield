import React from 'react';
import { View, Platform } from 'react-native';
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
      {/* OUTER WRAPPER (centering) */}
      <View
        style={{
          flex: 1,
          backgroundColor: '#f2f2f2',
          alignItems: 'center',
        }}
      >
        {/* INNER WRAPPER (mobile width constraint) */}
        <View
          style={{
            flex: 1,
            width: '100%',
            maxWidth: Platform.OS === 'web' ? 420 : '100%',
            backgroundColor: 'white',
            overflow: 'hidden',

            // optional polish
            ...(Platform.OS === 'web' && {
              boxShadow: '0 0 20px rgba(0,0,0,0.1)',
              borderRadius: 12,
            }),
          }}
        >
          <AppProvider>
            <AppNavigator />
          </AppProvider>
        </View>
      </View>
    </SafeAreaProvider>
  );
}