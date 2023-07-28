<template>
  <div>
    <!--    TODO: Check for nested children-->
    Sub Content View
  </div>
</template>
<script>

export default {
  name: 'SubContentView',
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
