<template>
  <section
    class="page-not-found"
  >
    <EmptyLayout>
      <h1 class="text-h1 mb-4 text-center">
        Uh oh, not sure how you got here.
      </h1>
    </EmptyLayout>
  </section>
</template>
<script>
import EmptyLayout from '@/components/layouts/EmptyLayout';
export default {
  name: 'PageNotFound',
  components: {
    EmptyLayout
  }
};
</script>
<style lang="scss" scoped>
.page-not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(var(--v-theme-grey-lighten-3));
}
</style>
