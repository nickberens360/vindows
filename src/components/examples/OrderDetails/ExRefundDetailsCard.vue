<template>
  <ExampleComponent
    name="RefundDetailsCard"
    file-path="@/components/compound/OrderDetails/RefundDetailsCard.vue"
  >
    <RefundDetailsCard
      :amount="amount"
      :notes="note"
      :reason="reason"
      :timestamp="timestamp"
      :username="username"
    />
    <template #actions>
      <v-btn
        class="mb-6"
        @click="orderTypeIsCredit = !orderTypeIsCredit"
      >
        {{ orderTypeIsCredit ? "Show Cash Order" : "Show Credit Order" }}
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
              <ExDocsSelect
                v-if="item.raw.name === 'username'"
                v-model="username"
                :items="usernames"
                label="username"
              />
              <ExDocsSelect
                v-if="item.raw.name === 'timestamp'"
                v-model="timestamp"
                :items="timestamps"
                label="timestamp"
              />
              <ExDocsSelect
                v-if="item.raw.name === 'reason'"
                v-model="reason"
                :items="reasons"
                label="reason"
              />
              <ExDocsSelect
                v-if="item.raw.name === 'amount'"
                v-model="amount"
                :items="amounts"
                label="amount"
              />
              <ExDocsSelect
                v-if="item.raw.name === 'paymentType'"
                v-model="paymentType"
                :items="paymentTypes"
                label="paymentType"
              />
              <ExDocsSelect
                v-if="item.raw.name === 'cardIssuer'"
                v-model="cardIssuer"
                :items="cardIssuers"
                label="cardIssuer"
              />
              <ExDocsSelect
                v-if="item.raw.name === 'pan'"
                v-model="pan"
                :items="pans"
                label="pan"
              />
              <ExDocsSelect
                v-if="item.raw.name === 'notes'"
                v-model="note"
                :items="notes"
                label="notes"
              />
            </template>
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
import ExDocsSelect from '@/components/examples/ExDocs/ExDocsSelect';
import ExDocsToggle from '@/components/examples/ExDocs/ExDocsToggle';
import RefundDetailsCard from '@/components/orders/management/details/RefundDetailsCard';

export default {
  name: 'ExRefundDetailsCard',
  components: {
    ExampleComponent,
    ExDocsSelect,
    ExDocsToggle,
    RefundDetailsCard,
  },
  provide() {
    return {
      order: computed(() =>
        this.orderTypeIsCredit ? this.mockCreditOrder : this.mockCashOrder
      ),
    };
  },
  data: () => ({
    orderTypeIsCredit: true,
    amount: 6.0,
    note: 'customer disliked the color',
    reason: 'Unsatisfactory Product',
    timestamp: '1999-04-01',
    username: 'abelliveau',
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
        name: 'amount',
        type: 'Number',
        default: '<none>',
        required: 'true',
        description: 'The amount of the refund',
      },
      {
        name: 'notes',
        type: 'String',
        default: '" "',
        required: 'false',
        description: 'Notes for the refund reason',
      },
      {
        name: 'reason',
        type: 'String',
        default: '<none>',
        required: 'true',
        description: 'The reason for the refund',
      },
      {
        name: 'timestamp',
        type: 'String',
        default: '<none>',
        required: 'true',
        description: 'The timestamp of the refund',
      },
      {
        name: 'username',
        type: 'String',
        default: '<none>',
        required: 'true',
        description: 'The username of the refunder',
      },
    ],
    mockCreditOrder: {
      payment: {
        type: 'card',
        card: {
          cardHolder: 'Nick Berens',
          pan: '476173*0119',
          expirationDate: '2022-12-31',
          issuer: 'Visa',
          processor: 'Stub',
        },
      },
    },
    mockCashOrder: {
      payment: {
        type: 'cash',
      },
    },
    amounts: [
      {
        label: '6',
        value: 6.0,
      },
      {
        label: '11.49',
        value: 11.49,
      },
      {
        label: '888.98',
        value: 888.98,
      },
    ],
    notes: [
      {
        label: 'short note',
        value: 'customer disliked the color',
      },
      {
        label: 'long note',
        value:
          'some long reason as to why they did not like their product and called in to get a refund for it',
      },
    ],
    reasons: [
      {
        label: 'Unsatisfactory product',
        value: 'Unsatisfactory Product',
      },
      {
        label: 'Other',
        value: 'Other',
      },
    ],
    timestamps: [
      {
        label: '1999-04-01',
        value: '1999-04-01',
      },
      {
        label: '2010-01-02',
        value: '2010-01-02',
      },
      {
        label: '2020-03-05',
        value: '2020-03-05',
      },
    ],
    usernames: [
      {
        label: 'nberens',
        value: 'nberens',
      },
      {
        label: 'bhern',
        value: 'bhern',
      },
      {
        label: 'aBelliveau',
        value: 'aBelliveau',
      },
    ],
  }),
};
</script>

<style lang="scss" scoped></style>
