<template>
  <ExampleComponent
    name="ReceiptsForm"
    file-path="@components/compound/OrderDetails/ReceiptsForm.vue"
  >
    <ReceiptForms
      :session="order?.session"
      :customer="order?.customer"
      class="pb-4"
      style="max-width: 350px; margin: 0 auto;"
      @receipt-submission-complete="submissionComplete = true"
    />
    <ExDocsToggle title="Props">
      <template #content>
        <v-data-table
          :headers="propHeaders"
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
import ExampleComponent from '@/components/compound/ExampleComponent';
import ReceiptForms from '@/components/compound/orders/ReceiptForms';
import { mockOrderDetails } from '@/services/mockDataService';
import ExDocsToggle from '@/components/examples/ExDocs/ExDocsToggle';

export default {
  name: 'ExReceiptsForm',
  components: {ExDocsToggle, ReceiptForms, ExampleComponent},
  data() {
    return {
      order: null,
      submissionComplete: false,
      propHeaders: [
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
      ],
      propItems: [
        {
          name: 'customer',
          type: 'Object',
          default: 'null',
          required: 'true',
          description: 'The customer object of the order',
        },
        {
          name: 'sessionId',
          type: 'String',
          default: 'null',
          required: 'true',
          description: 'The session ID of the order',
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
          name: '@receipt-submission-complete',
          type: 'Boolean',
          description: 'Emitted when the receipt submission is complete.',
        },
      ],
    };
  },
  mounted() {
    this.initMockData();
  },
  methods: {
    initMockData() {
      this.order = mockOrderDetails;
    },
  },
};
</script>

<style scoped>

</style>
