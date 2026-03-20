import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Switch, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, radius, fontSize } from '../constants/theme';

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const SettingRow = ({ icon, label, sub, right }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingIconWrap}>
        <MaterialIcons name={icon} size={22} color={colors.primary} />
      </View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={styles.settingLabel}>{label}</Text>
        {sub && <Text style={styles.settingSub}>{sub}</Text>}
      </View>
      {right}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgLight} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.slate900} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        
        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Settings</Text>
          <SettingRow 
            icon="notifications-active" 
            label="Push Notifications" 
            sub="Get alerts for risks and claim status"
            right={
              <Switch 
                value={notifications} 
                onValueChange={setNotifications}
                trackColor={{ false: colors.slate200, true: colors.primaryMedium }}
                thumbColor={notifications ? colors.primary : colors.white}
              />
            }
          />
          <SettingRow 
            icon="fingerprint" 
            label="Biometric Login" 
            sub="Use TouchID or FaceID to login"
            right={
              <Switch 
                value={biometrics} 
                onValueChange={setBiometrics}
                trackColor={{ false: colors.slate200, true: colors.primaryMedium }}
                thumbColor={biometrics ? colors.primary : colors.white}
              />
            }
          />
          <SettingRow 
            icon="dark-mode" 
            label="Dark Mode" 
            sub="Switch between light and dark theme"
            right={
              <Switch 
                value={darkMode} 
                onValueChange={setDarkMode}
                trackColor={{ false: colors.slate200, true: colors.primaryMedium }}
                thumbColor={darkMode ? colors.primary : colors.white}
              />
            }
          />
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account & Security</Text>
          <TouchableOpacity style={styles.clickableRow}>
            <SettingRow icon="lock" label="Change Password" />
            <MaterialIcons name="chevron-right" size={20} color={colors.slate400} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.clickableRow}>
            <SettingRow icon="language" label="App Language" sub="English (US)" />
            <MaterialIcons name="chevron-right" size={20} color={colors.slate400} />
          </TouchableOpacity>
        </View>

        {/* Support & About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About GigShield</Text>
          <TouchableOpacity style={styles.clickableRow}>
            <SettingRow icon="description" label="Terms of Service" />
            <MaterialIcons name="chevron-right" size={20} color={colors.slate400} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.clickableRow}>
            <SettingRow icon="privacy-tip" label="Privacy Policy" />
            <MaterialIcons name="chevron-right" size={20} color={colors.slate400} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.clickableRow}>
            <SettingRow icon="info" label="App Version" sub="v1.0.4 (Build 12)" />
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={[styles.section, { borderBottomWidth: 0 }]}>
          <TouchableOpacity style={styles.dangerBtn}>
            <MaterialIcons name="delete-forever" size={20} color="#ef4444" />
            <Text style={styles.dangerBtnText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgLight },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(251,127,19,0.1)',
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.slate900 },
  section: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: '800',
    color: colors.slate500,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingIconWrap: {
    width: 40,
    height: 40,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.slate900,
  },
  settingSub: {
    fontSize: fontSize.xs,
    color: colors.slate500,
    marginTop: 2,
  },
  clickableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dangerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#fee2e2',
    backgroundColor: '#fff',
    borderRadius: radius.xl,
  },
  dangerBtnText: {
    color: '#ef4444',
    fontWeight: '700',
    fontSize: fontSize.base,
  },
});
