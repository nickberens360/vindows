<template>
  <div class="transaction-date">
    <slot
      :day="transactionDay"
      :date="transactionDate"
      :time="transactionTime"
    >
      <InfoField
        label="Transaction Date"
        content-size="lg"
      >
        <template #details>
          {{ transactionDay }} {{ transactionDate }} {{ transactionTime }}
        </template>
      </InfoField>
    </slot>
  </div>
</template>
<script setup>
import { parseISO, format } from 'date-fns';
import { inject, computed } from 'vue';
import InfoField from '@/components/base/InfoField';

import { useTransactionInfo } from '@/composables/orders/TransactionInfo';
const order = inject('order');
const {
  timestamp
} = useTransactionInfo(order);

const transactionDate = computed(() => formatTimestamp('M/dd/yyyy'));
const transactionDay = computed(() => formatTimestamp('EE'));
const transactionTime = computed(() => formatTimestamp('h:mm a'));

function formatTimestamp(outputFormat) {
  let formattedValue = '';
  if (timestamp.value) {
    try {
      formattedValue = format(parseISO(timestamp.value), outputFormat);
    } catch (error) {
      console.error(error);
    }
  }
  return formattedValue;
}
</script>
<style lang="scss" scoped>
</style>
