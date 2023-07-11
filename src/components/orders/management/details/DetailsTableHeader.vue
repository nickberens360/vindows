<template>
  <section class="details-table-header">
    <v-toolbar
      class="px-4"
      color="blue-grey-lighten-5"
      height="72"
    >
      <v-row>
        <v-col
          cols="2"
          class="d-flex align-center pl-7"
        >
          <v-chip
            class="text-white"
            color="primary"
            variant="elevated"
          >
            {{ numberOfItems }}
          </v-chip>
          <span
            class="text-h4 text-blue-grey-lighten-2 font-weight-medium ml-4"
          >
            Items
          </span>
        </v-col>
        <v-col class="d-flex text-body-1">
          <v-row class="align-center justify-end">
            <LabelValue
              class="mr-5 py-2"
              :class="{ 'text-red': shippingRefunded }"
              :value="$currency(shippingTotal)"
              variant="light-label"
            >
              <template #label>
                <span class="text-blue-grey-lighten-2 mr-5">
                  Shipping
                  <span
                    v-if="shippingRefunded"
                    class="text-red"
                  >
                    (Refunded)
                  </span>
                </span>
              </template>
            </LabelValue>
            <LabelValue
              class="mx-5 py-2"
              label="Subtotal"
              :value="$currency(subTotal)"
              variant="light-label"
            />
            <LabelValue
              v-if="order.payment.type !== 'cash'"
              class="mx-5 py-2"
              label="Taxes"
              :value="$currency(tax)"
              variant="light-label"
            />
            <LabelValue
              class="mx-5 py-2"
              label="Discounts"
              :value="$currency(couponTotal)"
              variant="light-label"
            />
            <v-icon
              v-if="currency === 'CAD'"
              class="mr-1"
              color="red"
              icon="fab fa-canadian-maple-leaf"
            />
            <LabelValue
              class="mr-5 py-2"
              label="Total"
              :value="$currency(total)"
              variant="light-label"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-toolbar
      v-if="!orderRefundComplete"
      color="blue-grey-lighten-4"
      height="62"
    >
      <v-spacer />
      <span
        v-if="orderRefundable"
        class="refund-order d-flex align-center text-blue-grey-lighten-2 text-caption-2"
      >
        Refund All
        <v-checkbox
          class="meru-styled-checkbox ml-4"
          hide-details
          :model-value="allItemsSelected"
          :ripple="false"
          true-icon="fas fa-check"
          @click="$emit('refundAllChecked')"
        />
      </span>
      <span
        v-else
        class="order-disabled-refund"
      >
        <HoverableIcon
          class="mr-4"
          card-title-color="red"
        >
          <template #card-title>Not Refundable</template>
          <template #card-content>
            {{ ineligibleRefundReason }}
          </template>
        </HoverableIcon>
        <v-icon
          color="red"
          icon="fas fa-square-xmark"
          size="40"
          style="cursor: not-allowed"
        />
      </span>
    </v-toolbar>
  </section>
</template>

<script>
import { inject } from 'vue';
import { mapStores } from 'pinia';
import { useOrdersStore } from '@/store/orders';
import { useOrderTotals } from '@/composables/orders/OrderTotals';
import { useTransactionInfo } from '@/composables/orders/TransactionInfo';
import HoverableIcon from '@/components/base/HoverableIcon';
import LabelValue from '@/components/base/LabelValue';

export default {
  name: 'DetailsTableHeader',
  components: {
    HoverableIcon,
    LabelValue,
  },
  props: {
    allItemsSelected: {
      type: Boolean,
    },
    numberOfItems: {
      type: Number,
      default: 0,
    },
  },
  emits: ['refundAllChecked'],
  setup() {
    const order = inject('order');
    const { couponTotal, currency, shippingTotal, subTotal, tax, total } =
      useOrderTotals(order);
    const { kioskRefundable, paymentTypeRefundable } =
      useTransactionInfo(order);
    return {
      couponTotal,
      currency,
      kioskRefundable,
      order,
      paymentTypeRefundable,
      shippingTotal,
      subTotal,
      tax,
      total,
    };
  },
  computed: {
    ...mapStores(useOrdersStore),
    ineligibleRefundReason() {
      if (!this.kioskRefundable) {
        return 'Kiosk does not support refunds';
      } else if (!this.paymentTypeRefundable) {
        const { type } = this.order.payment;
        const paymentType = type.at(0).toUpperCase() + type.slice(1);
        return `${paymentType} transactions are not refundable`;
      }
      return 'Refund cannot be processed';
    },
    orderRefundable() {
      return this.kioskRefundable && this.paymentTypeRefundable;
    },
    orderRefundComplete() {
      return this.order.items.every(
        (item) => !!item.refunds.length >= item.quantity
      );
    },
    shippingRefunded() {
      return this.ordersStore.getIsShippingRefunded;
    },
  },
};
</script>

<style lang="scss" scoped>
.details-table-header {
  border-top: 1px solid rgb(var(--v-theme-grey-lighten-3)) !important;
  box-shadow: 0px 4px 4px -1px rgba(0, 0, 0, 0.3) !important;
  position: sticky;
  top: 0;
  z-index: 10;
  .refund-order {
    margin-right: 23px;
  }
  .order-disabled-refund {
    margin-right: 24px;
  }
}
</style>
