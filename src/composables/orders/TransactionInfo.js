import { computed, unref } from 'vue';

export function useTransactionInfo(order) {
  const isDetailedOrder = computed(() => typeof unref(order)?.payment === 'object');

  const timestamp = computed(() => isDetailedOrder.value ? unref(order)?.payment.timestamp : unref(order)?.timestamp);
  const transactionId = computed(() => unref(order)?.transactionId);
  const sessionId = computed(() => isDetailedOrder.value ? unref(order)?.session?.sessionId : unref(order)?.sessionId);
  const kioskNumber = computed(() => isDetailedOrder.value ? unref(order)?.session?.kioskNumber : unref(order)?.kioskNumber);
  const storeName = computed(() => unref(order)?.session?.storeName);
  const storeAddress = computed(() => unref(order)?.session?.storeAddress);

  const kioskRefundable = computed(() => {
    const refundableKioskTypes = ['x', 'k'];
    return refundableKioskTypes.includes(kioskNumber.value.at(0).toLowerCase());
  });

  const paymentTypeRefundable = computed(() => {
    const nonRefundablePaymentTypes = ['cash', 'coupon', 'upc'];
    return !nonRefundablePaymentTypes.includes(unref(order)?.payment.type);
  });

  return {
    timestamp,
    transactionId,
    sessionId,
    kioskNumber,
    storeName,
    storeAddress,
    kioskRefundable,
    paymentTypeRefundable,
  };
}
