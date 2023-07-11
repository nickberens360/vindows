<template>
  <ExampleComponent
    name="OrdersRow"
    file-path="@/components/compound/OrdersRow.vue"
  >
    <div v-if="showMultipleOrders">
      <OrdersRow
        v-for="order in ordersStore.orderSearchResults"
        :key="order.sessionId"
        :order="order"
      />
    </div>
    <OrdersRow
      v-else
      :order="ordersStore.orderSearchResults[orderIndex]"
    />

    <template #actions>
      <v-btn
        class="d-flex mx-3 mb-5"
        @click="showMultipleOrders = !showMultipleOrders"
      >
        {{ showMultipleOrders ? "Show Single Row" : "Show Multiple Rows" }}
      </v-btn>
      <ExDocsToggle title="Props">
        <template #content>
          <v-data-table
            :headers="propsHeaders"
            :items="propItems"
            hide-default-footer
            class="elevation-2 mt-4"
          >
            <template #[`item.controls`]="{ item }">
              <v-btn
                v-if="item.raw.name === 'order'"
                @click="cycleExamples"
              >
                cycle examples
              </v-btn>
            </template>
            <template #bottom />
          </v-data-table>
        </template>
      </ExDocsToggle>
    </template>
  </ExampleComponent>
</template>

<script>
import ExampleComponent from '@/components/compound/ExampleComponent';
import ExDocsToggle from '@/components/examples/ExDocs/ExDocsToggle';
import OrdersRow from '../compound/OrdersRow.vue';
import { useOrdersStore } from '@/store/orders';
import { mapStores } from 'pinia';

export default {
  name: 'ExOrdersRow',
  components: {
    ExampleComponent,
    ExDocsToggle,
    OrdersRow,
  },
  data: () => ({
    orderIndex: 0,
    showMultipleOrders: false,
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
        type: 'Object',
        default: 'false',
        required: 'true',
        description: 'Object of order to be displayed',
      },
    ],
  }),
  computed: {
    ...mapStores(useOrdersStore),
  },
  methods: {
    cycleExamples() {
      if (this.orderIndex < this.ordersStore.orderSearchResults.length - 1) {
        this.orderIndex++;
      } else this.orderIndex = 0;
    },
  },
};
</script>

<style lang="scss" scoped></style>
