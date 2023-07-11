<template>
  <VIcon
    :icon="paymentIcon"
    class="payment-icon"
  />
</template>
<script setup>
import { computed, inject } from 'vue';
import { usePaymentInfo } from '@/composables/orders/PaymentInfo';

const order = inject('order');
const {
  cardIssuer,
  paymentType
} = usePaymentInfo(order);

const paymentIcon = computed(() => {
  const icons = {
    visa: 'fab fa-cc-visa',
    mastercard: 'fab fa-cc-mastercard',
    amex: 'fab fa-cc-amex',
    discover: 'fab fa-cc-discover',
    defaultCard: 'fas fa-credit-card',
    cash: 'fad fa-money-bill-1',
    coupon: 'fad fa-ticket',
    upc: 'fad fa-rectangle-barcode',
  };
  let icon = '';
  if (paymentType.value === 'card') {
    icon = icons[cardIssuer.value?.toLowerCase()] || icons.defaultCard;
  } else {
    icon = icons[paymentType.value];
  }
  return icon;
});
</script>
<style lang="scss" scoped>
.payment-icon {
  color: rgb(var(--v-theme-grey, 176,190,197))
}
:deep(.fa-money-bill-1) {
  --fa-primary-color: #2c7d52;
  --fa-secondary-color: #aacbb9;
  --fa-secondary-opacity: 1;
}

:deep(.fa-rectangle-barcode) {
  --fa-primary-color: #000000;
  --fa-secondary-color: #818181;
  --fa-secondary-opacity: 1;
}

:deep(.fa-ticket) {
  --fa-primary-color: #ffc56d;
  --fa-secondary-color: #FF9800;
  --fa-secondary-opacity: 1
}
</style>
