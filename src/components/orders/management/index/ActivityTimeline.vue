<template>
  <div class="order-activity-timeline pl-12 pt-4">
    <ActivityCard
      v-if="captureItem"
      :item="captureItem"
      class="mb-6"
    />
    <span v-if="refundItems.length">
      <ActivityCard
        v-for="refundItem in refundItems"
        :key="refundItem.id"
        :item="refundItem"
        class="mb-6"
      />
    </span>
  </div>
</template>

<script>
import ActivityCard from '@/components/orders/management/index/ActivityCard.vue';
export default {
  name: 'OrderActivityTimeline',
  components: { ActivityCard },
  props: {
    orderActivity: {
      type: Object,
      required: true,
    },
  },
  computed: {
    captureItem() {
      return this.orderActivity.find((item) => item.type === 'Capture');
    },
    refundItems() {
      return this.orderActivity.filter((item) => item.type === 'Refund');
    },
  },
};
</script>

<style scoped lang="scss">
.order-activity-timeline {
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 14px;
    width: 2px;
    height: 100%;
    background-color: #adadad;
  }
}
</style>
