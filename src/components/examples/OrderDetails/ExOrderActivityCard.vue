<template>
  <ExampleComponent
    name="OrderActivityCard"
    description="This component is used to display the activity details for an order."
    file-path="@/components/compound/OrderDetails/OrderActivityCard.vue"
  >
    <OrderActivityCard :item="activityItem" />

    <template #actions>
      <VRow style="max-width: 600px">
        <VCol
          cols="4"
          class="pt-0"
        >
          <VRadioGroup
            v-model="activityItem"
          >
            <VRadio
              :label="refundItem.type"
              :value="refundItem"
            />
            <VRadio
              :label="captureItem.type"
              :value="captureItem"
            />
          </VRadioGroup>
        </VCol>
      </VRow>
    </template>
  </ExampleComponent>
</template>

<script>
import ExampleComponent from '@/components/compound/ExampleComponent';
import OrderActivityCard from '@/components/compound/orders/OrderActivityCard';

export default {
  name: 'ExOrderActivityCard',
  components: {
    OrderActivityCard,
    ExampleComponent,
  },
  data: () => ({
    activityItem: null,
    refundItem: {
      items: [
        {
          itemId: 1,
          quantity: 1,
          amount: 9.79
        },
        {
          itemId: 2,
          quantity: 1,
          amount: 16.31
        },
        {
          itemId: 4,
          quantity: 1,
          amount: 10.88
        },
        {
          itemId: 3,
          quantity: 1,
          amount: 13.05
        },
        {
          itemId: 5,
          amount: 4.95,
          reason: 'Shipping Refund'
        }
      ],
      type: 'Refund',
      identifier: 'JBOR6IE2R5',
      amount: -54.98,
      status: 'success',
      email: 'Adamturin11@gmail.com',
      username: 'smcilroy',
      timestamp: '2023-03-03T15:17:02.797-06:00'
    },
    captureItem: {
      type: 'Capture',
      identifier: 'JBOR6IE2R5',
      amount: 54.98,
      status: 'declined',
      email: 'Adamturin11@gmail.com',
      message: 'Synthetic capture',
      timestamp: '2023-03-03T11:04:55.463-07:00'
    },
  }),
  mounted() {
    this.initMockData();
  },
  methods: {
    initMockData() {
      this.activityItem = this.refundItem;
    },
  }
};
</script>

<style scoped>

</style>
