<template>
  <DefaultLayout>
    <router-view />
  </DefaultLayout>
</template>
<script>
import DefaultLayout from '@/components/layouts/DefaultLayout';
export default {
  name: 'DefaultCategoryPage',
  components: {DefaultLayout},
};
</script>
