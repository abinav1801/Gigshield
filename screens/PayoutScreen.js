import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, fontSize } from '../constants/theme';
import { mockClaim, useApp } from '../context/AppContext';

const detailRows = [
  { label: 'Reason', value: mockClaim.reason },
  { label: 'Duration', value: mockClaim.duration },
  { label: 'Status', value: 'Sent to Bank Account', sub: `Transaction ID: ${mockClaim.transactionId}`, subColor: colors.green600 },
];

export default function PayoutScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgLight} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={22} color={colors.slate900} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payout Confirmation</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Success visual */}
        <View style={styles.successSection}>
          <View style={styles.checkCircle}>
            <MaterialIcons name="check-circle" size={72} color={colors.green600} />
          </View>
          <Text style={styles.successTitle}>₹450 Compensation Sent</Text>
          <Text style={styles.successSubtitle}>Income Loss Protection Active</Text>
        </View>

        {/* Details card */}
        <View style={styles.detailsCard}>
          {detailRows.map((row, i) => (
            <View key={row.label}>
              {i > 0 && <View style={styles.separator} />}
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>{row.label}</Text>
                <View style={styles.detailValueWrap}>
                  <Text style={styles.detailValue}>{row.value}</Text>
                  {row.sub && <Text style={[styles.detailSub, { color: row.subColor }]}>{row.sub}</Text>}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Decorative graphic */}
        <View style={styles.decorWrap}>
          <LinearGradient
            colors={['rgba(251,127,19,0.1)', 'rgba(251,127,19,0.2)']}
            style={styles.decorBox}
          >
            {/* Grid pattern lines */}
            <View style={styles.gridOverlay}>
              {[...Array(6)].map((_, i) => (
                <View key={i} style={[styles.gridLine, { left: i * 24 }]} />
              ))}
            </View>
            <MaterialIcons name="shield" size={36} color={colors.primary} style={{ opacity: 0.5 }} />
          </LinearGradient>
        </View>

        <View style={{ flex: 1 }} />

        {/* Action buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.85}
            onPress={() => navigation.getParent()?.navigate('Home')}
          >
            <Text style={styles.primaryBtnText}>Return to Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.8}>
            <Text style={styles.secondaryBtnText}>View Full Report</Text>
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
    backgroundColor: colors.bgLight,
  },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.slate900, flex: 1, textAlign: 'center', marginRight: 44 },
  scroll: { flexGrow: 1, paddingBottom: 32 },
  successSection: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 24 },
  checkCircle: {
    width: 128, height: 128,
    backgroundColor: colors.green100,
    borderRadius: radius.full,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: { fontSize: 28, fontWeight: '700', color: colors.slate900, textAlign: 'center', marginBottom: 8 },
  successSubtitle: { fontSize: fontSize.sm, fontWeight: '500', color: colors.slate500 },
  detailsCard: {
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
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: 4 },
  detailLabel: { fontSize: fontSize.sm, color: colors.slate500, fontWeight: '500' },
  detailValueWrap: { alignItems: 'flex-end' },
  detailValue: { fontSize: fontSize.sm, fontWeight: '600', color: colors.slate900, textAlign: 'right' },
  detailSub: { fontSize: fontSize.xs, fontWeight: '500', marginTop: 2 },
  separator: { height: 1, backgroundColor: colors.slate100, marginVertical: 12 },
  decorWrap: { marginHorizontal: 16, marginTop: 24 },
  decorBox: {
    height: 128,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  gridOverlay: { ...StyleSheet.absoluteFillObject, flexDirection: 'row' },
  gridLine: {
    position: 'absolute', top: 0, bottom: 0,
    width: 1, backgroundColor: 'rgba(251,127,19,0.1)',
  },
  actions: { paddingHorizontal: 16, paddingTop: 24, gap: 12 },
  primaryBtn: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryBtnText: { fontSize: fontSize.base, fontWeight: '700', color: colors.white, letterSpacing: 0.3 },
  secondaryBtn: {
    height: 56,
    backgroundColor: colors.slate100,
    borderRadius: radius.xl,
    alignItems: 'center', justifyContent: 'center',
  },
  secondaryBtnText: { fontSize: fontSize.base, fontWeight: '700', color: colors.slate900, letterSpacing: 0.3 },
});
