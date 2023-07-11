<template>
  <v-select
    v-model="value"
    :items="items"
    item-title="label"
    item-value="value"
    :label="label"
    variant="solo"
    class="my-4"
    hide-details
  />
</template>

<script>
export default {
  name: 'ExDocsSelect',
  props: {
    label: {
      type: String,
      default: 'Label',
      required: false,
    },
    items: {
      type: Array,
      default: () => [],
      required: false,
    },
    activeValue: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      value: '',
    };
  },
  watch: {
    value(newValue) {
      this.$emit('update:modelValue', newValue);
    },
    activeValue(newValue) {
      if (newValue !== this.value) {
        this.value = newValue;
      }
    },
  },
};
</script>

<style scoped>

</style>
