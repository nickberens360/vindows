<template>
  <v-sheet
    class="d-flex align-center justify-center"
    color="primary-lighten-5"
    height="290"
  >
    <div class="text-center">
      <img
        :src="transponderSrc"
        alt
      >
      <KeySku
        :order-items="items"
        hide-label
        :transaction-id="transactionId"
      >
        <template #content>
          <p
            v-for="(orderItem, i) in items"
            :key="orderItem.hillmanSku + i"
          >
            {{ orderItem.hillmanSku }}
          </p>
        </template>
      </KeySku>
    </div>
    <QuantityCircle
      label="Qty."
      :quantity="keyQuantity"
      :color="circleColor"
      size="lg"
      class="ml-8"
    />
  </v-sheet>
</template>

<script>

import QuantityCircle from '@/components/base/QuantityCircle';
import transponderSrc from '@/assets/mockImages/transponder.png';
import KeySku from '@/components/orders/fulfillment/KeySku';

export default {
  name: 'KeyQuantityCard',
  components: { KeySku, QuantityCircle },
  props: {
    items: {
      type: [String, Array],
      default: null,
    },
    quantity: {
      type: [String, Number],
      default: null,
    },
    circleColor: {
      type: String,
      default: 'primary-lighten-1',
    },
    transactionId: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      transponderSrc,
    };
  },
  computed: {
    keyQuantity() {
      return this.quantity || this.items.reduce((sum, item) => sum + item.quantity, 0);
    },
  },
};
</script>

<style
  scoped
  lang="scss"
>

</style>
