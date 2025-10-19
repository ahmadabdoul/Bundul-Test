import { colors, elevation, fontSizes, radii, spacing } from '@/constants/tokens';
import { Payment } from '@/services/payments';
import { formatDueDate, isDueSoon } from '@/utils/date';
import { formatCurrency } from '@/utils/format';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  item: Payment;
  onPayNow: (id: number) => void;
  onPayLater: (id: number) => void;
};

export default function PaymentItem({ item, onPayNow, onPayLater }: Props) {
  const dueSoon = isDueSoon(item.dueDate);
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (dueSoon) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.05, duration: 800, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1.0, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    } else {
      // Reset animation value if the component re-renders for a non-urgent item
      pulse.setValue(1);
    }
  }, [dueSoon, pulse]);

  // Conditionally use LinearGradient for the card's container if it's due soon
  const CardContainer = dueSoon ? LinearGradient : View;

  return (
    <CardContainer
      // These props are only used by LinearGradient
      colors={dueSoon ? ['#FFF2F0', '#FFFCFC'] : undefined}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={[styles.card, dueSoon && styles.cardUrgent]}>
      <Image source={item.icon} style={styles.icon} />

      {/* Details column (flexible width) */}
      <View style={styles.detailsColumn}>
        <Text style={styles.service}>{item.service}</Text>
        <Text style={styles.date}>{formatDueDate(item.dueDate)}</Text>
        {dueSoon && (
          <Animated.View style={[styles.badge, { transform: [{ scale: pulse }] }]}>
            <Text style={styles.badgeText}>Due Soon</Text>
          </Animated.View>
        )}
      </View>

      {/* Actions column (fixed width) */}
      <View style={styles.actionsColumn}>
        <Text style={styles.amount}>{formatCurrency(item.amount, item.currency)}</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            accessible
            accessibilityRole="button"
            accessibilityLabel={`Pay ${item.service} now`}
            style={styles.primaryButton}
            onPress={() => onPayNow(item.id)}>
            <Text style={styles.primaryButtonText}>Pay Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessible
            accessibilityRole="button"
            accessibilityLabel={`Pay ${item.service} later`}
            style={styles.secondaryButton}
            onPress={() => onPayLater(item.id)}>
            <Text style={styles.secondaryButtonText}>Pay Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    padding: spacing.m,
    marginHorizontal: spacing.m,
    marginVertical: spacing.s,
    flexDirection: 'row',
    alignItems: 'center',
    ...elevation.low,
  },
  cardUrgent: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: spacing.m,
  },
  detailsColumn: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xs,
  },
  service: {
    fontSize: fontSizes.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  date: {
    fontSize: fontSizes.caption,
    color: colors.textMuted,
  },
  badge: {
    backgroundColor: colors.urgent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
    marginTop: spacing.s,
  },
  badgeText: {
    color: colors.primaryTextOn,
    fontSize: fontSizes.small,
    fontWeight: '700',
  },
  actionsColumn: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minHeight: 70,
  },
  amount: {
    fontSize: fontSizes.amount,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.m,
  },
  buttonGroup: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: spacing.s,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.m,
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
    minHeight: 44,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: colors.primaryTextOn,
    fontWeight: '600',
    fontSize: fontSizes.body,
  },
  secondaryButton: {
    paddingVertical: 4,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: fontSizes.small,
    fontWeight: '500',
  },
});