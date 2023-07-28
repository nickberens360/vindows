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
  props: {
    openInNewWindow: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['folder-clicked'],
  computed: {
    ...mapStores(useFileManagerStore, useUiStore),
    topLevelFolders() {
      return this.fileManagerStore.systemWindows.root.children.filter((item) => item.type === 'folder');
    },
  },
  methods: {
    handleFolderClick(folder) {
      this.uiStore.addActiveWindow(folder, this.openInNewWindow);
      this.uiStore.activeWindowContent = folder;
    },
    getFolderPath(folder) {
      const currentPath = this.$router?.fullPath || '';
      return `/explorer${currentPath}/${encodeURIComponent(folder.name)}`;
    },
  },
};
</script>

<style>
/* Add your own styles here */
</style>
