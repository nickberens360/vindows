<template>
  <div>
    <TransactionInfoCard
      :order-item="order"
      variant="detailed-with-btn"
      class="mb-6"
    />
    <CustomerInfoCard
      :order="order"
      class="mb-6"
    />
    <ShippingInfo
      :order="order"
      class="mb-6"
    />
  </div>
</template>

<script>
import CustomerInfoCard from '@/components/orders/management/common/CustomerInfoCard.vue';
import ShippingInfo from '@/components/orders/management/common/ShippingInfo.vue';
import TransactionInfoCard from '@/components/orders/management/common/TransactionInfoCard.vue';

export default {
  name: 'SummaryGroup',
  components: {
    CustomerInfoCard,
    ShippingInfo,
    TransactionInfoCard,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
