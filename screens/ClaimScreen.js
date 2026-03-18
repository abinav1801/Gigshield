import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, fontSize } from '../constants/theme';
import { mockClaim } from '../context/AppContext';

const RAIN_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVLsN43O8SuP1byVh2mykXYyfgMZHm-XeBbZJfrWWuAK6xxJLDkeEXD1UqgcjAM-E3mwvXi71ycWEJe2g_HSBTlPDCQUPB8QA4ZoTtPd_ULJDQSaPzMZr0HfHIBmJ1BOdGtEPmhGIdyYUC59xh7nHzr5Lw4sAkDyApzEV4IVzNy8swNasgm6W6kH9onN-i1QjVQHw69qcuixD1dnPM_1bJ-EyLUgAhAz-b05Gt6bL4s2xN7lbqlzg0pP6GBhgp2eTjcTIuQTLnj2bZ';

export default function ClaimScreen({ navigation }) {
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
          <View style={styles.banner}>
            <View style={styles.bannerRow}>
              <MaterialIcons name="opacity" size={28} color={colors.white} />
              <Text style={styles.bannerTitle}>Heavy Rain Detected</Text>
            </View>
            <Text style={styles.bannerSubtitle}>
              Automatic disruption monitoring is active for your current location.
            </Text>
          </View>
        </View>

        {/* Location image */}
        <View style={styles.imageWrap}>
          <ImageBackground
            source={{ uri: RAIN_IMAGE }}
            style={[styles.locationImage, { resizeMode: 'cover' }]}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.6)']}
              style={styles.imageGradient}
            >
              <View style={styles.locationRow}>
                <MaterialIcons name="location-on" size={14} color="white" />
                <Text style={styles.locationText}>CURRENT ZONE: {mockClaim.zone}</Text>
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
            <Text style={styles.metricValue}>{mockClaim.workInterruption}</Text>
          </View>
          <View style={styles.metricCard}>
            <View style={styles.metricLabelRow}>
              <MaterialIcons name="payments" size={14} color={colors.primary} />
              <Text style={styles.metricLabel}>ESTIMATED LOSS</Text>
            </View>
            <Text style={styles.metricValue}>{mockClaim.estimatedLoss}</Text>
          </View>
        </View>

        {/* Claim status card */}
        <View style={styles.claimCard}>
          <View style={styles.claimTopRow}>
            {/* Pulsing icon */}
            <View style={styles.pulseWrap}>
              <View style={styles.pulseRing} />
              <View style={styles.pulseInner}>
                <MaterialIcons name="sync" size={22} color={colors.white} />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.claimTitle}>Claim automatically triggered</Text>
              <Text style={styles.claimDesc}>
                Based on real-time weather and gig-platform data integration.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.trackBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Payout')}
          >
            <Text style={styles.trackBtnText}>Track Claim Status</Text>
            <MaterialIcons name="arrow-forward" size={18} color={colors.white} />
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
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  bannerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  bannerTitle: { fontSize: 22, fontWeight: '900', color: colors.white, letterSpacing: -0.5 },
  bannerSubtitle: { fontSize: fontSize.sm, fontWeight: '500', color: 'rgba(255,255,255,0.9)' },
  imageWrap: { paddingHorizontal: 16 },
  locationImage: {
    height: 200,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1, borderColor: 'rgba(251,127,19,0.1)',
  },
  imageGradient: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
    justifyContent: 'flex-end', padding: 12,
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  locationText: { fontSize: fontSize.xs, fontWeight: '500', color: colors.white, letterSpacing: 1, textTransform: 'uppercase' },
  metricsGrid: { flexDirection: 'row', gap: 12, padding: 16 },
  metricCard: {
    flex: 1, backgroundColor: colors.primaryLight,
    borderRadius: radius.xl, padding: 16,
    borderWidth: 1, borderColor: 'rgba(251,127,19,0.2)',
    gap: 8,
  },
  metricLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metricLabel: { fontSize: fontSize.xs, fontWeight: '600', color: colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  metricValue: { fontSize: fontSize.xxl, fontWeight: '900', color: colors.slate900 },
  claimCard: {
    marginHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: 20,
    borderWidth: 1, borderColor: colors.slate200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  claimTopRow: { flexDirection: 'row', gap: 14, alignItems: 'flex-start', marginBottom: 20 },
  pulseWrap: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  pulseRing: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(251,127,19,0.2)',
  },
  pulseInner: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  claimTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.slate900, marginBottom: 4 },
  claimDesc: { fontSize: fontSize.sm, color: colors.slate600, lineHeight: 20 },
  trackBtn: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  trackBtnText: { fontSize: fontSize.base, fontWeight: '700', color: colors.white },
});
