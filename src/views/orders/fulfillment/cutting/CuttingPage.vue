<template>
  <!-- all commented code left until mocks are finished -->
  <!--      <BaseTabs-->
  <!--        :tabs="tabs"-->
  <!--        tab-variant="secondary"-->
  <!--        tab-row-variant="styled"-->
  <!--      />-->
  <v-container fluid>
    Cutting Page
    <router-view />
  </v-container>
</template>

<script>
// import BaseTabs from '@/components/base/BaseTabs';
export default {
  name: 'CuttingPage',
  components: {
    // BaseTabs,
  },
};
</script>

<style scoped>

</style>
