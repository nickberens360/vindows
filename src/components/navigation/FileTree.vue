<template>
  <ul>
    <li
      v-for="item in topLevelFolders"
      :key="item.name"
    >
      <!-- Add @click event to call addActiveWindow when a folder is clicked -->
      <router-link
        :to="getFolderPath(item)"
        @click="handleFolderClick(item)"
      >
        {{ item.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import { mapStores } from 'pinia';
import { useFileManagerStore } from '@/store/fileManager';
import { useUiStore } from '@/store/ui';

export default {
  name: 'FileTree',
  emits: ['folder-clicked'],
  computed: {
    ...mapStores(useFileManagerStore, useUiStore),
    topLevelFolders() {
      return this.fileManagerStore.systemWindows.root.children.filter((item) => item.type === 'folder');
    },
  },
  methods: {
    handleFolderClick(folder) {
      console.log('handleFolderClick', folder);
      this.$emit('folder-clicked', folder);
      this.uiStore.setActiveWindow(folder);
    },
    getFolderPath(folder) {
      console.log('Folder', folder);
      const currentPath = this.$router?.fullPath || '';
      return `/explorer${currentPath}/${encodeURIComponent(folder.name)}`;
    },
  },
};
</script>

<style>
/* Add your own styles here */
</style>
