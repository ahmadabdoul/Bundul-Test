
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontSizes, radii, spacing } from '../tokens';
import { formatCurrency } from '../utils/format';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  service?: string;
  amount?: number;
  dueDate?: string;
};

export default function PayModal({ visible, onClose, onConfirm, service, amount, dueDate }: Props) {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Confirm Payment</Text>
          <Text style={styles.body}>Pay {formatCurrency(amount ?? 0)} to {service} on {dueDate}?</Text>

          <View style={styles.row}>
            <TouchableOpacity style={styles.cancel} onPress={onClose}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
            <TouchableOpacity style={styles.confirm} onPress={onConfirm}><Text style={styles.confirmText}>Confirm</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.surface,
    padding: spacing.l,
    borderTopLeftRadius: radii.card,
    borderTopRightRadius: radii.card
  },
  title: { fontSize: fontSizes.body, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.s },
  body: { fontSize: fontSizes.body, color: colors.textMuted, marginBottom: spacing.l },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  cancel: { padding: spacing.s, borderRadius: 12, borderWidth: 1, borderColor: colors.textMuted, width: '48%', alignItems: 'center' },
  cancelText: { color: colors.textPrimary },
  confirm: { padding: spacing.s, borderRadius: 12, backgroundColor: colors.primary, width: '48%', alignItems: 'center' },
  confirmText: { color: colors.primaryTextOn, fontWeight: '700' }
});
