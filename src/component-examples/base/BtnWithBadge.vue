<template>
  <v-badge
    color="warning"
    :content="count"
    inline
    class="d-block text-white"
  >
    <v-btn
      class="order-2 ml-2 elevation-0"
      color="orange-lighten-1"
      height="44px"
      @click="$emit('coupon-btn-clicked')"
    >
      <span class="text-white">COUPON +</span>
    </v-btn>
  </v-badge>
</template>

<script>
export default {
  name: 'BtnWithBadge',
  props: {
    count: {
      type: [Number, String],
      default: 0,
    },
  },
  emits: ['coupon-btn-clicked'],
};
</script>

<style scoped lang="scss">
:deep(.v-badge__badge) {
  height: 44px;
  width: 44px;
  border-radius: 50%;
  display: flex;
  color: white !important;
  font-size: 20px;
}
</style>
