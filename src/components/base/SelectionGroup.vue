<template>
  <div class="selection-group">
    <v-toolbar
      v-if="!hideSelectAll"
      class="pr-16 mb-2"
      color="blue-grey-lighten-5"
      height="72"
    >
      <template #append>
        <v-checkbox
          v-model="isAllSelected"
          class="meru-styled-checkbox pr-1"
          true-icon="fas fa-check"
          :ripple="false"
          hide-details
        >
          <label class="text-blue-grey mr-2 text-caption">Select&nbsp;All</label>
        </v-checkbox>
      </template>
    </v-toolbar>
    <transition-group
      name="list"
      tag="div"
    >
      <ItemRow
        v-for="item in items"
        :key="item[itemKey]"
        :class="{'selected': isItemSelected(item)}"
        class="flex items-center"
        borderless
      >
        <template #left-col>
          <slot
            name="left"
            :item="item"
          />
        </template>
        <template #center-col>
          <slot
            name="center"
            :item="item"
          />
        </template>
        <template
          #right-col
        >
          <slot
            name="right"
          />
          <div v-if="!hideCheckbox">
            <label
              :for="item[itemKey]"
              class="text-blue-grey mr-2 text-caption"
            >
              {{ selectLabel }}
            </label>
            <v-checkbox
              :id="item[itemKey]"
              v-model="selectedItems"
              :true-value="item"
              multiple
              class="meru-styled-checkbox mr-6"
              true-icon="fas fa-check"
              :ripple="false"
              hide-details
            />
          </div>
        </template>
      </ItemRow>
    </transition-group>
  </div>
</template>

<script>
import ItemRow from '@/components/base/ItemRow';

export default {
  name: 'SelectionGroup',
  components: { ItemRow },
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    selectLabel: {
      type: String,
      default: 'Select',
    },
    selectedItemBgColor: {
      type: String,
      default: 'primary-lighten-4',
    },
    itemKey: {
      type: String,
      default: 'id',
    },
    hideSelectAll: {
      type: Boolean,
      default: false,
    },
    hideCheckbox: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:model-value'],
  computed: {
    selectedItemBgColorStyle() {
      return `rgb(var(--v-theme-${this.selectedItemBgColor}))`;
    },
    selectedItems: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:model-value', value);
      }
    },
    isAllSelected: {
      get() {
        return this.items.every(item => this.modelValue.includes(item));
      },
      set(value) {
        this.selectedItems = !value ? [] : [...this.items];
      }
    },
  },
  methods: {
    isItemSelected(item) {
      return this.selectedItems.some(selectedItem => selectedItem[this.itemKey] === item[this.itemKey]);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/injectable/transitions.scss";
.selected {
  background: v-bind(selectedItemBgColorStyle);
  &:hover {
    background: v-bind(selectedItemBgColorStyle) !important;
  }
}
</style>
