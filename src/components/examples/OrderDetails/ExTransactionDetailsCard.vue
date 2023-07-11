<template>
  <ExampleComponent
    name="TransactionDetailsCard"
    description="This component is used to display the transaction details for an order. The order should be injected via the Vue 3 provide / inject pattern.It wraps a v - card component so any props for that component are also available here."
    file-path="@/components/compound/OrderDetails/TransactionDetailsCard.vue"
  >
    <TransactionDetailsCard :variant="selectedVariant">
      <template #actions>
        <VBtn class="mt-auto">
          Example Action Button
        </VBtn>
      </template>
    </TransactionDetailsCard>
    <template #actions>
      <VRow style="max-width: 600px">
        <VCol cols="4">
          <VBtn @click="switchOrder">
            Cycle Example
          </VBtn>
        </VCol>
        <VCol cols="4">
          <VSelect
            v-model="selectedVariant"
            label="Variant"
            :items="variantOptions"
          />
        </VCol>
      </VRow>
    </template>
  </ExampleComponent>
</template>

<script>
import { computed } from 'vue';
import ExampleComponent from '@/components/compound/ExampleComponent';
import TransactionDetailsCard from '@/components/compound/orders/TransactionDetailsCard';
import { mockOrderDetails } from '@/services/mockDataService';

export default {
  name: 'ExTransactionDetailsCard',
  components: {
    TransactionDetailsCard,
    ExampleComponent,
  },
  provide() {
    return {
      order: computed(() => this.orderDetails),
    };
  },
  data: () => ({
    variantOptions: ['detailed', 'time-and-place'],
    selectedVariant: 'detailed',
    orders: [],
    orderDetails: null,
  }),
  mounted() {
    this.initMockData();
    this.switchOrder();
  },
  methods: {
    switchOrder() {
      const currentOrderIndex = this.orders.indexOf(this.orderDetails);
      let newOrderIndex = 0;
      if (currentOrderIndex < this.orders.length - 1) {
        newOrderIndex = currentOrderIndex + 1;
      }
      this.orderDetails = this.orders[newOrderIndex];
    },
    initMockData() {
      const mockOrder1 = Object.assign({}, mockOrderDetails);
      const mockOrder2 = Object.assign({}, mockOrderDetails, {
        stage: 'processed',
        transactionId: 'HB0010963D2F936',
        session: {
          sessionId: '269064e2-87ec-4c13-8981-6af33a0d0fb9',
          locale: 'en',
          kioskNumber: 'X00109',
          storeName: 'Test',
          storeAddress: '123 Bogus Lane, Boulder, CO 80003',
        },
      });
      const mockOrder3 = Object.assign({}, mockOrderDetails, {
        stage: 'refunded',
        transactionId: 'SKG010963D2E6237',
        session: {
          sessionId: '269064e2-87ec-4c13-8981-6af34a0d0fb9',
          locale: 'en',
          kioskNumber: 'X00109',
          storeName: 'Bobs Hardware',
          storeAddress: '1811 Main St, Beverly Hills, CA 90210',
        },
      });
      this.orders = [mockOrder1, mockOrder2, mockOrder3];
    },
  },
};
</script>

<style scoped></style>
