<template>
  <ItemRow
    class="text-blue-dark"
    v-bind="$props"
  >
    <template #left-col>
      <ProductImage
        class="item-image-col"
        :show-image-label="orderItem.type !== 'DN'"
      />
    </template>
    <template #center-col>
      <v-row class="px-2">
        <v-col class="d-flex align-center">
          {{ orderItem.description }}
        </v-col>
        <v-col>
          <ItemCustomization />
        </v-col>
      </v-row>
    </template>
    <template #right-col>
      <v-col class="mr-2">
        <div
          class="item-price-col text-end"
          :class="{ 'text-red font-weight-bold': itemRefunded }"
        >
          {{ $currency(orderItem.total) }}
        </div>
      </v-col>
      <v-col class="item-discounts-col mx-2 px-1">
        <HoverableIcon
          v-if="orderItem.discounts.length"
          card-title-color="orange"
        >
          <template #icon>
            <v-icon
              class="icon-duotone-coupon"
              size="20"
              icon="fad fa-ticket"
            />
          </template>
          <template #card-title>
            {{ discountsCardTitle }}
          </template>
          <template #card-content>
            <div
              v-for="(discountCode, i) in orderItem.discounts"
              :key="i + discountCode"
            >
              {{ discountCode }}
            </div>
          </template>
        </HoverableIcon>
      </v-col>
      <v-col
        class="item-checkbox-label-col d-flex justify-end pr-1"
        :class="{ 'justify-center': itemRefunded }"
      >
        <HoverableIcon v-if="itemRefunded">
          <template #icon>
            <v-icon
              size="20"
              color="primary-lighten-1"
              icon="fas fa-circle-info"
            />
          </template>
          <template #card>
            <RefundDetailsCard
              :amount="orderItem.refunds[0].amount"
              :notes="orderItem.refunds[0].notes"
              :reason="orderItem.refunds[0].reason"
              :timestamp="orderItem.refunds[0].timestamp"
              :username="orderItem.refunds[0].username"
            />
          </template>
        </HoverableIcon>
        <span
          v-else-if="itemRefundable"
          class="text-blue-grey-lighten-2 text-caption-2"
        >
          Refund
        </span>
      </v-col>
      <v-col class="item-checkbox-col ml-4">
        <v-checkbox
          v-if="itemRefundable"
          class="meru-styled-checkbox"
          :class="{ 'meru-disabled-selected-checkbox': itemRefunded }"
          :disabled="itemRefunded"
          hide-details
          :model-value="itemSelected || itemRefunded"
          :ripple="false"
          true-icon="fas fa-check"
          @click="$emit('checkItem', orderItem.id)"
        />
      </v-col>
    </template>
  </ItemRow>
</template>

<script>
import { computed } from 'vue';
import { useOrdersStore } from '@/store/orders';
import { usePaymentInfo } from '@/composables/orders/PaymentInfo';
import ItemRow from '@/components/base/ItemRow';
import HoverableIcon from '@/components/base/HoverableIcon';
import ItemCustomization from '@/components/orders/management/details/ItemCustomization.vue';
import ProductImage from '@/components/orders/common/ProductImage';
import RefundDetailsCard from '@/components/orders/management/details/RefundDetailsCard';

export default {
  name: 'DetailsItemRow',
  components: {
    HoverableIcon,
    ItemRow,
    ItemCustomization,
    ProductImage,
    RefundDetailsCard,
  },
  provide() {
    return {
      orderItem: computed(() => this.orderItem),
    };
  },
  props: {
    orderItem: {
      type: Object,
      required: true,
    },
    itemRefundable: {
      type: Boolean,
      required: true,
    },
    itemRefunded: {
      type: Boolean,
      required: true,
    },
    itemSelected: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['checkItem'],
  setup() {
    const { orderDetails: order } = useOrdersStore();
    const { cardIssuer, pan, paymentType } = usePaymentInfo(order);
    return { cardIssuer, pan, paymentType };
  },
  computed: {
    discountsCardTitle() {
      return this.orderItem.discounts.length > 1
        ? 'Discount Codes'
        : 'Discount Code';
    },
  },
};
</script>

<style lang="scss" scoped>
.item-image-col {
  width: 140px; // Maintains column width for SKU length variations
}
.item-price-col {
  width: 60px; // Allows for 6 digits in the price, ex: 1000.99
}
.item-discounts-col {
  width: 20px; // Maintains column width when icon is not displayed
}
.item-checkbox-label-col {
  width: 55px; // Maintains column width when checkbox label is not displayed
}
.item-checkbox-col {
  width: 34px; // Maintains column width when checkbox is not displayed
}
</style>
