<template>
  <DesktopLayout>
    <div
      class="d-flex justify-center align-center flex-column"
    >
      <v-navigation-drawer
        v-model="drawer"
        floating
        temporary
        disable-route-watcher
        elevation="0"
        :scrim="false"
        width="350"
        style="z-index: 10;"
        color="transparent"
      >
        <!--        <FolderLink
          route-name="projects"
          title="Projects"
          @click="uiStore.addToActiveWindows('projects')"
        />

        <FolderLink
          route-name="about"
          title="About"
          @click="uiStore.addToActiveWindows('about')"
        />

        <FolderLink
          route-name="documents"
          title="Documents"
          @click="uiStore.addToActiveWindows('documents')"
        />-->

        <pre
          v-for="window in uiStore.activeWindows"
          :key="window.windowId"
        >
          {{ window.windowId }}
        </pre>
      </v-navigation-drawer>


      {{ $route.name }}


      <div
        v-for="(window, index) in uiStore.activeWindows"
        :key="window.windowId"
      >
        <!--          v-if="window.windowContentNode.type === 'folder'"-->
        <ExplorerWindow
          :window-id="window.windowId"
          :window="window"
          :content="window"
          :initial-x="index * 50"
          :initial-y="index * 50"
        />
      </div>
    </div>
  </DesktopLayout>
</template>

<script>
import FileTree from '@/components/navigation/FileTree.vue';
import FileWindow from '@/components/windows/FileWindow.vue';
import { mapStores } from 'pinia';
import { useUiStore } from '@/store/ui';
import { useFileManagerStore } from '@/store/fileManager';

import FolderLink from '@/components/navigation/FolderLink.vue';
import DesktopLayout from '@/components/layouts/DesktopLayout.vue';
import ExplorerWindow from '@/components/windows/ExplorerWindow.vue';
/* eslint-disable */
export default {
  name: 'DesktopView',
  components: { FileWindow, FileTree, FolderLink, ExplorerWindow, DesktopLayout },
  data() {
    return {
      setItems: null,
      drawer: true,
      folderContent: null,
    };
  },
  computed: {
    ...mapStores(useUiStore, useFileManagerStore),
  },
  // watch: {
  //   '$route'() {
  //     this.initStoreData();
  //   }
  // },
  mounted() {
    if (this.$route.name !== 'desktop') {
      this.initStoreData();
    }
  },
  methods: {
    initStoreData() {
      this.uiStore.addToActiveWindows(this.$route.name);
    },
  },

};
</script>
<style lang="scss" scoped>

</style>
