import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, fontSize } from '../constants/theme';

export default function PolicyScreen({ navigation }) {
  const coverageItems = [
    { label: 'Work Disruption', value: '₹5,000 / day', icon: 'event-busy' },
    { label: 'Accidental Injury', value: 'Up to ₹2,00,000', icon: 'medical-services' },
    { label: 'Identity Theft', value: 'Up to ₹50,000', icon: 'fingerprint' },
    { label: 'Device Protection', value: 'Up to ₹15,000', icon: 'smartphone' },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgLight} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.slate900} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Insurance Policy</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Active Policy Card */}
        <View style={styles.bannerWrap}>
          <LinearGradient
            colors={[colors.primary, '#ea580c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.policyCard}
          >
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.policyTier}>SHIELD ELITE (V2)</Text>
                <Text style={styles.policyStatus}>Active Coverage</Text>
              </View>
              <MaterialIcons name="verified" size={40} color="rgba(255,255,255,0.4)" />
            </View>
            <View style={styles.cardDivider} />
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.footerLabel}>Policy Number</Text>
                <Text style={styles.footerValue}>GS-2026-X8829</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.footerLabel}>Valid Until</Text>
                <Text style={styles.footerValue}>24 Oct 2026</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Coverage Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coverage Highlights</Text>
          {coverageItems.map((item, i) => (
            <View key={i} style={styles.coverageRow}>
              <View style={styles.iconBox}>
                <MaterialIcons name={item.icon} size={24} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.coverageLabel}>{item.label}</Text>
                <Text style={styles.coverageValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Premium Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Premium & Payments</Text>
          <View style={styles.premiumBox}>
            <View style={styles.premiumRow}>
              <Text style={styles.premiumLabel}>Monthly Premium</Text>
              <Text style={styles.premiumValue}>₹499</Text>
            </View>
            <View style={styles.premiumRow}>
              <Text style={styles.premiumLabel}>Next Billing Date</Text>
              <Text style={styles.premiumValue}>15 Apr 2026</Text>
            </View>
            <TouchableOpacity style={styles.manageBtn}>
              <Text style={styles.manageBtnText}>Manage Payments</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <TouchableOpacity style={styles.docRow}>
            <MaterialIcons name="picture-as-pdf" size={24} color="#ef4444" />
            <Text style={styles.docName}>Policy Bond (PDF)</Text>
            <MaterialIcons name="download" size={20} color={colors.slate400} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.docRow}>
            <MaterialIcons name="picture-as-pdf" size={24} color="#ef4444" />
            <Text style={styles.docName}>Terms & Conditions</Text>
            <MaterialIcons name="download" size={20} color={colors.slate400} />
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
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.slate900 },
  bannerWrap: { padding: 16 },
  policyCard: { borderRadius: radius.xl, padding: 24, shadowColor: colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 8 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  policyTier: { color: 'white', fontSize: fontSize.lg, fontWeight: '900', letterSpacing: 1 },
  policyStatus: { color: 'rgba(255,255,255,0.8)', fontSize: fontSize.xs, fontWeight: '700', marginTop: 4, textTransform: 'uppercase' },
  cardDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: 20 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  footerLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '600', textTransform: 'uppercase', marginBottom: 4 },
  footerValue: { color: 'white', fontSize: fontSize.sm, fontWeight: '700' },
  section: { backgroundColor: colors.white, padding: 20, marginBottom: 12 },
  sectionTitle: { fontSize: fontSize.sm, fontWeight: '800', color: colors.slate500, textTransform: 'uppercase', marginBottom: 20 },
  coverageRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20 },
  iconBox: { width: 48, height: 48, borderRadius: radius.lg, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  coverageLabel: { fontSize: fontSize.base, fontWeight: '700', color: colors.slate900 },
  coverageValue: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600', marginTop: 2 },
  premiumBox: { backgroundColor: colors.bgLight, borderRadius: radius.xl, padding: 16, borderWidth: 1, borderColor: colors.slate100 },
  premiumRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  premiumLabel: { fontSize: fontSize.sm, color: colors.slate600, fontWeight: '500' },
  premiumValue: { fontSize: fontSize.sm, color: colors.slate900, fontWeight: '700' },
  manageBtn: { backgroundColor: colors.white, borderSize: 1, borderColor: colors.slate200, paddingVertical: 12, borderRadius: radius.lg, alignItems: 'center', marginTop: 4, borderWidth: 1 },
  manageBtnText: { color: colors.primary, fontWeight: '700', fontSize: fontSize.sm },
  docRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.slate100 },
  docName: { flex: 1, fontSize: fontSize.base, color: colors.slate700, fontWeight: '500' },
});
