import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, ImageBackground, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, fontSize } from '../constants/theme';
import { useApp } from '../context/AppContext';
import { claimAPI } from '../services/api';

const MAP_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_sgOMqbVwKmkECxQ0wqSTF0loDIyiUIzRcbgtHFpXy6yertBnFW5MHrmH-JubNTyG7kva1S3EyKMj9kvY6zwOr0T1GFLDpQOpHbZ1BMhW6E3rlg-B7t6atLkn57NWtE4aVFabwtVD6Zt3W48vWH9SCGM29mI9KxlD1Z4g86wtfSKi1N_dHE7aHIuHo_gMNJ1U8qwFj-Cn_AVUbcv-gSGcaFX_887xuYL26I8hIWDSQ3RLKUwq_-4neUfxBzGfSle0IGL62ifAgOME';

const TRIGGER_TYPE_MAP = {
  rain:    { icon: 'opacity',      label: 'Heavy Rain Detected',  color: '#3b82f6' },
  heat:    { icon: 'thermostat',   label: 'Extreme Heat Detected',color: '#ef4444' },
  aqi:     { icon: 'air',          label: 'Air Pollution Detected',color: '#8b5cf6' },
  cyclone: { icon: 'storm',        label: 'Cyclone Alert',        color: '#f97316' },
};

export default function ClaimScreen({ navigation }) {
  const { weather, activePlan, fetchWeather } = useApp();
  const [loading, setLoading] = useState(false);
  const [submittedClaim, setSubmittedClaim] = useState(null);

  // Pick the first active alert from weather
  const alert = weather?.alerts?.[0] || null;
  const triggerType  = alert?.type || 'rain';
  const triggerValue = alert?.triggerValue || weather?.rainfall || 65;
  const triggerInfo  = TRIGGER_TYPE_MAP[triggerType] || TRIGGER_TYPE_MAP.rain;

  // Estimated hours lost (based on severity)
  const hoursLost = alert?.severity === 'HIGH' ? 4 : 2;
  const estimatedLoss = activePlan
    ? `₹${Math.round(hoursLost * (activePlan.coveragePerHour || 112.5))}`
    : '—';

  const handleTriggerClaim = async () => {
    if (!activePlan) {
      Alert.alert('No Plan', 'Please subscribe to a plan before triggering a claim.', [
        { text: 'View Plans', onPress: () => navigation.navigate('Plans') },
        { text: 'Cancel', style: 'cancel' },
      ]);
      return;
    }

    setLoading(true);
    try {
      const res = await claimAPI.triggerClaim(
        triggerType,
        triggerValue,
        hoursLost,
        weather?.location || 'Chennai Central Zone'
      );
      setSubmittedClaim(res.data.claim);
      // Navigate to payout screen with real claim data
      navigation.navigate('Payout', { claim: res.data.claim, payout: res.data.payout });
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to submit claim. Please try again.';
      Alert.alert('Claim Failed', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgLight} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.slate900} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>GigShield</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Alert banner */}
        <View style={styles.bannerWrap}>
          <View style={[styles.banner, { backgroundColor: triggerInfo.color }]}>
            <View style={styles.bannerRow}>
              <MaterialIcons name={triggerInfo.icon} size={28} color="white" />
              <Text style={styles.bannerTitle}>{triggerInfo.label}</Text>
            </View>
            <Text style={styles.bannerSubtitle}>
              Monitoring income loss due to weather disruptions in your area.
            </Text>
          </View>
        </View>

        {/* Location image */}
        <View style={styles.imageWrap}>
          <ImageBackground
            source={{ uri: MAP_IMAGE }}
            style={[styles.locationImage, { resizeMode: 'cover' }]}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.6)']}
              style={styles.imageGradient}
            >
              <View style={styles.locationRow}>
                <MaterialIcons name="location-on" size={14} color="white" />
                <Text style={styles.locationText}>
                  CURRENT ZONE: {weather?.location || 'Chennai Central Zone'}
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* Metrics grid */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <View style={styles.metricLabelRow}>
              <MaterialIcons name="timer" size={14} color={colors.primary} />
              <Text style={styles.metricLabel}>WORK INTERRUPTION</Text>
            </View>
            <Text style={styles.metricValue}>{hoursLost} hours</Text>
          </View>
          <View style={styles.metricCard}>
            <View style={styles.metricLabelRow}>
              <MaterialIcons name="payments" size={14} color={colors.primary} />
              <Text style={styles.metricLabel}>ESTIMATED LOSS</Text>
            </View>
            <Text style={styles.metricValue}>{estimatedLoss}</Text>
          </View>
        </View>

        {/* Claim status card */}
        <View style={styles.claimCard}>
          <View style={styles.claimTopRow}>
            <View style={styles.pulseWrap}>
              <View style={styles.pulseRing} />
              <View style={styles.pulseInner}>
                <MaterialIcons name="sync" size={22} color="white" />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.claimTitle}>
                {activePlan ? 'Claim auto-trigger ready' : 'Subscribe to claim'}
              </Text>
              <Text style={styles.claimDesc}>
                {activePlan
                  ? `${activePlan.name} — Coverage ₹${activePlan.coveragePerHour}/hr. Tap below to submit.`
                  : 'You need an active plan to trigger a claim.'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.trackBtn, loading && { opacity: 0.7 }]}
            activeOpacity={0.85}
            onPress={handleTriggerClaim}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text style={styles.trackBtnText}>
                  {activePlan ? 'Submit Claim & Get Payout' : 'View Plans'}
                </Text>
                <MaterialIcons name="arrow-forward" size={18} color="white" />
              </>
            )}
          </TouchableOpacity>
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
    backgroundColor: colors.bgLight,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.slate900, flex: 1, textAlign: 'center', marginRight: 40 },
  bannerWrap: { padding: 16 },
  banner: {
    borderRadius: radius.xl, padding: 20,
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  bannerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  bannerTitle: { fontSize: 22, fontWeight: '900', color: colors.white, letterSpacing: -0.5 },
  bannerSubtitle: { fontSize: fontSize.sm, fontWeight: '500', color: 'rgba(255,255,255,0.9)' },
  imageWrap: { paddingHorizontal: 16 },
  locationImage: { height: 200, borderRadius: radius.xl, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(251,127,19,0.1)' },
  imageGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, justifyContent: 'flex-end', padding: 12 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  locationText: { fontSize: fontSize.xs, fontWeight: '500', color: colors.white, letterSpacing: 1, textTransform: 'uppercase' },
  metricsGrid: { flexDirection: 'row', gap: 12, padding: 16 },
  metricCard: { flex: 1, backgroundColor: colors.primaryLight, borderRadius: radius.xl, padding: 16, borderWidth: 1, borderColor: 'rgba(251,127,19,0.2)', gap: 8 },
  metricLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metricLabel: { fontSize: fontSize.xs, fontWeight: '600', color: colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  metricValue: { fontSize: fontSize.xxl, fontWeight: '900', color: colors.slate900 },
  claimCard: { marginHorizontal: 16, backgroundColor: colors.white, borderRadius: radius.xl, padding: 20, borderWidth: 1, borderColor: colors.slate200, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  claimTopRow: { flexDirection: 'row', gap: 14, alignItems: 'flex-start', marginBottom: 20 },
  pulseWrap: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  pulseRing: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(251,127,19,0.2)' },
  pulseInner: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  claimTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.slate900, marginBottom: 4 },
  claimDesc: { fontSize: fontSize.sm, color: colors.slate600, lineHeight: 20 },
  trackBtn: { height: 52, backgroundColor: colors.primary, borderRadius: radius.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  trackBtnText: { fontSize: fontSize.base, fontWeight: '700', color: colors.white },
});
