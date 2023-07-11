<template>
  <v-card
    class="item-row d-flex flex-shrink-0 py-4 rounded-0"
    :class="{ 'is-selected': itemSelected, 'is-refunded': itemRefunded }"
    flat
    :ripple="false"
  >
    <v-row
      class="px-1"
      dense
    >
      <v-col
        v-if="$slots['left-col']"
        class="d-flex align-center flex-grow-0 ml-5"
      >
        <slot name="left-col" />
      </v-col>

      <v-col
        v-if="$slots['center-col']"
        class="d-flex align-center mx-1"
      >
        <slot name="center-col" />
      </v-col>

      <v-col
        v-if="$slots['right-col']"
        class="d-flex flex-grow-0 mr-1"
      >
        <v-row
          class="flex-nowrap align-center mr-5"
          no-gutters
        >
          <slot name="right-col" />
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'ItemRow',
  props: {
    itemRefunded: {
      type: Boolean,
      default: false,
    },
    itemSelected: {
      type: Boolean,
      default: false,
    },
    borderless: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    borderStyle() {
      return this.borderless ? 'none' : '1px solid rgb(var(--v-theme-grey-lighten-3))';
    },
  },
};
</script>
<style lang="scss" scoped>
.item-row {
  background-color: white;
  border-bottom: v-bind(borderStyle) !important;
  min-height: 100px;
  transition: background-color 0.25s;
  &:hover {
    background-color: rgb(var(--v-theme-grey-lighten-4)) !important;
  }
  &.is-selected {
    background-color: rgb(var(--v-theme-grey-lighten-2)) !important;
    &:hover {
      background-color: rgb(var(--v-theme-blue-grey-lighten-4), 0.7) !important;
    }
  }
  &.is-refunded {
    background-color: rgb(var(--v-theme-error-lighten-5)) !important;
    &:hover {
      background-color: rgb(var(--v-theme-error-lighten-4)) !important;
    }
  }
}
</style>
