import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, radius, fontSize } from '../constants/theme';
import { useApp } from '../context/AppContext';

const plans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: '₹15',
    icon: 'eco',
    coverage: '₹400',
    featured: false,
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    price: '₹25',
    icon: 'bolt',
    coverage: '₹700',
    featured: true,
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: '₹40',
    icon: 'shield',
    coverage: '₹1,000',
    featured: false,
  },
];

function PlanCard({ plan, onSelect }) {
  
  return (
    <View style={[styles.card, plan.featured && { borderColor: colors.primary, borderWidth: 2 }]}>
      {plan.featured && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>MOST POPULAR</Text>
        </View>
      )}
      <View style={styles.cardHeader}>
        <View style={styles.cardIconRow}>
          <MaterialIcons name={plan.icon} size={22} color={colors.primary} />
          <Text style={styles.planName}>{plan.name}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{plan.price}</Text>
          <Text style={styles.pricePer}>/week</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.selectBtn, plan.featured && styles.selectBtnFeatured]}
        activeOpacity={0.8}
        onPress={() => onSelect(plan)}
      >
        <Text style={[styles.selectBtnText, plan.featured && styles.selectBtnTextFeatured]}>
          Select Plan
        </Text>
      </TouchableOpacity>

      <View style={styles.features}>
        <View style={styles.featureRow}>
          <MaterialIcons name="check-circle" size={18} color={colors.primary} />
          <Text style={styles.featureText}>Covers <Text style={styles.bold}>income loss</Text> due to weather disruptions</Text>
        </View>
        <View style={styles.featureRow}>
          <MaterialIcons name="security" size={18} color={colors.primary} />
          <Text style={[styles.featureText, styles.featureSubText]}>Weekly income protection</Text>
        </View>
        <View style={styles.featureRow}>
          <MaterialIcons name="sync" size={18} color={colors.primary} />
          <Text style={[styles.featureText, styles.featureSubText]}>Automatic claim triggering</Text>
        </View>
      </View>
    </View>
  );
}

export default function PlanScreen({ navigation }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (plan) => {
    setSelected(plan.id);
    // Show brief confirmation then go back
    setTimeout(() => navigation.navigate('Home'), 500);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgLight} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.openDrawer()}>
          <MaterialIcons name="menu" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>GigShield</Text>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.navigate('Notifications')}>
          <MaterialIcons name="notifications" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Choose your protection plan</Text>
          <Text style={styles.pageSubtitle}>
            Stay protected against weather-induced income loss. Choose a plan that fits your weekly earnings.
          </Text>
        </View>

        {plans.map(plan => (
          <PlanCard key={plan.id} plan={plan} onSelect={handleSelect} />
        ))}

        {/* Footer info */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>
            <Text style={styles.footerBold}>Comprehensive Coverage: </Text>
            All plans cover income loss due to heavy rain, air pollution, cyclone alerts, and extreme heat.
          </Text>
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
  headerBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.slate900 },
  content: { padding: 16, paddingBottom: 40 },
  titleSection: { marginBottom: 24 },
  pageTitle: { fontSize: 24, fontWeight: '800', color: colors.slate900, marginBottom: 8 },
  pageSubtitle: { fontSize: fontSize.sm, color: colors.slate600, lineHeight: 20 },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: 'rgba(251,127,19,0.2)',
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardFeatured: {
    borderWidth: 2,
    borderColor: colors.primary,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  popularBadge: {
    position: 'absolute', top: -12,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16, paddingVertical: 4,
    borderRadius: radius.full,
    zIndex: 10,
  },
  popularText: { fontSize: fontSize.xs, fontWeight: '900', color: colors.white, letterSpacing: 1.5 },
  cardHeader: { marginBottom: 16, marginTop: 4 },
  cardIconRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  planName: { fontSize: fontSize.lg, fontWeight: '700', color: colors.slate900 },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 2 },
  price: { fontSize: 36, fontWeight: '900', color: colors.slate900, letterSpacing: -1 },
  pricePer: { fontSize: fontSize.sm, color: colors.slate500, fontWeight: '600', marginBottom: 6 },
  selectBtn: {
    height: 48,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    marginBottom: 20,
  },
  selectBtnFeatured: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  selectBtnText: { fontSize: fontSize.sm, fontWeight: '700', color: colors.primary, letterSpacing: 0.5 },
  selectBtnTextFeatured: { color: colors.white },
  features: { gap: 14 },
  featureRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  featureText: { fontSize: fontSize.sm, color: colors.slate900, flex: 1 },
  featureSubText: { color: colors.slate600 },
  bold: { fontWeight: '700' },
  footerInfo: {
    backgroundColor: 'rgba(251,127,19,0.05)',
    borderRadius: radius.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(251,127,19,0.1)',
    marginTop: 8,
  },
  footerText: { fontSize: fontSize.sm, color: colors.slate700, lineHeight: 22, textAlign: 'center' },
  footerBold: { fontWeight: '700', color: colors.primary },
});
