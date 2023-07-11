<template>
  <div class="payment-info">
    <InfoField
      :label="hideLabel ? '' : 'Payment'"
      :content-size="contentSize"
    >
      <template #details>
        <div class="d-flex align-center">
          <PaymentIcon
            :size="iconSize"
            :class="{ 'mr-3': paymentType === 'card' }"
            class="payment-icon"
          />

          <span
            v-if="paymentType === 'card'"
            class="text-primary"
          >
            {{ pan }}
          </span>
        </div>

        <section v-if="cardProcessor && !props.hideProcessor">
          <div class="d-flex align-center mt-1">
            <VIcon
              icon="fad fa-microchip"
              size="16"
              color="primary"
              class="mr-2"
            />

            <span class="text-caption-2 primary--text">
              {{ cardProcessor }}
            </span>
          </div>

          <div
            v-if="cardProcessor === 'Eport'"
            class="mt-1 text-caption-2 text-primary"
          >
            <div v-show="deviceTransactionId">
              <span class="font-weight-bold mr-1">Device Trans Id:</span>
              {{ deviceTransactionId }}
            </div>
            <div v-show="deviceSerialNumber">
              <span class="font-weight-bold mr-1">Device Serial #:</span>
              {{ deviceSerialNumber }}
            </div>
          </div>
        </section>
      </template>
    </InfoField>
  </div>
</template>
<script setup>
import { computed, inject } from 'vue';
import { usePaymentInfo } from '@/composables/orders/PaymentInfo';
import InfoField from '@/components/base/InfoField';
import PaymentIcon from '@/components/orders/management/common/PaymentIcon';

const order = inject('order');
const props = defineProps({
  contentSize: {
    type: String,
    default: 'md',
  },
  hideLabel: {
    type: Boolean,
  },
  hideProcessor: {
    type: Boolean,
  },
});
const iconSize = computed(() => {
  return props.contentSize === 'sm' ? 16 : 20;
});
const {
  pan,
  paymentType,
  deviceTransactionId,
  deviceSerialNumber,
  cardProcessor,
} = usePaymentInfo(order);
</script>

<style lang="scss" scoped>
:deep(.payment-icon.v-icon) {
  position: relative;
  left: 2px;
}
</style>
