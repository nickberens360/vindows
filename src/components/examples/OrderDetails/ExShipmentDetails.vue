<template>
  <ExampleComponent
    name="OrderDetails/ShipmentDetails"
    description="This component is designed to display the details of a shipment. The component is set up to handle a shipment object passed as a prop from the parent. The component is built using the composition API, and utilizes the `ShipmentDetails` composable."
    file-path="@/components/compound/OrderDetails/ShipmentDetails.vue"
  >
    <ShipmentDetails
      v-for="(shipment, idenfitier, index) in uniqueShipments"
      :key="idenfitier + 1"
      :shipment="shipment"
      :badge-content="index + 1"
    />
    <template #actions>
      <VRow style="max-width: 600px">
        <VCol cols="4">
          <VBtn @click="() => buildShipmentObject()">
            Cycle Example
          </VBtn>
        </VCol>
      </VRow>
    </template>
  </ExampleComponent>
</template>

<script>
import ExampleComponent from '@/components/compound/ExampleComponent';
import ShipmentDetails from '@/components/compound/orders/ShipmentDetails';

export default {
  name: 'ExShipmentDetails',
  components: {
    ExampleComponent,
    ShipmentDetails
  },
  data: () => ({
    uniqueShipments: {},
  }),
  created() {
    this.buildShipmentObject();
  },
  methods: {
    buildShipmentObject(){
      this.uniqueShipments = {};
      const states = ['refunded', 'pending-ship', 'shipped', 'delivered'];
      const identifiers = ['LNB5X1VOV1VVR9Z7PY', 'WX0JYQHJTAW7YVQT4J', 'EVHLBTZWLK0ZCGGZEI', 'A36ZA33T4U3CQRCL5J'];
      const identifier = identifiers[this.assignRandomData(identifiers.length)];

      const shipmentObject =  {
        type:'Shipment',
        amount:54.65,
        status: states[this.assignRandomData(states.length)],
        identifier,
        email:'Phil.haines@fakeemail.com',
        phoneNumber:'9176549009',
        timestamp:'2022-11-25T09:58:18.163-07:00',
      };
      this.uniqueShipments[identifier] = {...shipmentObject};
    },
    assignRandomData(max){
      return Math.floor(Math.random() * max);
    }
  },
};
</script>
