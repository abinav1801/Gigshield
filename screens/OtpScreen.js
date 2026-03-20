import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, radius, fontSize } from '../constants/theme';

export default function OtpScreen({ navigation, route }) {
  const phone = route?.params?.phone || '98765 43210';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(25);
  const [canResend, setCanResend] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (canResend) {
      setTimer(25);
      setCanResend(false);
      // Logic to resend OTP would go here
      console.log('OTP Resent');
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
            />
          ))}
        </View>

        {/* Resend */}
        <View style={styles.resendWrap}>
          <Text style={styles.resendText}>
            Didn't receive the code?{' '}
            <Text
              style={[styles.resendLink, !canResend && { opacity: 0.6 }]}
              onPress={canResend ? handleResend : null}
            >
              {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
            </Text>
          </Text>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.ctaBtn}
          activeOpacity={0.85}
          onPress={() => navigation.replace('MainTabs')}
        >
          <Text style={styles.ctaBtnText}>Verify & Continue</Text>
        </TouchableOpacity>

        {/* Secure notice */}
        <View style={styles.secureRow}>
          <MaterialIcons name="lock" size={14} color={colors.slate400} />
          <Text style={styles.secureText}>SECURE VERIFICATION</Text>
        </View>
      </ScrollView>

      {/* Decorative bottom bar */}
      <View style={styles.bottomAccent} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgLight },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  appName: { fontSize: fontSize.lg, fontWeight: '700', color: colors.slate900, flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  titleWrap: { marginBottom: 32 },
  title: { fontSize: 32, fontWeight: '700', color: colors.slate900, marginBottom: 8 },
  subtitle: { fontSize: fontSize.base, color: colors.slate600 },
  phoneHighlight: { fontWeight: '600', color: colors.slate900 },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpBox: {
    width: 48,
    height: 56,
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.slate900,
    borderBottomWidth: 2,
    borderBottomColor: colors.slate300,
    backgroundColor: 'transparent',
    textAlign: 'center', // kept in style where it belongs
  },
  otpBoxFilled: {
    borderBottomColor: colors.primary,
  },
  resendWrap: { alignItems: 'center', marginBottom: 36 },
  resendText: { fontSize: fontSize.sm, color: colors.slate500 },
  resendLink: { color: colors.primary, fontWeight: '600' },
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
    marginBottom: 24,
  },
  ctaBtnText: { fontSize: fontSize.lg, fontWeight: '700', color: colors.white },
  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingTop: 80,
    opacity: 0.5,
  },
  secureText: { fontSize: fontSize.xs, fontWeight: '600', color: colors.slate500, letterSpacing: 2 },
  bottomAccent: { height: 3, backgroundColor: colors.primary, opacity: 0.3 },
});
