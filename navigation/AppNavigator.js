import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import DashboardScreen from '../screens/DashboardScreen';
import PlanScreen from '../screens/PlanScreen';
import RiskScreen from '../screens/RiskScreen';
import ClaimScreen from '../screens/ClaimScreen';
import PayoutScreen from '../screens/PayoutScreen';

import { colors, fontSize } from '../constants/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ClaimStack = createNativeStackNavigator();

// Claims sub-stack (Claim → Payout)
function ClaimsNavigator() {
  return (
    <ClaimStack.Navigator screenOptions={{ headerShown: false }}>
      <ClaimStack.Screen name="ClaimMain" component={ClaimScreen} />
      <ClaimStack.Screen name="Payout" component={PayoutScreen} />
    </ClaimStack.Navigator>
  );
}

// Custom tab bar icon
function TabIcon({ name, label, focused }) {
  return (
    <View style={tabStyles.iconWrap}>
      <MaterialIcons
        name={name}
        size={24}
        color={focused ? colors.primary : colors.slate400}
      />
      <Text style={focused ? [tabStyles.label, tabStyles.labelActive] : tabStyles.label}>
        {label}
      </Text>
      {focused ? <View style={tabStyles.dot} /> : null}
    </View>
  );
}

// Bottom tabs
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.slate200,
          height: 60,
          paddingBottom: 4,
          paddingTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="home" label="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Plans"
        component={PlanScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="shield" label="Plans" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Risk"
        component={RiskScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="warning" label="Risk" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Claims"
        component={ClaimsNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="assignment-turned-in" label="Claims" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="person" label="Profile" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Root navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const tabStyles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: '500',
    color: colors.slate400,
    marginTop: 2,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: 1,
  },
});
