<template>
  <VApp>
    <RouterView />
  </VApp>
</template>

<script>
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';
import { mapStores } from 'pinia';

export default {
  name: 'App',
  computed: {
    ...mapStores(useAppStore, useUserStore),
  },
  async created() {
    await this.userStore.fetchUser();
    if (this.userStore.isLoggedIn) {
      await this.appStore.setEnvConfig();
    }
  },
};
</script>
