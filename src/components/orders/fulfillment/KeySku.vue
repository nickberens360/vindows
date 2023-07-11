<template>
  <DetailLabelValue
    :primary-label="!hideLabel ? skuLabel : ''"
    :primary-value="skuValue"
    variant="bold"
    :secondary-label="transactionIdLabel"
    :secondary-value="transactionIdValue"
  >
    <template #primary-value>
      <slot name="content" />
    </template>
    <template
      v-if="hasMultipleSkus"
      #primary-label-append
    >
      <HoverableIcon
        class="d-inline-flex"
        card-title-color="primary"
        origin="bottom start"
      >
        <template #icon>
          <v-avatar
            size="24"
            color="primary"
            class="text-caption font-weight-bold"
          >
            {{ orderItems.length }}
          </v-avatar>
        </template>
        <template #card-title>
          <span>Multiple SKUs</span>
        </template>
        <template #card-content>
          <span
            class="key-sku__card-skus text-body-3 font-weight-bold"
          >
            {{ tooltipSkus }}
          </span>
        </template>
      </HoverableIcon>
    </template>
  </DetailLabelValue>
</template>

<script>
import DetailLabelValue from '@/components/base/DetailLabelValue';
import HoverableIcon from '@/components/base/HoverableIcon';
export default {
  name: 'KeySku',
  components: { HoverableIcon, DetailLabelValue },
  props: {
    orderItems: {
      type: Array,
      default: null,
    },
    transactionId: {
      type: String,
      default: null,
    },
    hideTransactionId: {
      type: Boolean,
      default: false,
    },
    hideLabel: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasMultipleSkus() {
      return this.orderItems.length > 1;
    },
    skuLabel() {
      return !this.hideLabel ? (this.hasMultipleSkus ? 'SKUs' : 'SKU') : '';
    },
    skuValue() {
      return this.hasMultipleSkus ? 'Multiple' : this?.orderItems[0]?.hillmanSku || '';
    },
    tooltipSkus() {
      return this.orderItems.map(sku => sku.hillmanSku).join(', ');
    },
    transactionIdLabel() {
      return !this.hideTransactionId ? 'TID' : '';
    },
    transactionIdValue() {
      return !this.hideTransactionId ? this.transactionId : '';
    },
  },
};
</script>

<style
  scoped
  lang="scss"
>

</style>
