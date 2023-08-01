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
        width="500"
        style="z-index: 10;"
        color="transparent"
      >
        <!--        <FolderLink
          v-for="item in uiStore.windows"
          :id="item.id"
          :key="item.id"
          :window="item"
          :title="item.title"
          class="ma-2"
        />-->

        <!--        <FileTree-->
        <!--          class="ml-16 mt-8"-->
        <!--          open-in-new-window-->
        <!--        />-->
        <pre>{{ uiStore.activeWindows }}</pre>
      </v-navigation-drawer>


      {{ $route.name }}
      <!--      {{ $route.params.id[$route.params.id.length - 1] }}-->

      <!--      <pre>{{ fileManagerStore.systemWindows.root.children.filter((item) => item.name === $route.params.id[$route.params.id.length - 1]) }}</pre>-->

      <FileWindow
        v-for="(window, index) in uiStore.activeWindows"
        :id="window.name"
        :key="window.name"
        :window-id="`window-${index}`"
        :window="window"
        :content="window"
        :initial-x="index * 50"
        :initial-y="index * 50"
      >
        <template #sidebar>
          <FileTree />
        </template>
      </FileWindow>
    </div>
  </DesktopLayout>
</template>

<script>
import FileTree from '@/components/navigation/FileTree.vue';
import FolderContent from '@/components/windows/fileWindow/FolderContent.vue';
import { mapStores } from 'pinia';
import { useUiStore } from '@/store/ui';
import { useFileManagerStore } from '@/store/fileManager';

import FolderLink from '@/components/navigation/FolderLink.vue';
import DesktopLayout from '@/components/layouts/DesktopLayout.vue';
import FileWindow from '@/components/windows/FileWindow.vue';
/* eslint-disable */
export default {
  name: 'DesktopView',
  components: { FolderContent, FileTree, FolderLink, FileWindow, DesktopLayout },
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
  watch: {
    '$route'() {
      this.initStoreData();
    }
  },
  mounted() {
    if (this.$route.name !== 'desktop') {
      this.initStoreData();
    }
  },
  methods: {
    initStoreData() {
      this.uiStore.setActiveWindows(this.$route.name);
    },
  },

};
</script>
<style lang="scss" scoped>

</style>
