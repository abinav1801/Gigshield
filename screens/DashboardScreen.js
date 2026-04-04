import React, { useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image, StatusBar, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, radius, fontSize } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function DashboardScreen({ navigation }) {
  const {
    user, activePlan, weather, weatherLoading,
    fetchWeather, claimTriggered,
  } = useApp();

  // Refresh weather on focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchWeather();
    });
    return unsubscribe;
  }, [navigation, fetchWeather]);

  const earningsDisplay = user?.currentWeekEarnings
    ? `₹${user.currentWeekEarnings.toLocaleString('en-IN')}`
    : '₹0';

  const riskLevel = weather?.riskLevel || 'Low Risk';
  const riskColor =
    riskLevel === 'High Risk' ? '#ef4444' :
    riskLevel === 'Medium Risk' ? colors.orange500 : '#22c55e';

  const primaryAlert = weather?.alerts?.[0] || null;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgLight} />

      {/* Sticky Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.openDrawer()}>
          <MaterialIcons name="menu" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>GigShield</Text>
        <TouchableOpacity style={styles.notifBtn} onPress={() => navigation.navigate('Notifications')}>
          <MaterialIcons name="notifications" size={22} color={colors.primary} />
          <View style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444', borderWidth: 1, borderColor: 'white' }} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Profile Card */}
        <View style={styles.section}>
          <View style={styles.profileCard}>
            <View style={styles.avatarWrap}>
              {user?.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                  <Text style={styles.avatarInitial}>
                    {user?.name?.charAt(0)?.toUpperCase() || 'G'}
                  </Text>
                </View>
              )}
            </View>
            <View>
              <Text style={styles.userName}>{user?.name || 'Welcome!'}</Text>
              <Text style={styles.userPlatform}>{user?.platform || 'Gig Worker'} Partner</Text>
            </View>
          </View>
        </View>

        {/* Earnings Card */}
        <View style={styles.section}>
          <LinearGradient
            colors={[colors.primary, colors.orange600]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.earningsCard}
          >
            <View style={styles.earningsBlur} />
            <Text style={styles.earningsLabel}>This Week's Earnings</Text>
            <Text style={styles.earningsAmount}>{earningsDisplay}</Text>
            <View style={styles.trendBadge}>
              <MaterialIcons name="trending-up" size={14} color="white" />
              <Text style={styles.trendText}>Updated daily</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8} onPress={() => navigation.navigate('Plans')}>
              <View style={styles.actionIcon}>
                <MaterialIcons name="shield" size={22} color={colors.primary} />
              </View>
              <Text style={styles.actionLabel}>VIEW{'\n'}PLANS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8} onPress={() => navigation.navigate('Risk')}>
              <View style={styles.actionIcon}>
                <MaterialIcons name="water-drop" size={22} color={colors.primary} />
              </View>
              <Text style={styles.actionLabel}>CHECK{'\n'}RISK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('MainTabs', { screen: 'App', params: { screen: 'Claims' } })}
            >
              <View style={styles.actionIcon}>
                <MaterialIcons name="account-balance-wallet" size={22} color={colors.primary} />
              </View>
              <Text style={styles.actionLabel}>MY{'\n'}CLAIMS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Active Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Plan</Text>
          {activePlan ? (
            <View style={styles.activePlanCard}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={styles.planName}>{activePlan.name}</Text>
                <Text style={styles.planDesc}>
                  Coverage: ₹{activePlan.coveragePerDay?.toLocaleString('en-IN')}/day
                </Text>
              </View>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>Active</Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.noPlanCard} onPress={() => navigation.navigate('Plans')} activeOpacity={0.8}>
              <MaterialIcons name="add-circle-outline" size={22} color={colors.primary} />
              <Text style={styles.noPlanText}>No active plan — Tap to subscribe</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* AI Risk Alert */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <MaterialIcons name="psychology" size={22} color={colors.primary} />
            <Text style={styles.sectionTitle}>AI Risk Alert</Text>
          </View>

          {weatherLoading ? (
            <ActivityIndicator color={colors.primary} />
          ) : primaryAlert ? (
            <TouchableOpacity style={styles.alertCard} activeOpacity={0.9} onPress={() => navigation.navigate('Risk')}>
              <View style={styles.alertIconWrap}>
                <MaterialIcons name="notifications-active" size={28} color={colors.orange500} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.alertTopRow}>
                  <Text style={styles.alertTitle}>{primaryAlert.title}</Text>
                  <View style={[styles.riskBadge, { backgroundColor: riskColor }]}>
                    <Text style={styles.riskBadgeText}>{riskLevel.split(' ')[0].toUpperCase()}</Text>
                  </View>
                </View>
                <Text style={styles.alertDesc}>{primaryAlert.description}</Text>
                {claimTriggered && activePlan && (
                  <TouchableOpacity
                    style={styles.claimNowBtn}
                    onPress={() => navigation.navigate('MainTabs', { screen: 'App', params: { screen: 'Claims' } })}
                  >
                    <Text style={styles.claimNowText}>Claim Now →</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.safeCard}>
              <MaterialIcons name="check-circle" size={24} color="#22c55e" />
              <Text style={styles.safeText}>All clear — No active risk alerts</Text>
            </View>
          )}
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
    backgroundColor: 'rgba(248,247,245,0.95)', borderBottomWidth: 1,
    borderBottomColor: 'rgba(251,127,19,0.1)',
  },
  iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.primary },
  notifBtn: {
    width: 40, height: 40, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.primaryLight, borderRadius: 10,
  },
  scroll: { flex: 1 },
  section: { paddingHorizontal: 16, paddingBottom: 16 },
  profileCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: colors.white, padding: 16, borderRadius: radius.xl,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
    borderWidth: 1, borderColor: 'rgba(251,127,19,0.05)',
  },
  avatarWrap: {
    width: 64, height: 64, borderRadius: radius.full,
    borderWidth: 2, borderColor: colors.primary, overflow: 'hidden',
    backgroundColor: colors.primaryMedium,
  },
  avatar: { width: '100%', height: '100%' },
  avatarPlaceholder: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryLight },
  avatarInitial: { fontSize: 28, fontWeight: '700', color: colors.primary },
  userName: { fontSize: fontSize.lg, fontWeight: '700', color: colors.slate900 },
  userPlatform: { fontSize: fontSize.sm, fontWeight: '500', color: colors.primary },
  earningsCard: { borderRadius: radius.xl, padding: 24, overflow: 'hidden' },
  earningsBlur: {
    position: 'absolute', top: -32, right: -32, width: 128, height: 128,
    borderRadius: radius.full, backgroundColor: 'rgba(255,255,255,0.1)',
  },
  earningsLabel: { fontSize: fontSize.sm, color: 'rgba(255,255,255,0.8)', fontWeight: '500' },
  earningsAmount: { fontSize: 32, fontWeight: '700', color: colors.white, marginTop: 4 },
  trendBadge: {
    marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10,
    paddingVertical: 4, borderRadius: radius.full, alignSelf: 'flex-start',
  },
  trendText: { fontSize: fontSize.xs, color: colors.white },
  quickActions: { flexDirection: 'row', gap: 10 },
  actionBtn: {
    flex: 1, alignItems: 'center', gap: 8, paddingVertical: 12,
    backgroundColor: colors.white, borderRadius: radius.xl,
    borderWidth: 1, borderColor: 'rgba(251,127,19,0.05)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 3, elevation: 2,
  },
  actionIcon: { backgroundColor: colors.primaryLight, padding: 8, borderRadius: radius.lg },
  actionLabel: { fontSize: fontSize.xs, fontWeight: '700', color: colors.slate900, textAlign: 'center', letterSpacing: 0.5 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.slate900, marginBottom: 12 },
  activePlanCard: {
    backgroundColor: colors.white, padding: 16, borderRadius: radius.xl,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderLeftWidth: 4, borderLeftColor: colors.primary,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 2,
  },
  noPlanCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10, padding: 16,
    backgroundColor: colors.primaryLight, borderRadius: radius.xl,
    borderWidth: 1, borderColor: 'rgba(251,127,19,0.2)', borderStyle: 'dashed',
  },
  noPlanText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary },
  planName: { fontWeight: '700', color: colors.primary, fontSize: fontSize.base },
  planDesc: { fontSize: fontSize.sm, color: colors.slate500, marginTop: 2 },
  activeBadge: { backgroundColor: colors.green100, paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.full },
  activeBadgeText: { fontSize: fontSize.xs, fontWeight: '700', color: colors.green600, textTransform: 'uppercase' },
  alertCard: {
    flexDirection: 'row', gap: 14, backgroundColor: colors.orange50,
    borderWidth: 1, borderColor: 'rgba(251,127,19,0.2)', padding: 16, borderRadius: radius.xl,
  },
  alertIconWrap: { backgroundColor: colors.orange100, padding: 12, borderRadius: radius.lg, alignSelf: 'flex-start' },
  alertTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  alertTitle: { fontWeight: '700', color: colors.slate900, fontSize: fontSize.base },
  riskBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.sm },
  riskBadgeText: { fontSize: fontSize.xs, fontWeight: '700', color: colors.white },
  alertDesc: { fontSize: fontSize.sm, color: colors.slate600, lineHeight: 20 },
  claimNowBtn: {
    marginTop: 10, backgroundColor: colors.primary, borderRadius: radius.lg,
    paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start',
  },
  claimNowText: { fontSize: fontSize.sm, fontWeight: '700', color: colors.white },
  safeCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#f0fdf4', padding: 16, borderRadius: radius.xl,
    borderWidth: 1, borderColor: '#bbf7d0',
  },
  safeText: { fontSize: fontSize.sm, fontWeight: '600', color: '#16a34a' },
});
