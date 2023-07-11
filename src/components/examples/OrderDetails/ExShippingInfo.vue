<template>
  <ExampleComponent
    name="OrderDetails/ShippingInfo"
    description="This component is designed to display the most recent shipment activity for all shipments within a single order. The component is set up to handle an order object passed as a prop from the parent. The `ShippingInfo` component handles the logic to pass the most recent activity from each shipment with an order as a single `Shipment` Object as a prop to the `ShipmentDetails` component. The `ShipmentDetails` component is built using the composition API, and utilizes the `ShipmentDetails` composable."
    file-path="@/components/compound/OrderDetails/ShippingInfo.vue"
  >
    <ShippingInfo :order="order" />
    <template #actions>
      <VRow style="max-width: 600px">
        <VCol cols="4">
          <VBtn @click="buildMockData(3)">
            Cycle Example
          </VBtn>
        </VCol>
        <VCol cols="4">
          <VBtn @click="showErrorState">
            Show No Shipping
          </VBtn>
        </VCol>
      </VRow>
    </template>
  </ExampleComponent>
</template>

<script>
import ExampleComponent from '@/components/compound/ExampleComponent';
import ShippingInfo from '@/components/compound/orders/ShippingInfo';
import { mockOrderDetails } from '@/services/mockDataService';

export default {
  name: 'ExShippingInfo',
  components: {
    ExampleComponent,
    ShippingInfo
  },
  data: () => ({
    order: mockOrderDetails,
  }),
  mounted() {
    this.buildMockData(1);
  },
  methods: {
    buildMockData(max) {
      const newActivities = [...this.sanitizeActivityArray(this.order.activity)];
      const numberOfShipments = Math.floor(Math.random() * max);

      for(let i = 0; i <= numberOfShipments; i ++){
        const orderObject = this.buildShipmentObject();
        newActivities.push(orderObject);
      }

      this.order.activity = [...newActivities];
    },
    sanitizeActivityArray(activityArray){
      return activityArray.filter(activity => activity.type !== 'Shipment');
    },
    buildShipmentObject(){
      const states = ['refunded', 'pending-ship', 'shipped', 'delivered'];
      const identifiers = ['LNB5X1VOV1VVR9Z7PY', 'WX0JYQHJTAW7YVQT4J', 'EVHLBTZWLK0ZCGGZEI', 'A36ZA33T4U3CQRCL5J'];

      const shipmentObject =  {
        type:'Shipment',
        amount:0.81,
        status: states[this.assignRandomData(states.length)],
        identifier: identifiers[this.assignRandomData(identifiers.length)],
        email:'Guhalilova1@gmail.com',
        phoneNumber:'9292725464',
        timestamp:'2022-11-25T09:58:18.163-07:00',
      };

      return shipmentObject;
    },
    assignRandomData(max){
      return Math.floor(Math.random() * max);
    },
    showErrorState(){
      this.order.activity = [...this.sanitizeActivityArray(this.order.activity)];
    },
  },
};
</script>
