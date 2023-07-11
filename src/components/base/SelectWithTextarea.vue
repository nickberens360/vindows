<template>
  <v-expand-transition>
    <div v-if="isVisible">
      <VSelect
        v-model="selectedData.selected"
        :items="items"
        item-title="text"
        item-value="value"
        variant="outlined"
        density="compact"
        bg-color="white"
        class="meru-styled-select"
        :menu-props="{ contentClass: 'meru-styled-select-menu' }"
        :label="selectLabel"
        :rules="requiredSelect"
        @update:model-value="handleSelectChange"
      />
      <v-expand-transition>
        <VTextarea
          v-if="triggerItems.includes(selectedData.selected)"
          v-model="selectedData.textAreaData"
          :label="textAreaLabel"
          variant="outlined"
          dense
          class="meru-styled-text-area"
          bg-color="white"
          :rules="requiredTextArea"
        />
      </v-expand-transition>
    </div>
  </v-expand-transition>
</template>

<script>
export default {
  name: 'SelectWithTextarea',
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        selected: null,
        textAreaData: null,
      }),
    },
    items: {
      type: Array,
      default: () => [],
    },
    selectLabel: {
      type: String,
      default: 'Select',
    },
    textAreaLabel: {
      type: String,
      default: 'Comment',
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    itemId: {
      type: [String, Number],
      default: null,
    },
    triggerItems: {
      type: Array,
      default: () => ['other'],
    },
    selectRequired: {
      type: Boolean,
      default: false,
    },
    textAreaRequired: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:selection'],
  data: () => ({
    selectedData: {
      selected: null,
      textAreaData: null,
      itemId: null,
    },
    returnData: [],
  }),
  computed: {
    requiredSelect() {
      if (this.selectRequired) {
        return [(v) => !!v || '*Required'];
      } else {
        return [];
      }
    },
    requiredTextArea() {
      if (this.textAreaRequired) {
        return [(v) => !!v || '*Required'];
      } else {
        return [];
      }
    },
  },
  watch: {
    selectedData: {
      handler: function () {
        this.$emit('update:selection', this.selectedData);
      },
      deep: true,
    },
  },
  mounted() {
    this.selectedData = {
      selected: this?.modelValue.selected,
      textAreaData: this?.modelValue.textAreaData,
      itemId: this?.itemId,
    };
  },
  methods: {
    handleSelectChange() {
      this.selectedData.textAreaData = null;
    },
  },
};
</script>

<style scoped lang="scss">
.v-list-item-title {
  color: red !important;
}
</style>
