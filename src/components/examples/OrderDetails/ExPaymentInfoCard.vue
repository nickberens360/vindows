<template>
  <ExampleComponent
    name="PaymentInfoCard"
    file-path="@components/compound/orderDetails/PaymentInfoCard.vue"
  >
    <PaymentInfoCard
      :sub-total="refundSubtotal"
      :tax-total="refundTaxTotal"
      :shipping-total="refundShippingCost"
      :total="refundTotal"
      :is-form-valid="refundFormValid"
      :show-include-shipping="shippingIncluded"
      @include-shipping="handleIncludeShippingChanged"
      @submit-initiated="handleSubmitInitiated"
    />
    <dl class="my-5 d-inline-flex bg-primary-lighten-5 px-4 py-2 rounded mt-5">
      <dt class="mr-2">
        Emitted Value:
      </dt>
      <dd class="font-weight-bold">
        {{ emitValue }}
      </dd>
    </dl>
    <ExDocsToggle
      title="Props"
      class="mt-4"
    >
      <template #content>
        <v-data-table
          :headers="propsHeaders"
          :items="propItems"
          hide-default-footer
          class="elevation-2 mt-4"
        >
          <template #[`item.controls`]="{ item }">
            <v-checkbox
              v-if="item.raw.name === 'isFormValid'"
              v-model="refundFormValid"
              label="Simulate Form Valid"
              hide-details
            />
            <v-checkbox
              v-else-if="item.raw.name === 'shippingIncluded'"
              v-model="shippingIncluded"
              label="Toggle Include Shipping Checkbox"
              hide-details
            />
          </template>
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
import PaymentInfoCard from '@/components/compound/orders/PaymentInfoCard';
import { mockOrderDetails } from '@/services/mockDataService';
import ExDocsToggle from '@/components/examples/ExDocs/ExDocsToggle';
import {computed} from 'vue';
export default {
  name: 'ExPaymentInfoCard',
  components: {ExDocsToggle, PaymentInfoCard, ExampleComponent},
  provide() {
    return {
      order: computed(() => this.order)
    };
  },
  data() {
    return {
      includeShipping: false,
      refundFormValid: false,
      shippingIncluded: true,
      order: null,
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
      emitValue: false,
      propItems: [
        {
          name: 'subTotal',
          type: '[String, Number]',
          default: '0',
          required: 'True',
          description: 'Order subtotal.',
        },
        {
          name: 'taxTotal',
          type: '[String, Number]',
          default: '0',
          required: 'True',
          description: 'Order tax total.',
        },
        {
          name: 'shippingTotal',
          type: '[String, Number]',
          default: '0',
          required: 'True',
          description: 'Order shipping total.',
        },
        {
          name: 'total',
          type: '[String, Number]',
          default: '0',
          required: 'True',
          description: 'Order total.',
        },
        {
          name: 'isFormValid',
          type: 'Boolean',
          default: 'false',
          required: 'True',
          description: 'Checks if the parent form is valid.',
        },
        {
          name: 'shippingIncluded',
          type: 'Boolean',
          default: 'false',
          required: 'True',
          description: 'If true, display the include shipping checkbox.',
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
          description: 'Emits true when the submit button is clicked.',
        },
        {
          name: '@include-shipping',
          type: 'Boolean',
          description: 'Emits true when the include shipping checkbox is checked.',
        },

      ],
    };
  },
  computed: {
    orderItems() {
      return this?.order?.items || [];
    },
    refundShippingCost() {
      return this?.order?.payment?.shippingTotal || 0;
    },
    refundSubtotal() {
      let sum = 0;
      this.orderItems.forEach(item => (sum += item.price * item.quantity));
      return sum;
    },
    refundTaxTotal() {
      let sum = 0;
      this.orderItems.forEach(item => (sum += item.tax * item.quantity));
      if (this.includeShipping) {
        sum +=
          this.order.payment.shippingTotal * this.order.payment.shippingTaxRate;
      }
      return sum;
    },
    refundTotal() {
      if (this.includeShipping) {
        return (
          this.refundTaxTotal + this.refundSubtotal + this.refundShippingCost
        );
      } else {
        return this.refundTaxTotal + this.refundSubtotal;
      }
    }
  },
  mounted() {
    this.order = Object.assign({}, mockOrderDetails);
  },
  methods: {
    handleIncludeShippingChanged(includeShipping) {
      this.includeShipping = includeShipping;
    },
    handleSubmitInitiated(value) {
      this.emitValue = value;
    },
  },
};
</script>

<style scoped>

</style>
