<template>
  <AppDragBox
    :id="windowId"
    class="file-window"
    :class="{active: isActive}"
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
          @click="windowManagerStore.updateWindowContentByNodeName(windowId, item.name)"
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
import { useWindowManagerStore } from '@/store/windowManager';



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
    isMinimizedWindow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tab: this.id,
      activeContentNode: {},
    };
  },
  computed: {
    ...mapStores(useWindowManagerStore),
    topLevelFolders() {
      return this.windowManagerStore.systemDataNodes.root.children.filter((item) => item.type === 'folder');
    },
    isActive() {
      return this.windowManagerStore.activeWindow.windowId === this.windowId;
    },
    activeWindowContentName() {
      return this.window.windowContentNode.name;
    },
  },
  methods: {
    handleClick() {
      console.log('handleClick');
      this.$router.push({ name: this.activeWindowContentName });
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
  flex-grow: 1;
  min-width: 0;
  height: 100%;
  overflow: scroll;
}

:deep(.drag-box__handle) {
  position: sticky;
  top: 0;
}





</style>
