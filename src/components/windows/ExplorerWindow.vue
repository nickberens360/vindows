<template>
  <AppDragBox
    :id="windowId"
    class="file-window"
    :class="{active: isActive, minimizing: isMinimizing}"
    @click.capture="handleClick"
    @drag-box-mousedown="handleClick"
  >
    <template #drag-area>
      <WindowToolbar
        :window-id="windowId"
        :window="window"
        :window-type="window.windowContentNode.type"
      />
    </template>

    <div class="file-window__layout d-flex">
      <div
        v-if="window.windowContentNode.type === 'folder'"
        class="file-window__sidebar pa-4"
      >
        <router-link
          v-for="item in topLevelFolders"
          :key="item.name"
          class="d-block"
          style="cursor: pointer"
          :to="{ name: item.name}"
          @click="uiStore.updateWindowContentByNodeName(windowId, item.name)"
        >
          {{ item.name }}
        </router-link>
      </div>
      <div class="file-window__content">
        <slot name="content">
          <ExplorerPanel
            v-if="window.windowContentNode.type === 'folder'"
            :content="window.windowContentNode"
            :window-id="windowId"
          />
          <FilePanel
            v-if="window.windowContentNode.type === 'file'"
            :content="window.windowContentNode"
            :window-id="windowId"
          />


          <!--          <div
            v-for="item in content.windowContentNode.children"
            :key="item.uid"
          >
                        <router-link
              v-if="item.type === 'folder'"
              class="d-block"
              :to="{ name: item.name}"
              @click="uiStore.updateWindowContentByNodeName(windowId, item.name)"
            >
              {{ item.name }} - {{ item.type }}
            </router-link>
            <router-link
              v-if="item.type === 'file'"
              class="d-block"
              :to="{ name: item.name}"
              @click.stop="uiStore.addToActiveWindows(item.name)"
            >
              {{ item.name }} - {{ item.type }}
            </router-link>
          </div>-->
        </slot>
      </div>
    </div>
  </AppDragBox>
</template>

<script>
/*eslint-disable*/
import AppDragBox from '@/components/app/AppDragBox.vue';
import ExplorerPanel from '@/components/windows/windowParts/ExplorerPanel.vue';
import WindowToolbar from '@/components/windows/windowParts/WindowToolbar.vue';
import FilePanel from '@/components/windows/windowParts/FilePanel.vue';
import SubContentView from '@/views/content/SubContentView.vue';
import { mapStores } from 'pinia';
import { useUiStore } from '@/store/ui';
import { useFileManagerStore } from '@/store/fileManager';



export default {
  name: 'ExplorerWindow',
  components: { WindowToolbar, FilePanel, ExplorerPanel, SubContentView, AppDragBox },
  props: {
    windowId: {
      type: [String, Number],
      required: true,
      default: 'window-1',
    },
    window: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: 'Explorer',
    },
    content: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isMinimizing: false,
      tab: this.id,
      activeContentNode: {},
    };
  },
  computed: {
    ...mapStores(useUiStore, useFileManagerStore),
    topLevelFolders() {
      return this.fileManagerStore.systemWindows.root.children.filter((item) => item.type === 'folder');
    },
    isActive() {
      return this.uiStore.activeWindow.windowId === this.windowId;
    },
    activeWindowContent() {
      return this.window.windowContentNode.name;
    },
  },
  methods: {
    async handleClick() {
      await this.uiStore.setActiveWindow(this.window);
      this.$router.push({ name: this.activeWindowContent });
    },
    /*handleClose() {
      this.uiStore.removeActiveWindow(this.window);
      if (this.uiStore.activeWindows.length === 0) {
        this.$router.push({ name: 'desktop'});
        return;
      }
      this.$router.go(-1);
    },
    handleMinimize() {
      this.isMinimizing = !this.isMinimizing;
      this.uiStore.minimizeWindow(this.window);
      this.handleClose();
      // setTimeout(() => {
      //   this.uiStore.minimizeWindow(this.window);
      //   this.handleClose();
      //   this.isMinimizing = false;
      // }, 1000);
    },*/
  },
};
</script>

<style scoped lang="scss">
.file-window {
  position: relative;
  :deep(.drag-box) {
    border: 2px solid #000;
    background-color: #f1ebde;
    width: 700px;
    height: 500px;
    resize: both;
    overflow: hidden;
    border-radius: 10px 10px 0 10px;
  }
  &.active {
    z-index: v-bind(updateZIndex);
    :deep(.drag-box) {
      box-shadow: -10px 10px 6px 0 rgba(0, 0, 0, 0.5);
    }
  }
}


.file-window__layout {
  height: calc(100% - 40px);
}

.file-window__sidebar {
  width: 150px;
  flex: 1 0 150px;
  max-width: 150px;
  min-width: 0;
  border-right: 2px solid #000;
}

.file-window__content {
  flex-grow: 1; // Fill remaining space
  min-width: 0; // Don't use more space than available
  height: 100%;
  overflow: scroll;
}

:deep(.drag-box__handle) {
  position: sticky;
  top: 0;
}





</style>
