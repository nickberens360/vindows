<template>
  <section class="empty-layout">
    <slot name="default" />
  </section>
</template>
<script>
export default {
  name: 'EmptyLayout',
};
</script>
<style lang="scss" scoped>
@import '@/scss/injectable/_mixins';
.empty-layout {
  @include fullscreen;
}
</style>
