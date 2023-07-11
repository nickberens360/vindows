<template>
  <v-footer
    app
    color="#eee"
  >
    <v-btn
      v-for="window in uiStore.minimizedWindows"
      :key="window.id"
      flat
      class="mr-2"
    >
      {{ window.title }}
    </v-btn>
  </v-footer>
</template>

<script>
import { mapStores } from 'pinia';
import { useUiStore } from '@/store/ui';
export default {
  name: 'AppFooterBar',
  computed: {
    ...mapStores(useUiStore),
  },
};
</script>
