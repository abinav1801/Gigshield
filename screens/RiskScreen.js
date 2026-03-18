import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, ImageBackground, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, fontSize } from '../constants/theme';
import { mockWeather } from '../context/AppContext';

const MAP_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_sgOMqbVwKmkECxQ0wqSTF0loDIyiUIzRcbgtHFpXy6yertBnFW5MHrmH-JubNTyG7kva1S3EyKMj9kvY6zwOr0T1GFLDpQOpHbZ1BMhW6E3rlg-B7t6atLkn57NWtE4aVFabwtVD6Zt3W48vWH9SCGM29mI9KxlD1Z4g86wtfSKi1N_dHE7aHIuHo_gMNJ1U8qwFj-Cn_AVUbcv-gSGcaFX_887xuYL26I8hIWDSQ3RLKUwq_-4neUfxBzGfSle0IGL62ifAgOME';
const SCREEN_WIDTH = Dimensions.get('window').width;

// Circular progress ring via absolute positioned Views (SVG not needed)
function RiskGauge({ score }) {
  return (
    <View style={gauge.wrap}>
      <View style={gauge.outer}>
        {/* Inner filled arc simulated with a colored ring overlay */}
        <View style={[gauge.fill, { borderColor: colors.primary }]} />
        <Text style={gauge.label}>{score}%</Text>
      </View>
    </View>
  );
}

export default function RiskScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgLight} />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <MaterialIcons name="favorite" size={22} color={colors.primary} />
        </View>
        <Text style={styles.headerTitle}>GigShield Risk Monitor</Text>
        <TouchableOpacity style={styles.notifBtn} onPress={() => navigation.navigate('Notifications')}>
          <MaterialIcons name="notifications" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Map */}
        <View style={styles.mapWrap}>
          <ImageBackground source={{ uri: MAP_IMAGE }} style={[styles.map, { resizeMode: 'cover' }]}>
            {/* Risk blobs */}
            <View style={[styles.blob, { top: 40, left: 40, backgroundColor: 'rgba(34,197,94,0.3)', width: 128, height: 128 }]} />
            <View style={[styles.blob, { top: 80, right: 80, backgroundColor: 'rgba(249,115,22,0.3)', width: 160, height: 160 }]} />
            <View style={[styles.blob, { bottom: 40, left: SCREEN_WIDTH * 0.35, backgroundColor: 'rgba(234,179,8,0.2)', width: 192, height: 192 }]} />

            {/* Legend */}
            <View style={styles.legend}>
              {[
                { color: '#22c55e', label: 'SAFE' },
                { color: '#eab308', label: 'CAUTION' },
                { color: '#f97316', label: 'HIGH RISK' },
              ].map(item => (
                <View key={item.label} style={styles.legendRow}>
                  <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                  <Text style={styles.legendText}>{item.label}</Text>
                </View>
              ))}
            </View>

            {/* Bottom gradient */}
            <LinearGradient
              colors={['rgba(248,247,245,0)', 'rgba(248,247,245,1)']}
              style={styles.mapGradient}
            />
          </ImageBackground>
        </View>

        {/* Risk Score Card */}
        <View style={styles.riskCardWrap}>
          <View style={styles.riskCard}>
            <View style={styles.riskTopRow}>
              <View>
                <Text style={styles.riskSubLabel}>Current Assessment</Text>
                <Text style={styles.riskLevel}>{mockWeather.riskLevel}</Text>
              </View>
              {/* Gauge */}
              <View style={gauge.wrap}>
                <View style={gauge.outer}>
                  <View style={[gauge.fill, { borderColor: colors.primary }]} />
                  <Text style={gauge.label}>{mockWeather.riskScore}%</Text>
                </View>
              </View>
            </View>

            {/* Sub metrics */}
            <View style={styles.metrics}>
              <View style={styles.metric}>
                <MaterialIcons name="opacity" size={22} color={colors.primary} />
                <Text style={styles.metricLabel}>RAINFALL</Text>
                <Text style={styles.metricValue}>{mockWeather.rainfall}mm/hr</Text>
              </View>
              <View style={styles.metric}>
                <MaterialIcons name="air" size={22} color={colors.primary} />
                <Text style={styles.metricLabel}>AQI</Text>
                <Text style={styles.metricValue}>{mockWeather.aqi} (Mod)</Text>
              </View>
              <View style={styles.metric}>
                <MaterialIcons name="device-thermostat" size={22} color={colors.primary} />
                <Text style={styles.metricLabel}>TEMP</Text>
                <Text style={styles.metricValue}>{mockWeather.temp}°C</Text>
              </View>
            </View>

            {/* Alert */}
            <View style={styles.alertBox}>
              <MaterialIcons name="warning" size={20} color={colors.primary} />
              <Text style={styles.alertText}>Rainfall expected to increase in 2 hours</Text>
            </View>
          </View>
        </View>

        {/* Safety Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>GIG WORKER SAFETY TIPS</Text>
          {[
            {
              icon: 'check-circle',
              title: 'Rain gear recommended',
              desc: 'Keep your waterproof kit ready for the next 2h.',
            },
            {
              icon: 'route',
              title: 'Avoid low-lying areas',
              desc: 'Mount Road expected to have moderate water logging.',
            },
          ].map((tip, i) => (
            <View key={i} style={styles.tipCard}>
              <View style={styles.tipIconWrap}>
                <MaterialIcons name={tip.icon} size={22} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDesc}>{tip.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const gauge = StyleSheet.create({
  wrap: { width: 64, height: 64 },
  outer: {
    width: 64, height: 64,
    borderRadius: 32,
    borderWidth: 6,
    borderColor: colors.slate200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    position: 'absolute',
    width: 64, height: 64,
    borderRadius: 32,
    borderWidth: 6,
    borderColor: 'transparent',
    borderLeftColor: colors.primary,
    borderBottomColor: colors.primary,
    transform: [{ rotate: '45deg' }],
  },
  label: { fontSize: fontSize.sm, fontWeight: '700', color: colors.slate900 },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgLight },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: 'rgba(248,247,245,0.95)',
    borderBottomWidth: 1, borderBottomColor: 'rgba(251,127,19,0.1)',
  },
  headerIcon: { width: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: fontSize.lg, fontWeight: '700', color: colors.slate900 },
  notifBtn: {
    width: 40, height: 40,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.primaryLight, borderRadius: 20,
  },
  mapWrap: { height: 280, width: '100%' },
  map: { flex: 1 },
  blob: { position: 'absolute', borderRadius: 999 },
  legend: {
    position: 'absolute', top: 12, right: 12,
    backgroundColor: 'rgba(255,255,255,0.92)',
    padding: 8, borderRadius: radius.lg,
    borderWidth: 1, borderColor: 'rgba(251,127,19,0.1)',
    gap: 4,
  },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: fontSize.xs, fontWeight: '700' },
  mapGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 64 },
  riskCardWrap: { paddingHorizontal: 16, marginTop: -32, zIndex: 10 },
  riskCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: 20,
    borderWidth: 1, borderColor: 'rgba(251,127,19,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  riskTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  riskSubLabel: { fontSize: fontSize.sm, color: colors.slate500, fontWeight: '500' },
  riskLevel: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.slate900 },
  metrics: {
    flexDirection: 'row', justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1, borderTopColor: colors.slate100,
  },
  metric: { alignItems: 'center', gap: 4 },
  metricLabel: { fontSize: fontSize.xs, color: colors.slate500, letterSpacing: 0.5, textTransform: 'uppercase' },
  metricValue: { fontSize: fontSize.sm, fontWeight: '700', color: colors.slate900 },
  alertBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.primaryLight,
    borderWidth: 1, borderColor: 'rgba(251,127,19,0.2)',
    padding: 12, borderRadius: radius.lg, marginTop: 8,
  },
  alertText: { fontSize: fontSize.sm, fontWeight: '500', color: colors.slate800, flex: 1 },
  tipsSection: { paddingHorizontal: 16, marginTop: 24 },
  tipsTitle: {
    fontSize: fontSize.xs, fontWeight: '700', color: colors.slate500,
    letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12,
  },
  tipCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: colors.white, padding: 14,
    borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.slate100,
    marginBottom: 10,
  },
  tipIconWrap: {
    width: 40, height: 40,
    backgroundColor: colors.primaryMedium,
    borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  tipTitle: { fontSize: fontSize.sm, fontWeight: '700', color: colors.slate900 },
  tipDesc: { fontSize: fontSize.xs, color: colors.slate500, marginTop: 2 },
});
