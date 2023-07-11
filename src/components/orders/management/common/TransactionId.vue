<template>
  <div class="order-details-transaction-id">
    <slot
      name="default"
      :label="label"
      :transaction-id="transactionId"
    >
      <InfoField
        :label="label"
        content-size="lg"
      >
        <template #details>
          <div class="text-break">
            {{ transactionId }}
          </div>
        </template>
      </InfoField>
    </slot>
  </div>
</template>
<script setup>
import { inject } from 'vue';
import InfoField from '@/components/base/InfoField.vue';
import { useTransactionInfo } from '@/composables/orders/TransactionInfo';

const order = inject('order');
const { transactionId } = useTransactionInfo(order);
const label= 'Transaction ID';
</script>
<style lang="scss" scoped>
</style>
