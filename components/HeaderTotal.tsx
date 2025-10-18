
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes, spacing } from '../constants/tokens';
import { formatCurrency } from '../utils/format';

type Props = { total: number };

export default function HeaderTotal({ total }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Next payments due</Text>
      <Text style={styles.total}>{formatCurrency(total)}</Text>
      <Text style={styles.sortedLabel}>Sorted by due date (soonest first)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.m,
    paddingTop: spacing.xl,
    paddingBottom: spacing.s
  },
  subtitle: {
    fontSize: fontSizes.body,
    color: colors.textMuted,
    marginBottom: spacing.s
  },
  total: {
    fontSize: fontSizes.total,
    color: colors.textPrimary,
    fontWeight: '700'
  },
  sortedLabel: {
    fontSize: fontSizes.caption,
    color: colors.textMuted,
    marginTop: spacing.s
  }
});
