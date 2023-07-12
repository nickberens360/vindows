<template>
  <AppDragBox
    :id="id"
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
          {{ window.title }}
        </div>
      </v-toolbar>
    </template>



    <div class="file-window__layout d-flex">
      <div class="file-window__sidebar pa-4">
        Sidebar
        <slot name="sidebar" />
      </div>
      <div class="file-window__content pa-4">
        Content
        <slot name="content" />
      </div>
    </div>
    <!--    <template #footer>-->
    <!--      resize handle here-->
    <!--    </template>-->
  </AppDragBox>
</template>

<script>
import AppDragBox from '@/components/app/AppDragBox.vue';
import { mapStores } from 'pinia';
import { useUiStore } from '@/store/ui';

export default {
  name: 'FileWindow',
  components: { AppDragBox },
  props: {
    id: {
      type: String,
      required: true,
      default: 'fileWindow',
    },
    window: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isMinimizing: false,
    };
  },
  computed: {
    ...mapStores(useUiStore),
    isActive() {
      return this.uiStore.activeWindow.id === this.id;
    },
  },
  methods: {
    handleClick() {
      this.uiStore.setActiveWindow(this.window);
      this.$router.push({ name: 'window', params: { id: this.id } });
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
      // this.isMinimizing = !this.isMinimizing;
      this.uiStore.minimizeWindow(this.window);
      this.handleClose();
      this.isMinimizing = false;
    },
  },
};
</script>

<style scoped lang="scss">
.file-window {
  :deep(.drag-box) {
    z-index: 100;
    border: 2px solid #000;
    background-color: #f1ebde;
    width: 500px;
    height: 400px;
    resize: both;
    overflow: auto;
    border-radius: 10px;
  }
  &.minimizing {
    :deep(.drag-box) {
      position: fixed;
      width: 100%;
      height: 100%;
      top: calc(var(--v-layout-top) * 1) !important;
      left: 0 !important;
      right: 0 !important;
    }
  }
  &.active {
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
  min-width: 0;
  border-right: 2px solid #000;
}

.file-window__content {
  flex-grow: 1; // Fill remaining space
  min-width: 0; // Don't use more space than available
}

:deep(.drag-box__handle) {
  position: sticky;
  top: 0;
}





</style>
