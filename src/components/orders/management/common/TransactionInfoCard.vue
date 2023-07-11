<template>
  <v-card>
    <v-card-title
      v-if="showStage"
      class="pa-0 mb-5"
    >
      <OrderStage show-label />
    </v-card-title>

    <v-card-text class="pb-8 px-8">
      <div class="d-flex flex-wrap justify-space-between mb-6">
        <TransactionId v-if="showTransactionId" />
        <TransactionDate />
      </div>

      <div class="d-flex flex-wrap justify-space-between">
        <TransactionLocation />
        <v-btn
          v-if="showOrderDetailsBtn"
          class="align-self-end"
          color="primary"
          height="44px"
          variant="elevated"
          @click="openOrderDetails"
        >
          Order Details
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import TransactionId from '@/components/orders/management/common/TransactionId';
import TransactionDate from '@/components/orders/management/common/TransactionDate';
import OrderStage from '@/components/orders/management/common/OrderStage';
import TransactionLocation from '@/components/orders/management/common/TransactionLocation';

const router = useRouter();
const props = defineProps({
  orderItem: {
    type: Object,
    required: true,
  },
  variant: {
    type: String,
    default: 'detailed',
    validator: (variant) =>
      ['detailed-with-btn', 'detailed', 'time-and-place'].includes(variant),
  },
});

let showStage = computed(() => props.variant.includes('detailed'));
let showTransactionId = computed(() => props.variant.includes('detailed'));
let showOrderDetailsBtn = computed(() => props.variant === 'detailed-with-btn');

function openOrderDetails() {
  router.push({
    name: 'orderDetails',
    params: { sessionId: props.orderItem.session.sessionId },
  });
}
</script>

<style lang="scss" scoped></style>
