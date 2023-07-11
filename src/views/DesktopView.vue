<template>
  <DesktopLayout>
    <div
      class="d-flex justify-center align-center"
    >
      <pre style="position: fixed; left: 0; top: 25px;">{{ uiStore.activeWindows }}</pre>

      <FolderLink
        v-for="item in uiStore.windows"
        :id="item.id"
        :key="item.id"
        :window="item"
        :title="item.title"
        class="ma-2"
      />

      <FileWindow
        v-for="window in uiStore.activeWindows"
        :id="window.id"
        :key="window.id"
        :window="window"
      >
        <template #default>
          <div class="d-flex justify-center align-center">
            <h1>{{ window.title }}</h1>
          </div>
        </template>
      </FileWindow>
    </div>
  </DesktopLayout>
</template>

<script>
import { mapStores } from 'pinia';
import { useUiStore } from '@/store/ui';

import FolderLink from '@/components/navigation/FolderLink.vue';
import DesktopLayout from '@/components/layouts/DesktopLayout.vue';
import FileWindow from '@/components/windows/FileWindow.vue';

export default {
  name: 'DesktopView',
  components: { FolderLink, FileWindow, DesktopLayout },
  data() {
    return {
      setItems: null
    };
  },
  computed: {
    ...mapStores(useUiStore),
  },
  watch: {
    '$route'(to, from) {
      if (this.$route.name !== 'desktop') {
        const window = this.uiStore.windows.filter(item =>
          item.id === this.$route.params.id
        );
        if (to !== from) {
          this.uiStore.setActiveWindow(window[0]);
        }
        if (!this.uiStore.activeWindows.includes(window[0])) {
          this.uiStore.addActiveWindow(...window);
        }
      }
    }
  },
  mounted() {
    if (this.$route.name !== 'desktop') {
      this.initStoreData();
    }
  },
  methods: {
    initStoreData() {
      const window = this.uiStore.windows.filter(item =>
        item.id === this.$route.params.id
      );
      this.uiStore.addActiveWindow(...window);
      this.uiStore.setActiveWindow(window[0]);
    },
  },

};
</script>
<style lang="scss" scoped>

</style>
