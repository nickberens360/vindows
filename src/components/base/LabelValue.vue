<template>
  <dl
    class="d-flex mb-0 text-blue-dark"
    :class="[sizeClass]"
  >
    <slot name="label">
      <dt
        :class="[{'mr-8': size === 'lg'}, variantClass]"
      >
        {{ label }}
      </dt>
    </slot>
    <slot name="value">
      <dd class="font-weight-bold">
        {{ value }}
      </dd>
    </slot>
  </dl>
</template>

<script>
export default {
  name: 'LabelValue',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    size: {
      type: String,
      default: 'sm',
      validator: (size) => ['sm', 'md', 'lg'].includes(size)
    },
    variant: {
      type: String,
      default: 'dark-label',
      validator: (variant) => ['light-label', 'dark-label'].includes(variant)
    }
  },
  computed: {
    variantClass() {
      let variantClass = '';
      switch (this.variant) {
      case 'light-label':
        variantClass = 'text-blue-grey mr-5';
        break;
      case 'dark-label':
        variantClass = 'text-blue-dark mr-3';
        break;
      }
      return variantClass;
    },
    sizeClass() {
      let sizeClass = '';
      switch (this.size) {
      case 'sm':
        sizeClass = 'text-body-1';
        break;
      case 'md':
        sizeClass = 'text-body-3';
        break;
      case 'lg':
        sizeClass = 'text-h2';
        break;
      }
      return sizeClass;
    }
  }
};
</script>

<style scoped>

</style>
