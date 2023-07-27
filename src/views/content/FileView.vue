<template>
  <div>
    FileView
  </div>
</template>
<script>

export default {
  name: 'FileView',
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
