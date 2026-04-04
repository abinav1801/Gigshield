import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, StatusBar, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, radius, fontSize } from '../constants/theme';
import { authAPI } from '../services/api';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [platform, setPlatform] = useState('');
  const [loading, setLoading] = useState(false);

  const platforms = ['Zomato', 'Swiggy', 'Other'];
  const isFormValid = name.length > 2 && phone.length === 10 && platform !== '';

  const handleSignUp = async () => {
    if (!isFormValid) return;
    setLoading(true);
    try {
      const res = await authAPI.signup(name, phone, platform);
      navigation.navigate('Otp', {
        phone,
        name,
        platform,
        mode: 'signup',
        devOtp: res.data.otp, // only in fixed OTP mode
      });
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      if (err.response?.status === 400 && msg.includes('already registered')) {
        Alert.alert(
          'Already Registered',
          'This phone number is already registered. Please login instead.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Login', onPress: () => navigation.navigate('Login') },
          ]
        );
      } else {
        Alert.alert('Error', msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgLight} />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.slate900} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Join GigShield</Text>
          <Text style={styles.heroSubtitle}>Start protecting your gig earnings today</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputRow}>
              <MaterialIcons name="person" size={20} color={colors.slate400} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                editable={!loading}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.inputRow}>
              <MaterialIcons name="phone" size={20} color={colors.slate400} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="10-digit number"
                keyboardType="number-pad"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
                editable={!loading}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Primary Platform</Text>
            <View style={styles.platformRow}>
              {platforms.map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[styles.platformItem, platform === p && styles.platformItemActive]}
                  onPress={() => setPlatform(p)}
                  disabled={loading}
                >
                  <Text style={[styles.platformText, platform === p && styles.platformTextActive]}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.ctaBtn, (!isFormValid || loading) && styles.ctaBtnDisabled]}
            activeOpacity={0.85}
            onPress={handleSignUp}
            disabled={!isFormValid || loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <>
                <Text style={styles.ctaBtnText}>Continue</Text>
                <MaterialIcons name="arrow-forward" size={20} color="white" />
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Login</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgLight },
  scroll: { flexGrow: 1, paddingBottom: 40 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.slate900 },
  hero: { paddingHorizontal: 24, marginTop: 24, marginBottom: 32 },
  heroTitle: { fontSize: 28, fontWeight: '800', color: colors.slate900, marginBottom: 8 },
  heroSubtitle: { fontSize: fontSize.base, color: colors.slate600 },
  form: { paddingHorizontal: 24, gap: 20 },
  inputGroup: { gap: 8 },
  label: { fontSize: fontSize.sm, fontWeight: '700', color: colors.slate700, marginLeft: 4 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', height: 56,
    backgroundColor: colors.white, borderRadius: radius.xl,
    borderWidth: 1, borderColor: colors.slate200, paddingHorizontal: 16,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: fontSize.base, color: colors.slate900, fontWeight: '500' },
  platformRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  platformItem: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: radius.full,
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.slate200,
  },
  platformItemActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  platformText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.slate600 },
  platformTextActive: { color: colors.white },
  ctaBtn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.xl,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, marginTop: 12, shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  ctaBtnDisabled: { backgroundColor: colors.slate300, shadowOpacity: 0, elevation: 0 },
  ctaBtnText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.white },
  footer: { alignItems: 'center', marginTop: 40 },
  footerText: { fontSize: fontSize.base, color: colors.slate500 },
  link: { color: colors.primary, fontWeight: '700' },
});
