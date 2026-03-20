import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, radius, fontSize } from '../constants/theme';

export default function ClaimHistoryScreen({ navigation }) {
  const claims = [
    { id: 'CLM-001', type: 'Income loss due to Heavy Rain', date: '12 Mar 2026', amount: '₹450', status: 'Paid', statusColor: '#16a34a' },
    { id: 'CLM-002', type: 'Income loss due to Cyclone Alert', date: '28 Feb 2026', amount: '₹900', status: 'Paid', statusColor: '#16a34a' },
    { id: 'CLM-003', type: 'Income loss due to Extreme Heat', date: '15 Jan 2026', amount: '₹337.5', status: 'Paid', statusColor: '#16a34a' },
    { id: 'CLM-004', type: 'Income loss due to Air Pollution', date: '05 Jan 2026', amount: '₹562.5', status: 'Paid', statusColor: '#16a34a' },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgLight} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.slate900} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Claim History</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.summaryWrap}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryVal}>12</Text>
              <Text style={styles.summaryLabel}>Total Claims</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryVal}>₹14,500</Text>
              <Text style={styles.summaryLabel}>Total Paid</Text>
            </View>
          </View>
        </View>

        {/* Claims List */}
        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>Recent Claims</Text>
          {claims.map((claim, i) => (
            <TouchableOpacity key={i} style={styles.claimRow}>
              <View style={styles.claimIconWrap}>
                <MaterialIcons 
                  name={claim.type.includes('Rain') ? 'opacity' : 'flash-on'} 
                  size={24} 
                  color={colors.primary} 
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.rowTop}>
                  <Text style={styles.claimType}>{claim.type}</Text>
                  <Text style={styles.claimAmount}>{claim.amount}</Text>
                </View>
                <View style={styles.rowBottom}>
                  <Text style={styles.claimDate}>{claim.date} • {claim.id}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: claim.statusColor + '15' }]}>
                    <Text style={[styles.statusText, { color: claim.statusColor }]}>{claim.status}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info */}
        <View style={styles.infoBox}>
          <MaterialIcons name="info-outline" size={20} color={colors.slate400} />
          <Text style={styles.infoText}>Only showing claims from the last 6 months. For older claims, please contact support.</Text>
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
  summaryWrap: { padding: 16 },
  summaryCard: {
    flexDirection: 'row', backgroundColor: colors.white, 
    borderRadius: radius.xl, paddingVertical: 20,
    borderWidth: 1, borderColor: colors.slate100,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 3,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryVal: { fontSize: fontSize.xl, fontWeight: '800', color: colors.primary },
  summaryLabel: { fontSize: fontSize.xs, color: colors.slate500, marginTop: 4, fontWeight: '600' },
  divider: { width: 1, height: '100%', backgroundColor: colors.slate100 },
  listSection: { padding: 16 },
  sectionTitle: { fontSize: fontSize.sm, fontWeight: '800', color: colors.slate500, textTransform: 'uppercase', marginBottom: 16 },
  claimRow: {
    flexDirection: 'row', gap: 14, backgroundColor: colors.white,
    padding: 16, borderRadius: radius.xl, marginBottom: 12,
    borderWidth: 1, borderColor: colors.slate100,
  },
  claimIconWrap: { width: 48, height: 48, borderRadius: radius.lg, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  claimType: { fontSize: fontSize.base, fontWeight: '700', color: colors.slate900 },
  claimAmount: { fontSize: fontSize.base, fontWeight: '800', color: colors.slate900 },
  rowBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  claimDate: { fontSize: fontSize.xs, color: colors.slate500 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.full },
  statusText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  infoBox: { flexDirection: 'row', gap: 10, padding: 24, paddingHorizontal: 32, alignItems: 'center' },
  infoText: { fontSize: fontSize.xs, color: colors.slate500, lineHeight: 18, flex: 1 },
});
