<template>
  <div class="order-details-shipping-address">
    <InfoField label="Shipping Address">
      <template #details>
        <div
          v-if="shippingAddress"
          class="text-capitalize"
        >
          {{ addressLine1 }}
          <br>
          {{ addressLine2 }}
        </div>
        <div v-else>
          Shipping data not available
        </div>
      </template>
    </InfoField>
  </div>
</template>
<script setup>
import { inject } from 'vue';
import InfoField from '@/components/base/InfoField.vue';
import { useShippingAddress } from '@/composables/orders/ShippingAddress';

const order = inject('order');
const {
  shippingAddress,
  addressLine1,
  addressLine2
} = useShippingAddress(order);
</script>
