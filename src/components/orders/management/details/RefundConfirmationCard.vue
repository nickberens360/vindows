<template>
  <div class="confirmation-card d-flex flex-column justify-space-between">
    <div class="confirmation-card__content py-4 px-8 ">
      <div class="text-center pb-4">
        <v-icon
          class="icon-duotone-eye"
          size="80"
          icon="fad fa-eye"
        />
        <p class="font-weight-bold text-body-3 text-primary">
          Looking Good?
        </p>
      </div>

      <RefundItem
        v-for="(refundItem) in items"
        :key="refundItem.itemId"
        :item="refundItem"
        class="mb-2"
        hide-product-image
      />
      <v-divider class="mb-6" />
      <v-table class="confirmation__table bg-transparent  text-blue-dark">
        <tr v-if="showShipping">
          <th>Shipping:</th>
          <td>{{ $currency(shipping) }}</td>
        </tr>
        <tr>
          <th>Taxes:</th>
          <td>{{ $currency(taxes) }}</td>
        </tr>
        <tr class="confirmation__total">
          <th>Total:</th>
          <td>{{ $currency(total) }}</td>
        </tr>
      </v-table>
    </div>

    <div
      class="confirmation-card__footer elevation-5 pa-4 bg-primary-lighten-5"
    >
      <v-expand-transition>
        <ReceiptForms
          v-if="sendReceipt"
          hide-success-animation
          :session="order?.session"
          :customer="order?.customer"
          submit-button-text="Yes, Refund"
          @receipt-submission-complete="$emit('form-confirmation-complete')"
          @receipt-submission-cancelled="$emit('form-confirmation-cancelled')"
        />
      </v-expand-transition>
      <v-row
        justify="end"
        align="center"
      >
        <v-col>
          <v-checkbox
            label="Send Receipt"
            hide-details
            @change="sendReceipt = !sendReceipt"
          />
        </v-col>
        <v-col
          v-if="!sendReceipt"
          class="flex-grow-0"
        >
          <v-btn
            color="primary"
            variant="outlined"
            @click="$emit('form-confirmation-cancelled')"
          >
            Cancel
          </v-btn>
        </v-col>
        <v-col
          v-if="!sendReceipt"
          class="flex-grow-0"
        >
          <v-btn
            color="primary"
            @click="$emit('form-confirmation-complete')"
          >
            Yes, Refund
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import RefundItem from '@/components/orders/management/details/RefundItem';
import ReceiptForms from '@/components/orders/management/common/ReceiptForms.vue';

import {inject} from 'vue';
export default {
  name: 'RefundConfirmationCard',
  components: {
    ReceiptForms,
    RefundItem
  },
  props: {
    items: {
      type: Object,
      default: () => ({}),
    },
    showShipping: {
      type: Boolean,
      default: false,
    },
    shipping: {
      type: [Number, String],
      default: '',
    },
    taxes: {
      type: [Number, String],
      default: '',
    },
    total: {
      type: [Number, String],
      default: '',
    },
  },
  emits: [
    'form-confirmation-complete',
    'form-confirmation-cancelled',
  ],
  setup() {
    const order = inject('order');
    return {
      order,
    };
  },
  data() {
    return {
      sendReceipt: false,
    };
  },
};
</script>

<style scoped lang="scss">

.confirmation-card {
  height: 100%;
}

.confirmation-card__content {
  max-width: 368px;
  width: 100%;
  margin: 0 auto;
}

.confirmation__table {
  display: flex;
  justify-content: flex-end;
  th {
    font-weight: 400;
  }
  td {
    padding-left: 30px;
    font-weight: 600;
  }
  th, td {
    padding-bottom: 8px;
    text-align: right;
  }
}

.confirmation__total {
  td {
    font-size: 22px;
    font-weight: 700;
  }
}

.confirmation-card__footer {
  position: sticky;
  bottom: 0;
}

</style>
