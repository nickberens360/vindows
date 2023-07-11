<template>
  <ExampleComponent
    name="OrderInfoRow"
    description="Shows the order information in a row."
    file-path="@/components/compound/OrderDetails/OrderInfoRow.vue"
  >
    <OrderInfoRow
      :variant="selectedVariant"
    />
    <template #actions>
      <VRow style="max-width: 600px">
        <VCol cols="4">
          <VBtn
            @click="switchOrder"
          >
            Cycle Example
          </VBtn>
        </VCol>
      </VRow>
    </template>
  </ExampleComponent>
</template>

<script>
import { computed } from 'vue';
import ExampleComponent from '@/components/compound/ExampleComponent';
import { mockOrderDetails } from '@/services/mockDataService';
import OrderInfoRow from '@/components/compound/orders/OrderInfoRow';

export default {
  name: 'ExOrderInfoRow',
  components: {
    OrderInfoRow,
    ExampleComponent,
  },
  provide() {
    return {
      order: computed(() => this.orderDetails)
    };
  },
  data: () => ({
    variantOptions: ['detailed', 'time-and-place'],
    selectedVariant: 'detailed',
    orders: [],
    orderDetails: null
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
        customer: {
          name: 'First Lastname',
          email: 'b@gmail.com',
        },
        payment: {
          type: 'card',
          status: 'success',
          timestamp: '2023-03-01T13:11:25.207-07:00',
          card: {
            cardHolder: 'CARD 01 DI TEST',
            pan: '566173*0148',
            expirationDate: '2022-12-31',
            issuer: 'VISA',
            processor: 'Stub',
          },
        },
        session: {
          sessionId: '269064e2-87ec-4c13-8981-6af33a0d0fb9',
          locale: 'en',
          kioskNumber: 'X00109',
          storeName: 'Test',
          storeAddress: '123 Bogus Lane, Boulder, CO 80003',
        },
        shippingAddress: {
          street: '489 Some RD ',
          city: 'Appleton',
          state: 'WI',
          zip: '54911',
          name: 'Bob Whatevs',
        },
        activity: [
          {
            type:'Shipment',
            amount:0.81,
            status: 'delivered',
            identifier: 'WX0JYQHJTAW7YVQT4J',
            email:'Guhalilova1@gmail.com',
            phoneNumber:'9292725464',
            timestamp:'2022-11-25T09:58:18.163-07:00',
          }
        ]

      });
      const mockOrder3 = Object.assign({}, mockOrderDetails, {
        stage: 'refunded',
        transactionId: 'SKG010963D2E6237',
        customer: {
          name: 'Adam Belvedere',
          email: 'c@gmail.com',
        },
        session: {
          sessionId: '269064e2-87ec-4c13-8981-6af34a0d0fb9',
          locale: 'en',
          kioskNumber: 'X00109',
          storeName: 'Bobs Hardware',
          storeAddress: '1811 Main St, Beverly Hills, CA 90210',
        },
        shippingAddress: {
          street: '5014 Some Other RD',
          city: 'Flavor Town',
          state: 'FL',
          zip: '50214',
          name: 'Guy Fieri'
        },
      });
      this.orders = [mockOrder1, mockOrder2, mockOrder3];
    }
  }
};
</script>

<style scoped>

</style>
