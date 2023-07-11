<template>
  <v-card
    elevation="0"
    rounded="0"
    class="d-flex flex-column justify-center align-center h-100"
  >
    <v-icon
      size="134"
      class="mb-8 icon-duotone-eye-warning"
    >
      fad fa-eye
    </v-icon>
    <div class="font-weight-bold mb-6 text-body-3 text-center text-primary">
      <div class="text-warning mb-6">
        Must go to SeedLive to process refund
      </div>
      <div>
        Device Trans Id: {{ order.payment.eportTransactionId }}
      </div>
      <div v-if="order.payment.serialNumber">
        Device Serial Number: {{ order.payment.serialNumber }}
      </div>
    </div>
  </v-card>
</template>

<script>
import { inject } from 'vue';
export default {
  name: 'RefundEportCard',
  setup() {
    const order = inject('order');
    return {
      order,
    };
  },
};
</script>

<style scoped>

</style>
