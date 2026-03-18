import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import DashboardScreen from '../screens/DashboardScreen';
import PlanScreen from '../screens/PlanScreen';
import RiskScreen from '../screens/RiskScreen';
import ClaimScreen from '../screens/ClaimScreen';
import PayoutScreen from '../screens/PayoutScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';

import { colors, fontSize, radius } from '../constants/theme';
import { mockUser } from '../context/AppContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const ClaimStack = createNativeStackNavigator();

// Custom Drawer Layout
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <View style={drawerStyles.header}>
        <View style={drawerStyles.avatarWrap}>
          <Image source={{ uri: mockUser.avatar }} style={drawerStyles.avatar} />
        </View>
        <Text style={drawerStyles.name}>{mockUser.name}</Text>
        <Text style={drawerStyles.platform}>{mockUser.platform}</Text>
      </View>
      <View style={{ flex: 1, paddingTop: 10 }}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Support"
          labelStyle={{ marginLeft: -5 }}
          icon={({ color, size }) => <MaterialIcons name="help-outline" size={size} color={color} />}
          onPress={() => {}}
        />
        <DrawerItem
          label="Settings"
          labelStyle={{ marginLeft: -5 }}
          icon={({ color, size }) => <MaterialIcons name="settings" size={size} color={color} />}
          onPress={() => {}}
        />
      </View>
      <View style={drawerStyles.footer}>
        <TouchableOpacity style={drawerStyles.logoutBtn} onPress={() =>
          props.navigation.getParent()?.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        }>
          <MaterialIcons name="logout" size={20} color="#ef4444" />
          <Text style={drawerStyles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

// Claims sub-stack (Claim → Payout)
function ClaimsNavigator() {
  return (
    <ClaimStack.Navigator screenOptions={{ headerShown: false }}>
      <ClaimStack.Screen name="Claims" component={ClaimScreen} />
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
      <Text
        numberOfLines={1}
        ellipsizeMode="clip"
        style={focused ? [tabStyles.label, tabStyles.labelActive] : tabStyles.label}
      >
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
        tabBarShowLabel: false,
        tabBarLabel: () => null,
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
          tabBarIcon: ({ focused }) => (
            <TabIcon name="assignment-turned-in" label="Claims" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="person" label="Profile" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Drawer Navigator wrapping Tabs
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.slate600,
        drawerLabelStyle: { fontWeight: '600', marginLeft: -10 },
      }}
    >
      <Drawer.Screen 
        name="App" 
        component={MainTabs} 
        options={{ 
          drawerLabel: ' Dashboard',
          drawerIcon: ({ color, size }) => <MaterialIcons name="dashboard" size={size} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="ProfileDrawer" 
        component={ProfileScreen} 
        options={{ 
          drawerLabel: ' My Profile',
          drawerIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="ClaimsDrawer" 
        component={ClaimsNavigator} 
        options={{ 
          drawerLabel: ' My Claims',
          drawerIcon: ({ color, size }) => <MaterialIcons name="history" size={size} color={color} />
        }} 
      />
    </Drawer.Navigator>
  );
}

// Root navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="MainTabs" component={DrawerNavigator} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const drawerStyles = StyleSheet.create({
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: colors.bgLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryLight,
  },
  avatarWrap: {
    width: 64, height: 64,
    borderRadius: 32,
    borderWidth: 2, borderColor: colors.primary,
    overflow: 'hidden',
    marginBottom: 12,
  },
  avatar: { width: '100%', height: '100%' },
  name: { fontSize: fontSize.lg, fontWeight: '700', color: colors.slate900 },
  platform: { fontSize: fontSize.xs, fontWeight: '600', color: colors.primary, marginTop: 2 },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.slate100,
  },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, marginLeft: -10},
  logoutText: { color: '#ef4444', fontWeight: '700', fontSize: fontSize.base },
});

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
