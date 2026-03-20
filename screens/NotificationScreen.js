import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, radius, fontSize } from '../constants/theme';
import { useApp } from '../context/AppContext';

const MOCK_NOTIFS = [
  {
    id: 1,
    title: 'Income loss: Heavy Rain',
    desc: '4 hours disruption detected (>50mm). ₹450 credited to your account instantly.',
    time: '5m ago',
    type: 'claim',
    isNew: true,
  },
  {
    id: 2,
    title: 'Income loss: Extreme Heat',
    desc: 'Temperature exceeded 40°C. 3 hours protection applied. ₹337.5 credited.',
    time: '2h ago',
    type: 'risk',
    isNew: false,
  },
  {
    id: 3,
    title: 'Income loss: Air Pollution',
    desc: 'AQI hazardous (>300). 5 hours earnings loss covered. ₹562.5 credited.',
    time: '1d ago',
    type: 'risk',
    isNew: false,
  },
  {
    id: 4,
    title: 'Cyclone Alert Issued',
    desc: 'Full day disruption triggered. ₹900 (Daily Income) credited to bank.',
    time: '2d ago',
    type: 'risk',
    isNew: false,
  },
];

export default function NotificationScreen({ navigation }) {

  const getIcon = (type) => {
    switch (type) {
      case 'claim': return 'payments';
      case 'risk': return 'water-drop';
      case 'earnings': return 'trending-up';
      case 'shield': return 'shield';
      default: return 'notifications';
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgLight} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.slate900} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.clearBtn}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingVertical: 16 }} showsVerticalScrollIndicator={false}>
        {MOCK_NOTIFS.map((notif) => (
          <View key={notif.id} style={[styles.notifCard, notif.isNew && styles.newNotif]}>
            <View style={styles.notifIconWrap}>
              <MaterialIcons name={notif.isNew ? 'circle' : getIcon(notif.type)} size={notif.isNew ? 10 : 20} color={notif.isNew ? colors.primary : colors.slate400} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.notifHeader}>
                <Text style={styles.notifTitle}>{notif.title}</Text>
                <Text style={styles.notifTime}>{notif.time}</Text>
              </View>
              <Text style={styles.notifDesc}>{notif.desc}</Text>
              {notif.type === 'claim' && (
                <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate("MainTabs", {
                  screen: "App",
                  params: {
                    screen: "Claims",
                  },
                })}>
                  <Text style={styles.actionText}>View Status</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
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
  clearBtn: { padding: 8 },
  clearText: { color: colors.primary, fontWeight: '600', fontSize: fontSize.sm },
  notifCard: {
    flexDirection: 'row', gap: 16,
    padding: 16, marginHorizontal: 16,
    backgroundColor: colors.white, borderRadius: radius.xl,
    marginBottom: 12,
    borderWidth: 1, borderColor: colors.slate100,
  },
  newNotif: {
    borderColor: 'rgba(251,127,19,0.2)',
    backgroundColor: 'rgba(251,127,19,0.02)',
  },
  notifIconWrap: {
    width: 24, height: 24,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 2,
  },
  notifHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  notifTitle: { fontSize: fontSize.base, fontWeight: '700', color: colors.slate900 },
  notifTime: { fontSize: 10, color: colors.slate400 },
  notifDesc: { fontSize: fontSize.sm, color: colors.slate600, lineHeight: 20 },
  actionBtn: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: radius.md,
  },
  actionText: { fontSize: fontSize.xs, fontWeight: '700', color: colors.primary },
});
