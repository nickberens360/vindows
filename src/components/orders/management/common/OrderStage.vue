<template>
  <v-tooltip
    :text="stageLabel"
    :disabled="props.showLabel"
  >
    <template #activator="{ props: tooltipProps }">
      <VSheet
        class="order-stage"
        v-bind="{ ...tooltipProps, ...$attrs}"
        :width="props.width"
        :height="props.height"
        :color="stageColor"
      >
        <slot
          v-if="props.showLabel || $slots.label"
          name="label"
          :label="stageLabel"
        >
          <span class="text-h4 text-white ml-6">{{ stageLabel }}</span>
        </slot>
      </VSheet>
    </template>
  </v-tooltip>
</template>
<script>
export default {
  inheritAttrs: false
};
</script>
<script setup>
import { inject } from 'vue';
import { useOrderStage } from '@/composables/orders/OrderStage';
const order = inject('order');
const {
  stageColor,
  stageLabel
} = useOrderStage(order);
const props = defineProps({
  showLabel: {
    type: Boolean,
    default: false
  },
  width: {
    type: [String, Number],
    default: '100%'
  },
  height: {
    type: [String, Number],
    default: '64px'
  }
});
</script>
<style lang="scss" scoped>
.order-stage {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
