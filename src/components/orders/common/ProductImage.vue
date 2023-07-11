<template>
  <v-sheet
    class="d-inline-block pa-2 text-center"
    style="background-color: inherit"
  >
    <v-img
      :width="props.imgWidth"
      class="mb-3 text-center"
      :src="`${store.config.skuImageBaseUrl}${orderItem.sku}`"
    />
    <span
      v-if="props.showImageLabel"
      class="text-body-1 text-no-wrap text-lowercase text-blue-grey-lighten-1"
    >
      {{ orderItem.sku }}
    </span>
  </v-sheet>
</template>

<script setup>
import { inject } from 'vue';
import { useAppStore } from '@/store/app';
const orderItem = inject('orderItem');
const store = useAppStore();
const props = defineProps({
  showImageLabel: {
    type: Boolean,
    default: true,
  },
  imgWidth: {
    type: [Number, String],
    default: 65,
  },
});
</script>

<style lang="scss" scoped></style>
