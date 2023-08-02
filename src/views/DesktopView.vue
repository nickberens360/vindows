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
        width="150"
        style="z-index: 10;"
        color="transparent"
      >
        <FolderLink
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
        />
      </v-navigation-drawer>


      <div
        v-for="(window, index) in uiStore.activeWindows"
        :key="window.windowId"
      >
        <ExplorerWindow
          :window-id="window.windowId"
          :window="window"
          :initial-x="index * 50"
          :initial-y="index * 50"
        />
      </div>
    </div>
  </DesktopLayout>
</template>

<script>

import { mapStores } from 'pinia';
import { useUiStore } from '@/store/ui';

import FolderLink from '@/components/navigation/FolderLink.vue';
import DesktopLayout from '@/components/layouts/DesktopLayout.vue';
import ExplorerWindow from '@/components/windows/ExplorerWindow.vue';

export default {
  name: 'DesktopView',
  components: {  FolderLink, ExplorerWindow, DesktopLayout },
  data() {
    return {
      setItems: null,
      drawer: true,
      folderContent: null,
    };
  },
  computed: {
    ...mapStores(useUiStore),
  },
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
