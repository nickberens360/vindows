<template>
  <router-link
    :to="getFolderPath(item)"
    @click="handleFolderClick(item)"
  >
    {{ item.name }}
  </router-link>
</template>

<script>
import { mapStores } from 'pinia';
import { useFileManagerStore } from '@/store/fileManager';
import { useWindowManagerStore } from '@/store/windowManager';

export default {
  name: 'WindowLink',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapStores(useFileManagerStore, useWindowManagerStore),
    getFolderPath(item) {
      return {
        name: 'folder',
        params: {
          id: item.id,
        },
      };
    },
    handleFolderClick(item) {
      this.fileManagerStore.setCurrentFolder(item);
      this.windowManagerStore.addActiveWindow(item);
    },
  },
};
</script>

<style>
/* Add your own styles here */
</style>
