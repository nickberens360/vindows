<template>
  <router-link
    :to="{ name: 'window', params: { id: window.id } }"
    class="ma-2"
  >
    {{ title }}
  </router-link>
</template>

<script>
import { mapStores } from 'pinia';
import { useUiStore } from '@/store/ui';
export default {
  name: 'FolderLink',
  props: {
    title: {
      type: String,
      default: '',
    },
    window: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapStores(useUiStore),
  },
};
</script>
