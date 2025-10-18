
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes, spacing } from '../constants/tokens';

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All clear! No payments due.</Text>
      <Text style={styles.subtitle}>You have no upcoming subscriptions to pay.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.l, alignItems: 'center' },
  title: { fontSize: fontSizes.body, fontWeight: '700', color: colors.textPrimary },
  subtitle: { fontSize: fontSizes.caption, color: colors.textMuted, marginTop: spacing.s }
});
