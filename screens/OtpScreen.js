import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, StatusBar, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, radius, fontSize } from '../constants/theme';
import { authAPI } from '../services/api';
import { useApp } from '../context/AppContext';

export default function OtpScreen({ navigation, route }) {
  const { phone, mode, devOtp } = route?.params || {};
  const { loginWithToken } = useApp();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  // Dev mode hint — show OTP on screen in fixed mode
  const devHint = devOtp || '123456';

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    if (!canResend) return;
    try {
      await authAPI.sendOtp(phone);
      setTimer(59);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    } catch (err) {
      Alert.alert('Error', 'Could not resend OTP. Please try again.');
    }
  };

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const otpValue = otp.join('');
  const isOtpComplete = otpValue.length === 6;

  const handleVerify = async () => {
    if (!isOtpComplete || loading) return;
    setLoading(true);
    try {
      const res = await authAPI.verifyOtp(phone, otpValue);
      const { token, user } = res.data;

      // Save token + user in context
      await loginWithToken(token, user);

      // Navigate to main app
      navigation.replace('MainTabs');
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid OTP. Please try again.';
      Alert.alert('Verification Failed', msg);
      setOtp(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgLight} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.slate900} />
        </TouchableOpacity>
        <Text style={styles.appName}>GigShield</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            Sent to <Text style={styles.phoneHighlight}>+91 {phone}</Text>
          </Text>
          {/* Dev mode hint */}
          <View style={styles.devHintBox}>
            <MaterialIcons name="info" size={14} color={colors.primary} />
            <Text style={styles.devHintText}>Dev mode OTP: <Text style={{ fontWeight: '700' }}>{devHint}</Text></Text>
          </View>
        </View>

        {/* OTP boxes */}
        <View style={styles.otpRow}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={ref => (inputs.current[i] = ref)}
              style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
              value={digit}
              onChangeText={text => handleChange(text.slice(-1), i)}
              onKeyPress={e => handleKeyPress(e, i)}
              keyboardType="number-pad"
              maxLength={1}
              placeholder="0"
              placeholderTextColor={colors.slate300}
              editable={!loading}
            />
          ))}
        </View>

        {/* Resend */}
        <View style={styles.resendWrap}>
          <Text style={styles.resendText}>
            Didn't receive the code?{' '}
            <Text
              style={[styles.resendLink, !canResend && { opacity: 0.45 }]}
              onPress={canResend ? handleResend : null}
            >
              {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
            </Text>
          </Text>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={[styles.ctaBtn, (!isOtpComplete || loading) && styles.ctaBtnDisabled]}
          activeOpacity={0.85}
          onPress={handleVerify}
          disabled={!isOtpComplete || loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.ctaBtnText}>Verify & Continue</Text>
          )}
        </TouchableOpacity>

        {/* Secure notice */}
        <View style={styles.secureRow}>
          <MaterialIcons name="lock" size={14} color={colors.slate400} />
          <Text style={styles.secureText}>SECURE VERIFICATION</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomAccent} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgLight },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  appName: { fontSize: fontSize.lg, fontWeight: '700', color: colors.slate900, flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  titleWrap: { marginBottom: 32 },
  title: { fontSize: 32, fontWeight: '700', color: colors.slate900, marginBottom: 8 },
  subtitle: { fontSize: fontSize.base, color: colors.slate600, marginBottom: 12 },
  phoneHighlight: { fontWeight: '600', color: colors.slate900 },
  devHintBox: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.primaryLight, paddingHorizontal: 12,
    paddingVertical: 8, borderRadius: radius.lg, alignSelf: 'flex-start',
  },
  devHintText: { fontSize: fontSize.sm, color: colors.primary },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  otpBox: {
    width: 48, height: 56, fontSize: fontSize.xl, fontWeight: '700',
    color: colors.slate900, borderBottomWidth: 2, borderBottomColor: colors.slate300,
    backgroundColor: 'transparent', textAlign: 'center',
  },
  otpBoxFilled: { borderBottomColor: colors.primary },
  resendWrap: { alignItems: 'center', marginBottom: 36 },
  resendText: { fontSize: fontSize.sm, color: colors.slate500 },
  resendLink: { color: colors.primary, fontWeight: '600' },
  ctaBtn: {
    height: 56, backgroundColor: colors.primary, borderRadius: radius.xl,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6, marginBottom: 24,
  },
  ctaBtnDisabled: { backgroundColor: colors.slate300, shadowOpacity: 0, elevation: 0 },
  ctaBtnText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.white },
  secureRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, paddingTop: 60, opacity: 0.5,
  },
  secureText: { fontSize: fontSize.xs, fontWeight: '600', color: colors.slate500, letterSpacing: 2 },
  bottomAccent: { height: 3, backgroundColor: colors.primary, opacity: 0.3 },
});
