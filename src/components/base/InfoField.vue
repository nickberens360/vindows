<template>
  <div class="info-field">
    <div
      v-if="label"
      class="text-caption-2 text-blue-grey mb-1"
    >
      {{ label }}
    </div>
    <div
      class="text-primary-darken-1"
      :class="[contentSizeClass]"
    >
      <slot name="details" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'InfoField',
  props: {
    label: {
      type: String,
      required: true
    },
    contentSize: {
      type: String,
      default: 'sm',
      validator: (contentSize) => ['sm', 'md', 'lg'].includes(contentSize)
    }
  },
  computed: {
    contentSizeClass() {
      let sizeClass = '';
      switch (this.contentSize) {
      case 'sm':
        sizeClass = 'text-body-4';
        break;
      case 'md':
        sizeClass = 'text-body-1';
        break;
      case 'lg':
        sizeClass = 'text-body-2';
        break;
      }
      return sizeClass;
    }
  }
};
</script>
<style lang="scss" scoped>
.info-field {
  display: inline-flex;
  flex-direction: column;
  text-align: left;
}
</style>
