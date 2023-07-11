<template>
  <ExampleComponent
    name="OrderRefundDrawer"
    file-path="@/components/compound/OrderDetails/OrderRefundDrawer.vue"
  >
    <v-checkbox
      label="Show Eport Order"
      hide-details
      @change="orderDetails = !eportOrder ? orderDetails : eportOrder"
    />
    <v-row class="mb-4">
      <v-col
        cols="6"
        style="height: 70vh"
      >
        <OrderRefundDrawer
          :order="orderDetails"
          :selected-items="selectedItems"
          @refund-items-updated="showFormData"
          @submit-initiated="handleSubmitInitiated"
          @refund-complete="handleRefundComplete"
        />
      </v-col>
      <v-col
        v-if="orderDetails?.items.length"
        cols="3"
      >
        <div
          v-for="item in orderDetails.items"
          :key="item.itemId"
        >
          <v-checkbox
            v-if="item.type !== 'SH'"
            v-model="selectedItems"
            :label="item.description"
            :value="item"
            multiple
            hide-details
          />
        </div>
        <div class="mt-6 font-weight-bold">
          <pre>{{ submitInitiatedData }}</pre>
        </div>
      </v-col>
      <v-col cols="3">
        <code class="mb-4 d-block">formData</code>
        <pre
          class="pa-4 mb-4 elevation-5"
          style="max-height: 350px; overflow: scroll;"
        >{{ formData }}</pre>
        <code class="mb-4 d-block">items</code>
        <pre
          class="pa-4 elevation-5"
          style="max-height: 350px; overflow: scroll;"
        >{{ selectedItems }}</pre>
      </v-col>
    </v-row>
    <ExDocsToggle title="Props">
      <template #content>
        <v-data-table
          :headers="propsHeaders"
          :items="propItems"
          hide-default-footer
          class="elevation-2 mt-4"
        >
          <template #bottom />
        </v-data-table>
      </template>
    </ExDocsToggle>
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
  </ExampleComponent>
</template>

<script>
import {computed} from 'vue';
import ExampleComponent from '@/components/compound/ExampleComponent';
import { mockOrderDetails } from '@/services/mockDataService';
import OrderRefundDrawer from '@/components/compound/orders/OrderRefundDrawer';
import ExDocsToggle from '@/components/examples/ExDocs/ExDocsToggle';

export default {
  name: 'ExOrderRefundDrawer',
  components: {
    ExDocsToggle,
    OrderRefundDrawer,
    ExampleComponent,
  },
  provide() {
    return {
      order: computed(() => this.orderDetails)
    };
  },
  data: () => ({
    formData: null,
    submitInitiatedData: null,
    successTotal: 0,
    selectedItem: [],
    selectedItems: [],
    orderDetails: null,
    eportOrder: null,
    propsHeaders: [
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
        title: 'Default',
        key: 'default',
        sortable: false,
      },
      {
        title: 'Required',
        key: 'required',
        sortable: false,
      },
      {
        title: 'Description',
        key: 'description',
        sortable: false,
      },
      {
        title: 'Controls',
        key: 'controls',
        sortable: false,
      },

    ],
    propItems: [
      {
        name: 'order',
        type: 'Array',
        default: '[]',
        required: 'true',
        description: 'Array of order items to be refunded',
      },
    ],
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
        name: '@submit-initiated',
        type: 'Boolean',
        description: 'Emits true when the submit button is clicked',
      },

    ],
  }),
  watch: {
    selectedItem() {
      if (this.selectedItem === false) {
        this.orderDetails.items = [];
        return;
      }
      this.orderDetails.items = this.selectedItem;
    }
  },
  mounted() {
    this.initMockData();
  },
  methods: {
    handleRefundComplete() {
      this.selectedItems = [];
    },
    handleSubmitInitiated() {
      this.submitInitiatedData = this.formData;

    },
    showFormData(formData) {
      this.formData = formData;
    },
    initMockData() {
      this.orderDetails = Object.assign({}, mockOrderDetails, {});
      this.eportOrder = Object.assign({}, mockOrderDetails, {
        payment: {
          type: 'card',
          status: 'success',
          timestamp: '2022-10-28T12:56:50.677-07:00',
          subTotal: 33,
          couponTotal: 0,
          shippingTotal: 4.95,
          refundTotal: -51.34,
          taxRate: 0.0875,
          shippingTaxRate: 0.0875,
          tax: 3.76,
          total: 56.76,
          paidTotal: 56.76,
          currency: 'USD',
          serialNumber: 'VJ200064708',
          eportTransactionId: '1611126055',
          card: {
            cardHolder: 'Nick Berens',
            pan: '476173*0119',
            expirationDate: '2022-12-31',
            issuer: 'Visa',
            processor: 'Eport',
          },
        },
      });
    }
  }
};
</script>

<style scoped>

pre {
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}
</style>
