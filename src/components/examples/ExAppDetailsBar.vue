<template>
  <ExampleComponent
    name="AppDetailsBar"
    description="This component is used to display the transaction ID and stage in the header of an order details page.
    The order should be injected via the Vue 3 provide / inject pattern. The component defaults to show order details."
    file-path="@/components/app/AppDetailsBar.vue"
  >
    <AppDetailsBar
      v-if="showSimpleHeader"
      :show-content="false"
      :show-actions="false"
      absolute
    >
      <template #title>
        <h1 class="text-h4">
          {{ simpleHeaderTitle }}
        </h1>
      </template>
    </AppDetailsBar>
    <AppDetailsBar v-else />

    <template #actions>
      <VRow
        align="center"
        style="max-width: 800px"
      >
        <VCol cols="4">
          <VBtn
            :disabled="showSimpleHeader"
            @click="switchOrder"
          >
            Cycle Example
          </VBtn>
        </VCol>
        <VCol cols="4">
          <v-checkbox
            v-model="showSimpleHeader"
            label="Show Simple Header"
            hide-details
          />
        </VCol>
        <VCol
          v-if="showSimpleHeader"
          cols="4"
        >
          <v-text-field
            v-model="simpleHeaderTitle"
            variant="solo"
            label="Simple Header Title"
            hide-details
          />
        </VCol>
      </VRow>
    </template>
  </ExampleComponent>
</template>

<script>
import { computed } from 'vue';
import ExampleComponent from '@/components/compound/ExampleComponent';
import AppDetailsBar from '@/components/app/AppDetailsBar';
import { mockOrderDetails } from '@/services/mockDataService';

export default {
  name: 'ExOrderDetailsBar',
  components: {
    AppDetailsBar,
    ExampleComponent,
  },
  provide() {
    return {
      order: computed(() => this.orderDetails)
    };
  },
  data: () => ({
    orders: [],
    orderDetails: null,
    showSimpleHeader: false,
    simpleHeaderTitle: 'Simple Header',
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
        }
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
        }
      });
      this.orders = [mockOrder1, mockOrder2, mockOrder3];
    }
  }
};
</script>

<style scoped>

</style>
