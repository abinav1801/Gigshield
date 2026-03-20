import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, TextInput, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, radius, fontSize, spacing } from '../constants/theme';

export default function SupportScreen({ navigation }) {
  const faqs = [
    { q: 'How do I file a claim?', a: 'Go to the Claims tab and click on "File New Claim". Follow the prompts to submit your details.' },
    { q: 'When will I get my payout?', a: 'Payouts are typically processed within 24-48 hours after a claim is approved.' },
    { q: 'What does "Clean Days" mean?', a: 'Clean Days are consecutive days without any severe weather incidents or claims.' },
    { q: 'How can I change my plan?', a: 'You can browse and switch plans in the "Plans" tab.' },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgLight} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.slate900} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>How can we help?</Text>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={20} color={colors.slate400} />
            <TextInput
              placeholder="Search help articles..."
              placeholderTextColor={colors.slate400}
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Contact Cards */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Quick Contact</Text>
          <View style={styles.contactGrid}>
            <TouchableOpacity style={styles.contactCard}>
              <View style={[styles.contactIconWrap, { backgroundColor: '#dcfce7' }]}>
                <MaterialIcons name="chat" size={24} color="#16a34a" />
              </View>
              <Text style={styles.contactLabel}>Live Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactCard}>
              <View style={[styles.contactIconWrap, { backgroundColor: '#e0f2fe' }]}>
                <MaterialIcons name="call" size={24} color="#0284c7" />
              </View>
              <Text style={styles.contactLabel}>Call Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactCard}>
              <View style={[styles.contactIconWrap, { backgroundColor: '#fef3c7' }]}>
                <MaterialIcons name="email" size={24} color="#d97706" />
              </View>
              <Text style={styles.contactLabel}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq, i) => (
            <View key={i} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{faq.q}</Text>
              <Text style={styles.faqAnswer}>{faq.a}</Text>
            </View>
          ))}
        </View>

        {/* Still Need Help */}
        <View style={styles.footerHelp}>
          <Text style={styles.footerText}>Still need help?</Text>
          <TouchableOpacity style={styles.supportBtn}>
            <Text style={styles.supportBtnText}>Talk to a Specialist</Text>
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
  searchSection: { padding: 20, backgroundColor: colors.white, marginBottom: 12 },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.slate900, marginBottom: 16 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.slate100,
    borderRadius: radius.lg,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: fontSize.base, color: colors.slate900 },
  contactSection: { padding: 20, backgroundColor: colors.white, marginBottom: 12 },
  contactGrid: { flexDirection: 'row', gap: 12 },
  contactCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: radius.xl,
    backgroundColor: colors.bgLight,
    borderWidth: 1,
    borderColor: colors.slate100,
  },
  contactIconWrap: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  contactLabel: { fontSize: fontSize.xs, fontWeight: '700', color: colors.slate700 },
  faqSection: { padding: 20, backgroundColor: colors.white },
  faqItem: { marginBottom: 20, borderBottomWidth: 1, borderBottomColor: colors.slate100, paddingBottom: 16 },
  faqQuestion: { fontSize: fontSize.base, fontWeight: '700', color: colors.slate900, marginBottom: 8 },
  faqAnswer: { fontSize: fontSize.sm, color: colors.slate600, lineHeight: 20 },
  footerHelp: { padding: 32, alignItems: 'center' },
  footerText: { fontSize: fontSize.base, color: colors.slate500, marginBottom: 12 },
  supportBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: radius.full,
  },
  supportBtnText: { color: colors.white, fontWeight: '700', fontSize: fontSize.base },
});
