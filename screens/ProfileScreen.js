import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, radius, fontSize } from '../constants/theme';
import { mockUser } from '../context/AppContext';

export default function ProfileScreen({ navigation }) {

  const menuItems = [
    { icon: 'person', label: 'My Account', sub: 'Personal details & preferences' },
    { icon: 'shield', label: 'Insurance Policy', sub: 'Active plans & coverage' },
    { icon: 'history', label: 'Claim History', sub: 'Past claims & payments' },
    { icon: 'notifications', label: 'Notifications', sub: 'Alerts & updates' },
    { icon: 'help', label: 'Help & Support', sub: 'FAQs & contact us' },
    { icon: 'settings', label: 'Settings', sub: 'App preferences & security' },
    { icon: 'logout', label: 'Logout', sub: 'Sign out of your account', dangerous: true },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgLight} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.slate900} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: mockUser.avatar }} style={styles.avatar} />
          </View>
          <Text style={styles.userName}>{mockUser.name}</Text>
          <Text style={styles.userPlatform}>{mockUser.platform}</Text>
          <View style={styles.phoneRow}>
            <MaterialIcons name="phone" size={14} color={colors.slate500} />
            <Text style={styles.userPhone}>{mockUser.phone}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>84</Text>
            <Text style={styles.statLabel}>Clean Days</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>₹2.4k</Text>
            <Text style={styles.statLabel}>Total Payout</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>V2</Text>
            <Text style={styles.statLabel}>Shield Tier</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.menuItem}
              onPress={() => {
                if (item.label === 'Notifications') {
                  navigation.navigate('Notifications');
                } else if (item.label === 'My Account') {
                  navigation.navigate('Account');
                } else if (item.label === 'Insurance Policy') {
                  navigation.navigate('Policy');
                } else if (item.label === 'Claim History') {
                  navigation.navigate('ClaimHistory');
                } else if (item.label === 'Help & Support') {
                  navigation.navigate('Support');
                } else if (item.label === 'Settings') {
                  navigation.navigate('Settings');
                } else if (item.label === 'Logout') {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  });
                }
              }}
            >
              <View style={[styles.menuIconWrap, item.dangerous && styles.dangerIcon]}>
                <MaterialIcons
                  name={item.icon}
                  size={22}
                  color={item.dangerous ? '#ef4444' : colors.primary}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={[styles.menuLabel, item.dangerous && styles.dangerText]}>
                  {item.label}
                </Text>
                <Text style={styles.menuSub}>{item.sub}</Text>
              </View>

              <MaterialIcons name="chevron-right" size={20} color={colors.slate400} />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgLight },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(251,127,19,0.1)',
  },

  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.slate900,
  },

  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },

  avatarWrap: {
    width: 100,
    height: 100,
    borderRadius: radius.full,
    borderWidth: 3,
    borderColor: colors.primary,
    marginBottom: 16,
    overflow: 'hidden',
  },

  avatar: { width: '100%', height: '100%' },

  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.slate900,
  },

  userPlatform: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 4,
  },

  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },

  userPhone: {
    fontSize: fontSize.sm,
    color: colors.slate500,
  },

  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 32,
  },

  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: radius.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.slate100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  statVal: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.primary,
  },

  statLabel: {
    fontSize: fontSize.xs,
    color: colors.slate500,
    marginTop: 4,
    fontWeight: '600',
  },

  menuSection: {
    paddingHorizontal: 16,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: radius.xl,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.slate100,
  },

  menuIconWrap: {
    width: 44,
    height: 44,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dangerIcon: {
    backgroundColor: '#fee2e2',
  },

  menuLabel: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.slate900,
  },

  menuSub: {
    fontSize: fontSize.xs,
    color: colors.slate500,
    marginTop: 2,
  },

  dangerText: {
    color: '#ef4444',
  },
});