<template>
  <ExampleComponent>
    <OrderActivityTimeline :order-activity="order.activity" />
  </ExampleComponent>
</template>

<script>
import ExampleComponent from '@/components/compound/ExampleComponent';
import OrderActivityTimeline from '@/components/compound/orders/OrderActivityTimeline';
import { mockOrderDetails } from '@/services/mockDataService';
export default {
  name: 'ExOrderActivityTimeline',
  components: {OrderActivityTimeline, ExampleComponent},
  data: () => ({
    order: mockOrderDetails
  })
};
</script>

<style scoped>

</style>
