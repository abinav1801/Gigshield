import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, radius, fontSize } from '../constants/theme';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgLight} />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.topBar}>
          <View style={styles.logoRow}>
            <View style={styles.logoIconWrap}>
              <MaterialIcons name="security" size={28} color={colors.primary} />
            </View>
            <Text style={styles.appName}>GigShield</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <MaterialIcons name="verified-user" size={56} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Welcome to GigShield</Text>
          <Text style={styles.heroSubtitle}>Protecting your gig earnings and identity</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.inputRow}>
            <View style={styles.prefixWrap}>
              <Text style={styles.flag}>🇮🇳</Text>
              <Text style={styles.countryCode}>+91</Text>
              <View style={styles.divider} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="00000 00000"
              placeholderTextColor={colors.slate400}
              keyboardType="number-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <TouchableOpacity
            style={styles.ctaBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Otp', { phone })}
          >
            <Text style={styles.ctaBtnText}>Get OTP</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
          <Text style={styles.sslText}>Secure 256-bit SSL encrypted connection</Text>
        </View>
      </ScrollView>

      {/* Bottom gradient accent */}
      <View style={styles.bottomAccent} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgLight },
  scroll: { flexGrow: 1, paddingBottom: 40 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoIconWrap: {
    width: 40, height: 40,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: { fontSize: fontSize.xl, fontWeight: '700', color: colors.slate900 },
  hero: { alignItems: 'center', paddingHorizontal: 24, marginTop: 32, marginBottom: 40 },
  heroBadge: {
    width: 96, height: 96,
    backgroundColor: 'rgba(251,127,19,0.05)',
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  heroTitle: { fontSize: 28, fontWeight: '700', color: colors.slate900, textAlign: 'center', marginBottom: 8 },
  heroSubtitle: { fontSize: fontSize.base, color: colors.slate600, textAlign: 'center' },
  form: { paddingHorizontal: 24, gap: 16 },
  label: { fontSize: fontSize.sm, fontWeight: '600', color: colors.slate700, marginLeft: 4 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  prefixWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 6,
  },
  flag: { fontSize: 18 },
  countryCode: { fontSize: fontSize.md, fontWeight: '600', color: colors.slate900 },
  divider: { width: 1, height: 24, backgroundColor: colors.slate200, marginLeft: 6 },
  input: {
    flex: 1,
    fontSize: fontSize.lg,
    fontWeight: '500',
    color: colors.slate900,
    paddingHorizontal: 12,
  },
  ctaBtn: {
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  ctaBtnText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.white },
  footer: { alignItems: 'center', marginTop: 32, paddingHorizontal: 24, gap: 16 },
  footerText: { fontSize: fontSize.sm, color: colors.slate500, textAlign: 'center', lineHeight: 20 },
  link: { color: colors.primary, fontWeight: '600' },
  sslText: { fontSize: fontSize.xs, color: colors.slate400, textAlign: 'center' },
  bottomAccent: {
    height: 3,
    backgroundColor: colors.primary,
    opacity: 0.3,
  },
});
