import { Payment, loadMockPayments } from "@/services/payments";
import { useCallback, useEffect, useMemo, useState } from "react";

export function usePayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await loadMockPayments();
    data.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
    setPayments(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 700));
    await load();
    setRefreshing(false);
  }, [load]);

  const totalDue = useMemo(
    () => payments.reduce((s, p) => s + p.amount, 0),
    [payments]
  );

  const payNow = useCallback(async (id: number) => {
    setPayments((prev) => prev.filter((p) => p.id !== id));
    return true;
  }, []);

  const payLater = useCallback(async (id: number, days = 7) => {
    setPayments((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const d = new Date(p.dueDate);
          d.setDate(d.getDate() + days);
          return {
            ...p,
            dueDate: d.toISOString().slice(0, 10),
            status: "postponed",
          };
        }
        return p;
      })
    );
  }, []);

  return {
    payments,
    loading,
    refreshing,
    onRefresh,
    totalDue,
    payNow,
    payLater,
  };
}
