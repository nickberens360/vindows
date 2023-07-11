<template>
  <div>
    <v-row
      justify="space-between"
      align="center"
      class="mb-2"
    >
      <v-col
        v-if="!hideProductImage"
        class="d-flex align-center justify-center"
        style="flex: 1 0 130px; max-width: 130px;"
      >
        <ProductImage :show-image-label="item.type !== 'DN'" />
      </v-col>

      <v-col class="text-blue-dark">
        {{ item.description }}
      </v-col>

      <v-col
        v-if="item"
        class="text-right text-blue-dark"
      >
        {{ $currency(item.subTotal) }}
      </v-col>
    </v-row>
    <slot name="append" />
  </div>
</template>

<script>
import ProductImage from '@/components/orders/common/ProductImage';

export default {
  name: 'RefundItem',
  components: {ProductImage},
  provide() {
    return {
      orderItem: this.item,
    };
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    hideProductImage: {
      type: Boolean,
      default: false,
    },
    showItemReason: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>

</style>
