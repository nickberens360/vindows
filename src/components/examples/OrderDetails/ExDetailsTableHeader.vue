<template>
  <ExampleComponent
    name="DetailsTableHeader"
    file-path="@/components/compound/OrderDetails/DetailsTableHeader.vue"
  >
    <DetailsTableHeader @refund-all-checked="allSelected = !allSelected" />
    <template #actions>
      <div class="d-flex align-center">
        <v-btn
          class="mx-3 mb-6"
          height="56"
          @click="cycleExample"
        >
          cycle example
        </v-btn>
        <span class="mb-4 text-body-2 text-blue-dark">
          {{ mockOrders[exampleIndex].desc }}
        </span>
        <v-spacer />
        <span class="mr-16 mb-4 bg-grey-lighten-3 text-body-2 text-blue-dark">
          All items selected: {{ allSelected }}
        </span>
      </div>
      <ExDocsToggle title="Events">
        <template #content>
          <v-data-table
            :headers="eventHeaders"
            :items="eventItems"
            hide-default-footer
            class="elevation-2 mt-4"
          >
            <template #bottom />
          </v-data-table>
        </template>
      </ExDocsToggle>
    </template>
  </ExampleComponent>
</template>

<script>
import { computed } from 'vue';
import ExampleComponent from '@/components/compound/ExampleComponent';
import DetailsTableHeader from '@/components/compound/orders/DetailsTableHeader';
import ExDocsToggle from '@/components/examples/ExDocs/ExDocsToggle';
import { useOrdersStore } from '@/store/orders';
import { mapStores } from 'pinia';
export default {
  name: 'ExDetailsTableHeader',
  components: {
    DetailsTableHeader,
    ExampleComponent,
    ExDocsToggle,
  },
  provide() {
    return {
      order: computed(() => {
        return this.ordersStore.orderDetails;
      }),
    };
  },
  data: () => ({
    allSelected: false,
    exampleIndex: 0,
    eventHeaders: [
      {
        title: 'Name',
        key: 'name',
        sortable: false,
      },
      {
        title: 'Type',
        key: 'type',
        sortable: false,
      },
      {
        title: 'Description',
        key: 'description',
        sortable: false,
      },
    ],
    eventItems: [
      {
        name: '@refund-all-checked',
        type: '[boolean]',
        description: 'Emitted whenever refund all is checked',
      },
    ],
    mockOrders: [
      {
        desc: 'Example with shipping',
        stage: 'processed',
        payment: {
          type: 'card',
          subTotal: 11,
          couponTotal: 1,
          shippingTotal: 4.95,
          tax: 1.11,
          total: 12.11,
          paidTotal: 12.11,
          currency: 'USD',
        },
        session: {
          kioskNumber: 'X00109',
        },
      },
      {
        desc: 'Example with no shipping',
        stage: 'processed',
        payment: {
          type: 'card',
          subTotal: 22,
          couponTotal: 2,
          shippingTotal: 0,
          tax: 2.22,
          total: 23.22,
          paidTotal: 23.22,
          currency: 'USD',
        },
        session: {
          kioskNumber: 'X00109',
        },
      },
      {
        desc: 'Example from the land of Maple syrup',
        stage: 'processed',
        payment: {
          type: 'card',
          subTotal: 33,
          couponTotal: 3,
          shippingTotal: 4.95,
          tax: 3.33,
          total: 34.33,
          paidTotal: 34.33,
          currency: 'CAD',
        },
        session: {
          kioskNumber: 'X00109',
        },
      },
      {
        desc: 'Example with shipping refunded',
        stage: 'processed',
        payment: {
          type: 'card',
          subTotal: 44,
          couponTotal: 4,
          shippingTotal: 4.95,
          tax: 4.44,
          total: 45.44,
          paidTotal: 45.44,
          currency: 'USD',
        },
        session: {
          kioskNumber: 'X00109',
        },
      },
      {
        desc: 'Example order ineligible for refund',
        stage: 'processed',
        payment: {
          type: 'card',
          subTotal: 55,
          couponTotal: 5,
          shippingTotal: 4.95,
          tax: 5.55,
          total: 56.55,
          paidTotal: 56.55,
          currency: 'USD',
        },
        session: {
          kioskNumber: 'Z00109',
        },
      },
    ],
  }),
  computed: {
    ...mapStores(useOrdersStore),
    order() {
      return this.ordersStore.orderDetails;
    },
  },
  mounted() {
    this.ordersStore.orderDetails = { ...this.order, ...this.mockOrders[0] };
  },
  methods: {
    cycleExample() {
      if (this.exampleIndex < this.mockOrders.length - 1) this.exampleIndex++;
      else this.exampleIndex = 0;

      this.order.items[3].refunds =
        this.exampleIndex === 3 ? ['shipping refunded'] : [];

      this.ordersStore.orderDetails = {
        ...this.order,
        ...this.mockOrders[this.exampleIndex],
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
