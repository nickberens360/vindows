<template>
  <v-card
    class="pa-6 rounded-0"
  >
    <v-row justify="space-between">
      <v-col cols="2">
        <slot name="left">
          <ProductImage v-if="sku" />
        </slot>
      </v-col>
      <v-col class="pl-8">
        <slot name="center">
          <KeySku
            :order-items="items"
          />
          <KeyOrderDate
            :timestamp="date"
            variant="small"
            hide-transaction-id
          />
        </slot>
      </v-col>
      <v-col>
        <slot name="right">
          <DetailLabelValue
            primary-label="Qty."
            :primary-value="quantity"
            variant="bold"
          />
          <DetailLabelValue
            primary-label="TID"
            :primary-value="transactionId"
            variant="small"
          />
        </slot>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

import DetailLabelValue from '@/components/base/DetailLabelValue';
import ProductImage from '@/components/orders/common/ProductImage';
import transponderSrc from '@/assets/mockImages/transponder.png';
import KeySku from '@/components/orders/fulfillment/KeySku';
import KeyOrderDate from '@/components/orders/fulfillment/KeyOrderDate';

export default {
  name: 'ItemDetailsCard',
  components: { KeyOrderDate, KeySku, ProductImage, DetailLabelValue },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    date: {
      type: String,
      default: '',
    },
    quantity: {
      type: [String, Number],
      default: '',
    },
    transactionId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loaded: false,
      transponderSrc,
    };
  },
  mounted() {
    this.loaded = true;
  },
};
</script>

<style scoped>
@import "@/scss/injectable/transitions.scss";
</style>
