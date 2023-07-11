<template>
  <div class="product-customization text-blue-dark text-body-1">
    <div
      v-if="isOmniProduct"
      class="d-flex align-center"
    >
      <v-sheet
        :color="textColor"
        width="26"
        height="26"
        rounded
        class="flex-shrink-0 mr-3 color-preview-outline"
      />

      <div class="omni-text">
        {{ rawFrontText }}
      </div>
    </div>

    <div v-else-if="isCustomizableProduct">
      <div class="d-flex align-center mb-1">
        <VIcon
          icon="fas fa-bring-forward"
          size="20"
          color="blue-grey-lighten-2"
          class="mr-3"
        />

        <div v-if="frontSideTextLines.length">
          <div
            v-for="(line, index) in frontSideTextLines"
            :key="index"
          >
            {{ line }}
          </div>
        </div>
        <span
          v-else
          class="text-blue-grey-lighten-1"
        >No Front Text</span>
      </div>
      <div class="d-flex align-center">
        <VIcon
          icon="fas fa-send-backward"
          size="20"
          color="blue-grey-lighten-2"
          class="mr-3"
        />

        <div v-if="backSideTextLines.length">
          <div
            v-for="(line, index) in backSideTextLines"
            :key="index"
          >
            {{ line }}
          </div>
        </div>
        <span
          v-else
          class="text-blue-grey-lighten-1"
        >No Back Text</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject } from 'vue';
import { useItemCustomization } from '@/composables/orders/ItemCustomization';

const orderItem = inject('orderItem');
const {
  isOmniProduct,
  isCustomizableProduct,
  rawFrontText,
  frontSideTextLines,
  backSideTextLines,
  textColor,
} = useItemCustomization(orderItem);
</script>
<style lang="scss" scoped>
.color-preview-outline {
  border: 3px solid rgb(var(--v-theme-primary-lighten-3));
}
.omni-text {
  word-break: break-all;
}
</style>
