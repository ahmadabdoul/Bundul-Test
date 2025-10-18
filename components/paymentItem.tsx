
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, elevation, fontSizes, radii, spacing } from '../constants/tokens';
import { Payment } from '../services/payments';
import { formatDueDate, isDueSoon, isPastDue } from '../utils/date';
import { formatCurrency } from '../utils/format';

type Props = {
  item: Payment;
  onPayNow: (id: number) => void;
  onPayLater: (id: number) => void;
};

export default function PaymentItem({ item, onPayNow, onPayLater }: Props) {
  const dueSoon = isDueSoon(item.dueDate);
  const past = isPastDue(item.dueDate);

  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (dueSoon) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.05, duration: 600, useNativeDriver: true, easing: undefined as any }),
          Animated.timing(pulse, { toValue: 1.0, duration: 600, useNativeDriver: true, easing: undefined as any })
        ])
      ).start();
    }
  }, [dueSoon, pulse]);

  return (
    <View style={[styles.card, dueSoon && { backgroundColor: colors.cardTintUrgent }]}>
      <View style={styles.left}>
        <Image source={item.icon} style={styles.icon} />
      </View>

      <View style={styles.middle}>
        <Text style={styles.service}>{item.service}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={styles.date}>{formatDueDate(item.dueDate)}</Text>
          {dueSoon && (
            <Animated.View style={[styles.badge, { transform: [{ scale: pulse }] }]}>
              <Text style={styles.badgeText}>Due Soon</Text>
            </Animated.View>
          )}
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.amount}>{formatCurrency(item.amount, item.currency)}</Text>

        <View style={styles.actions}>
          <TouchableOpacity accessible accessibilityRole="button" accessibilityLabel={`Pay now ${item.service}`} style={styles.primary} onPress={() => onPayNow(item.id)}>
            <Text style={styles.primaryText}>Pay Now</Text>
          </TouchableOpacity>
          <TouchableOpacity accessible accessibilityRole="button" accessibilityLabel={`Pay later ${item.service}`} style={styles.secondary} onPress={() => onPayLater(item.id)}>
            <Text style={styles.secondaryText}>Pay Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    ...elevation.low
  },
  left: { marginRight: spacing.m },
  icon: { width: 48, height: 48, borderRadius: 10 },
  middle: { flex: 1 },
  service: { fontSize: fontSizes.body, color: colors.textPrimary, fontWeight: '700' },
  date: { fontSize: fontSizes.caption, color: colors.textMuted, marginTop: 4 },
  badge: {
    backgroundColor: colors.urgent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
    marginLeft: spacing.s
  },
  badgeText: { color: colors.primaryTextOn, fontSize: fontSizes.small, fontWeight: '600' },
  right: { alignItems: 'flex-end' },
  amount: { fontSize: fontSizes.amount, fontWeight: '700', marginBottom: spacing.s },
  actions: { flexDirection: 'row', alignItems: 'center' },
  primary: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 88,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryText: { color: colors.primaryTextOn, fontWeight: '700' },
  secondary: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginLeft: spacing.s
  },
  secondaryText: { color: colors.primary, fontSize: fontSizes.small }
});
