<template>
  <div class="transaction-location">
    <InfoField label="Transaction Location">
      <template #details>
        <div class="d-flex flex-column">
          <a href="#">{{ kioskNumber || "Kiosk number unavailable" }}</a>

          <div class="font-weight-bold">
            {{ storeName || "Store name unavailable" }}
          </div>

          <div v-if="storeAddress">
            {{ addressLine1 }}
            <br>
            {{ addressLine2 }}
          </div>
          <div v-else>
            Store Address unavailable
          </div>
        </div>
      </template>
    </InfoField>
  </div>
</template>
<script setup>
import InfoField from '@/components/base/InfoField';
import { computed, inject } from 'vue';

import { useTransactionInfo } from '@/composables/orders/TransactionInfo';
const order = inject('order');
const {
  kioskNumber,
  storeName,
  storeAddress
} = useTransactionInfo(order);
const addressLine2 = computed(() => (storeAddress.value || '').split(',').slice(-2).join(',').trim());
const addressLine1 = computed(() => (storeAddress.value || '').split(',').slice(0, -2).join(',').trim());
</script>
<style lang="scss" scoped>
</style>
