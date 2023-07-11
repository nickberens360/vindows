<template>
  <div class="radio-toggle-bar pa-4 pr-5">
    <v-radio-group
      :model-value="modelValue"
      inline
      class="align-center"
      hide-details
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <v-radio
        v-for="item in radioItems"
        :key="item.value"
        :value="item.value"
        true-icon="fas fa-circle-small"
        :ripple="false"
        class="meru-styled-radio mr-5"
      >
        <template #label>
          <span class="ml-2 text-blue-dark">{{ item.label }}</span>
        </template>
      </v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  name: 'RadioToggleBar',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    radioItems: {
      type: Array,
      required: true,
    },
  },
  emits: [
    'update:modelValue'
  ],
};
</script>

<style scoped lang="scss">

</style>
