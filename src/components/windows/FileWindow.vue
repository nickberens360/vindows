<template>
  <AppDragBox
    :id="windowId"
    class="file-window"
    :class="{active: isActive, minimizing: isMinimizing}"
    @drag-box-clicked="handleClick"
  >
    <template #drag-area>
      <v-toolbar
        height="40"
        color="#f1ebde"
        class=" file-window__header d-flex align-center justify-space-between pl-2"
      >
        <template #append>
          <v-icon
            icon="fal fa-minus-square"
            @click="handleMinimize"
          />
          <v-icon
            icon="far fa-times"
            @click="handleClose"
          />
        </template>
        <div class="font-weight-semibold">
          {{ title }}
        </div>
      </v-toolbar>
    </template>

    <div class="file-window__layout d-flex">
      <div class="file-window__sidebar pa-4">
        {{ windowId }}
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
      <div class="file-window__content pa-4">
        <slot name="content">
          {{ uiStore.activeWindow.windowId === windowId }}

          <p
            v-for="item in content.windowContentNode.children"
            :key="item.uid"
            class="d-block"
            style="cursor: pointer"
            @click="uiStore.updateWindowContentByNodeName(windowId, item.name)"
          >
            {{ item.name }}
          </p>
        </slot>
      </div>
    </div>
  </AppDragBox>
</template>

<script>
/*eslint-disable*/
import AppDragBox from '@/components/app/AppDragBox.vue';
import ContentView from '@/views/content/ContentView.vue';
import SubContentView from '@/views/content/SubContentView.vue';
import { mapStores } from 'pinia';
import { useUiStore } from '@/store/ui';
import { useFileManagerStore } from '@/store/fileManager';



export default {
  name: 'FileWindow',
  components: { SubContentView, ContentView, AppDragBox },
  props: {
    // id: {
    //   type: String,
    //   required: true,
    //   default: 'fileWindow',
    // },
    windowId: {
      type: [String, Number],
      required: true,
      default: 'window-1',
    },
    activeSystemDataNode: {
      type: [Object, Array],
      default: () => {},
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
      contentPane: {},
    };
  },
  computed: {
    ...mapStores(useUiStore, useFileManagerStore),
    topLevelFolders() {
      return this.fileManagerStore.systemWindows.root.children.filter((item) => item.type === 'folder');
    },
    isActive() {
      return this.uiStore.activeWindow.uid === this.windowId;
    },
    updateZIndex() {
      if (this.isActive) {
        return 100;
      } else {
        return 'unset';
      }
    },

    // computedContent() {
    //   if (this.isActive) {
    //     return this.uiStore.activeWindowContent;
    //   } else {
    //     return this.content;
    //   }
    // },
  },
  methods: {
    handleActiveWindowContent(node) {
      if (this.contentPane) {
        return this.contentPane;
      } else {
        return node;
      }
    },
    handleFolderClicked(item) {
      console.log('handleFolderClicked', item);
      this.contentPane = item;
    },
    async handleClick() {
      await this.uiStore.setActiveWindow(this.window);
      // this.$router.push({ name: 'explorer', params: { id: this.uiStore.activeWindow.name } });
    },
    handleClose() {
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
    },
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
.file-window__header {
  cursor: move;
  border-bottom: 2px solid #000;
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
  overflow: auto;
}

:deep(.drag-box__handle) {
  position: sticky;
  top: 0;
}





</style>
