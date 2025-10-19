import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyState from '@/components/EmptyState';
import HeaderTotal from '@/components/HeaderTotal';
import ListSkeleton from '@/components/ListSkeleton';
import PaymentItem from '@/components/PaymentItem';
import PayModal from '@/components/PayModal';
import { colors } from '@/constants/tokens';
import { usePayments } from '@/hooks/usePayments';
import { FlashList } from '@shopify/flash-list';
import { StatusBar } from 'expo-status-bar';

export default function DuePaymentsScreen() {
  const { payments, loading, refreshing, onRefresh, totalDue, payNow, payLater } = usePayments();
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handlePayNow = (id: number) => {
    const item = payments.find((p) => p.id === id);
    setSelected(item);
    setModalOpen(true);
  };

  const confirmPay = async () => {
    if (!selected) return;
    await payNow(selected.id);
    setModalOpen(false);
  };

  const handlePayLater = async (id: number) => {
    await payLater(id, 7);
    setToast('Postponed payment — due in 7 days');
    setTimeout(() => setToast(null), 2400);
  };

 
  return (
    <SafeAreaView style={styles.safe}>
    <StatusBar backgroundColor={colors.gradientStart} style='dark' />
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={[0, 0]}
        end={[0, 1]}
        locations={[0, 0.8]}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <HeaderTotal total={totalDue} />
          {loading && <ListSkeleton />}

          {!loading && payments.length === 0 && <EmptyState />}

          {!loading && payments.length > 0 && (
            <FlashList
              data={payments}
              renderItem={({ item }) => (
                <PaymentItem item={item} onPayNow={handlePayNow} onPayLater={handlePayLater} />
              )}
              onRefresh={onRefresh}
              refreshing={refreshing}
              keyExtractor={(i) => i.id.toString()}
              getItemType={(item) => 'payment-item'}
              contentContainerStyle={{ paddingBottom: 80 }}
              onEndReachedThreshold={0.5}
            />
          )}

          <PayModal
            visible={modalOpen}
            service={selected?.service}
            amount={selected?.amount}
            dueDate={selected?.dueDate}
            onClose={() => setModalOpen(false)}
            onConfirm={confirmPay}
          />

          {toast && (
            <View style={styles.toast}>
              <Text style={{ color: colors.textPrimary }}>{toast}</Text>
              <Text style={{ color: colors.primary, marginLeft: 8 }}>OK</Text>
            </View>
          )}

          <View style={styles.pullHint}>
            <Text style={{ color: colors.textMuted }}>Pull to refresh</Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'transparent' },
  // gradient fills the safe area
  gradient: { flex: 1 },
  container: { flex: 1, backgroundColor: 'transparent' },
  toast: {
    position: 'absolute',
    right: 18,
    top: 60,
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 12,
    ...{ shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8 }
  },
  pullHint: {
    position: 'absolute',
    bottom: 12,
    width: '100%',
    alignItems: 'center'
  }
});
