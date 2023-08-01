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
import { useUiStore } from '@/store/ui';

export default {
  name: 'WindowLink',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapStores(useFileManagerStore, useUiStore),
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
      this.uiStore.addActiveWindow(item);
    },
  },
};
</script>

<style>
/* Add your own styles here */
</style>
