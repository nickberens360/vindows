import { computed, unref } from 'vue';

export function usePaymentInfo(order) {
  const isDetailedOrder = computed(() => !!unref(order)?.payment);

  const cardHolderName = computed(() => isDetailedOrder.value ? unref(order?.payment?.card?.cardHolder) : unref(order).name);
  const cardIssuer = computed(() => unref(order)?.payment?.card?.issuer);
  const cardProcessor = computed(() => unref(order)?.payment?.card?.processor);
  const deviceTransactionId = computed(() => unref(order)?.payment?.eportTransactionId);
  const deviceSerialNumber = computed(() => unref(order)?.payment?.serialNumber);
  const pan = computed(() => isDetailedOrder.value ? unref(order)?.payment?.card?.pan : unref(order)?.pan);
  const paymentType = computed(() => isDetailedOrder.value ? unref(order)?.payment?.type : unref(order)?.paymentType);

  const isRefundable = computed(() => {
    switch (paymentType.value) {
    case 'cash':
    case 'upc':
    case 'coupon':
      return false;
    default:
      return true;
    }
  });

  return {
    cardHolderName,
    cardIssuer,
    cardProcessor,
    deviceTransactionId,
    deviceSerialNumber,
    isRefundable,
    pan,
    paymentType,
  };
}
