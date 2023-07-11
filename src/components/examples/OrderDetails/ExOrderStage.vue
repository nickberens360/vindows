<template>
  <ExampleComponent
    name="OrderDetails/OrderStage"
    description="This component is used to display the stage of an order. The order should be injected via the Vue 3 provide / inject pattern. It wraps a VSheet component so any props for that component are also available here. A slot named 'label' is also available which exposes the 'label' property as a slot prop if customization of the label display is desired."
    file-path="@/components/compound/OrderDetails/TransactionDetailsCard.vue"
  >
    <OrderStage
      :width="demoWidth"
      :height="demoHeight"
      :show-label="showLabel"
      :rounded="isRounded"
    />

    <template #actions>
      <div class="d-flex flex-wrap">
        <VSheet
          max-width="175px"
          class="px-2"
        >
          <VBtn @click="switchOrder">
            Cycle Example
          </VBtn>
        </VSheet>
        <VSheet
          max-width="175px"
          class="px-2"
        >
          <VSelect
            v-model="selectedWidth"
            hide-details
            label="Width"
            :items="widthOptions"
          />
        </VSheet>
        <VSheet
          max-width="175px"
          class="px-2"
        >
          <VSelect
            v-model="selectedHeight"
            hide-details
            label="Height"
            :items="heightOptions"
          />
        </VSheet>
        <VSheet
          max-width="175px"
          class="px-2"
        >
          <VCheckbox
            v-model="showLabel"
            label="Show Label"
          />
        </VSheet>
        <VSheet
          max-width="175px"
          class="px-2"
        >
          <VCheckbox
            v-model="isRounded"
            label="Rounded"
          />
        </VSheet>
      </div>
    </template>
  </ExampleComponent>
</template>

<script>
import { computed } from 'vue';
import ExampleComponent from '@/components/compound/ExampleComponent';
import OrderStage from '@/components/compound/orders/OrderStage';
import { mockOrderDetails } from '@/services/mockDataService';

export default {
  name: 'ExOrderStage',
  components: {
    OrderStage,
    ExampleComponent,
  },
  provide() {
    return {
      order: computed(() => this.orderDetails)
    };
  },
  data: () => ({
    widthOptions: [
      { title: 'default', value: undefined },
      { title: '40px', value: '40px'}
    ],
    heightOptions: [
      { title: 'default', value: undefined },
      { title: '40px', value: '40px'}
    ],
    isRounded: false,
    showLabel: true,
    selectedWidth: 'default',
    selectedHeight: 'default',
    orders: [],
    orderDetails: null
  }),
  computed: {
    demoWidth() {
      // added due to bug in current v-select where the title is used as the value when value is undefined
      return this.selectedWidth === 'default' ? undefined : this.selectedWidth;
    },
    demoHeight() {
      // added due to bug in current v-select where the title is used as the value when value is undefined
      return this.selectedHeight === 'default' ? undefined : this.selectedHeight;
    },
  },
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
      this.orders = [
        Object.assign({}, mockOrderDetails, { stage: 'processed' }),
        Object.assign({}, mockOrderDetails, { stage: 'exception' }),
        Object.assign({}, mockOrderDetails, { stage: 'refunded' }),
        Object.assign({}, mockOrderDetails, { stage: 'pending-submission' }),
        Object.assign({}, mockOrderDetails, { stage: 'pending-ship' }),
        Object.assign({}, mockOrderDetails, { stage: 'pending-cash-refund' }),
        Object.assign({}, mockOrderDetails, { stage: 'shipped' }),
        Object.assign({}, mockOrderDetails, { stage: 'eport-refund-recorded' }),
        Object.assign({}, mockOrderDetails, { stage: 'declined' }),
        Object.assign({}, mockOrderDetails, { stage: undefined }),
      ];
    }
  }
};
</script>

<style scoped>

</style>
