import { computed, unref } from 'vue';

export function useOrderTotals(order) {
  const couponTotal = computed(() => unref(order)?.payment?.couponTotal || 0);
  const currency = computed(() => unref(order)?.payment?.currency || 'USD');
  const paidTotal = computed(() => unref(order)?.payment?.paidTotal || 0);
  const refundTotal = computed(() => unref(order)?.payment?.refundTotal || 0);
  const shippingTaxRate = computed(() => unref(order)?.payment?.shippingTaxRate || 0);
  const shippingTotal = computed(() => unref(order)?.payment?.shippingTotal || 0);
  const subTotal = computed(() => unref(order)?.payment?.subTotal || 0);
  const tax = computed(() => unref(order)?.payment?.tax || 0);
  const taxRate = computed(() => unref(order)?.payment?.taxRate || 0);
  const total = computed(() => {
    if (unref(order)?.payment?.paidTotal > 0) {
      return unref(order)?.payment?.paidTotal;
    } else if (unref(order)?.stage === 'voided') {
      return 0;
    } else {
      return unref(order)?.payment?.total || 0;
    }
  });

  return {
    couponTotal,
    currency,
    paidTotal,
    refundTotal,
    shippingTaxRate,
    shippingTotal,
    subTotal,
    tax,
    taxRate,
    total,
  };
}