import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, radius, fontSize } from '../constants/theme';
import { mockUser } from '../context/AppContext';

export default function AccountScreen({ navigation }) {
  const infoItems = [
    { label: 'Full Name', value: mockUser.name, icon: 'person' },
    { label: 'Phone Number', value: mockUser.phone, icon: 'phone' },
    { label: 'Primary Platform', value: mockUser.platform, icon: 'directions-bike' },
    { label: 'Member Since', value: 'Oct 2025', icon: 'calendar-today' },
    { label: 'KYC Status', value: 'Verified', icon: 'verified', color: '#16a34a' },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgLight} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.slate900} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Account</Text>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: mockUser.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.changeAvatarBtn}>
              <MaterialIcons name="camera-alt" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{mockUser.name}</Text>
          <Text style={styles.userSub}>Shield ID: #GS-8829</Text>
        </View>

        {/* Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          {infoItems.map((item, i) => (
            <View key={i} style={styles.infoRow}>
              <View style={styles.iconBox}>
                <MaterialIcons name={item.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={[styles.infoValue, item.color && { color: item.color }]}>
                  {item.value}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Payout Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payout Method</Text>
          <View style={styles.bankCard}>
            <View style={styles.bankIconWrap}>
              <MaterialIcons name="account-balance" size={24} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.bankName}>HDFC Bank •••• 4202</Text>
              <Text style={styles.bankStatus}>Primary Account</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgLight },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: 'rgba(251,127,19,0.1)',
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.slate900 },
  editBtn: { paddingHorizontal: 16, paddingVertical: 8 },
  editBtnText: { color: colors.primary, fontWeight: '700', fontSize: fontSize.base },
  profileCard: { alignItems: 'center', paddingVertical: 32, backgroundColor: colors.white, marginBottom: 12 },
  avatarWrap: { width: 100, height: 100, borderRadius: 50, position: 'relative', marginBottom: 16 },
  avatar: { width: '100%', height: '100%', borderRadius: 50, borderWidth: 3, borderColor: colors.primaryLight },
  changeAvatarBtn: {
    position: 'absolute', bottom: 0, right: 0,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: colors.white,
  },
  userName: { fontSize: 22, fontWeight: '800', color: colors.slate900 },
  userSub: { fontSize: fontSize.sm, color: colors.slate500, marginTop: 4 },
  section: { backgroundColor: colors.white, padding: 20, marginBottom: 12 },
  sectionTitle: { fontSize: fontSize.sm, fontWeight: '800', color: colors.slate500, textTransform: 'uppercase', marginBottom: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  iconBox: { width: 40, height: 40, borderRadius: radius.lg, backgroundColor: colors.bgLight, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  infoContent: { borderBottomWidth: 1, borderBottomColor: colors.slate100, flex: 1, paddingBottom: 12 },
  infoLabel: { fontSize: fontSize.xs, color: colors.slate500, marginBottom: 4 },
  infoValue: { fontSize: fontSize.base, fontWeight: '700', color: colors.slate900 },
  bankCard: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    padding: 16, borderRadius: radius.xl,
    backgroundColor: colors.bgLight, borderWidth: 1, borderColor: colors.slate100,
  },
  bankIconWrap: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  bankName: { fontSize: fontSize.base, fontWeight: '700', color: colors.slate900 },
  bankStatus: { fontSize: fontSize.xs, color: '#16a34a', fontWeight: '600', marginTop: 2 },
  changeText: { color: colors.primary, fontWeight: '700', fontSize: fontSize.sm },
});
