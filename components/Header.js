import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fontSize } from '../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ title, onBack, onAction, actionIcon = 'notifications', showLogo = false }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconBtn} onPress={onBack} activeOpacity={0.7}>
        {onBack ? (
          <MaterialIcons name="arrow-back" size={24} color={colors.slate900} />
        ) : (
          <MaterialIcons name="menu" size={24} color={colors.primary} />
        )}
      </TouchableOpacity>
      <Text style={[styles.title, showLogo && styles.logoTitle]}>{title}</Text>
      {onAction ? (
        <TouchableOpacity style={styles.actionBtn} onPress={onAction} activeOpacity={0.7}>
          <MaterialIcons name={actionIcon} size={22} color={colors.primary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(248,247,245,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(251,127,19,0.1)',
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.slate900,
  },
  logoTitle: {
    color: colors.primary,
  },
  actionBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
  },
  spacer: {
    width: 40,
  },
});
