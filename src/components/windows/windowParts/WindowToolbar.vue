<template>
  <v-toolbar
    height="40"
    :color="toolBarColor"
    class=" window-toolbar d-flex align-center justify-space-between pl-2"
    :class="windowType"
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
      {{ window.windowContentNode.name }}
    </div>
  </v-toolbar>
</template>
<script>

import { useUiStore } from '@/store/ui';
import { mapStores } from 'pinia';


export default {
  name: 'WindowToolbar',
  props: {
    window: {
      type: Object,
      default: () => {},
    },
    windowType: {
      type: String,
      default: 'folder',
    },
    windowId: {
      type: [String, Number],
      required: true,
      default: 'window-1',
    },
  },
  computed: {
    ...mapStores(useUiStore),
    toolBarColor() {
      return this.windowType === 'folder' ? '#f1ebde' : 'black';
    },
  },
  methods: {
    handleClose() {
      this.uiStore.removeActiveWindow(this.window);
      if (this.uiStore.activeWindows.length === 0) {
        this.$router.push({ name: 'desktop'});
        return;
      }
      this.$router.go(-1);
    },
    handleMinimize() {
      this.uiStore.minimizeWindow(this.window);
      this.handleClose();
    },
  },
};
</script>

<style scoped lang="scss">

.window-toolbar {
  cursor: move;
  border-bottom: 2px solid #000;
  background-color: #f1ebde;
  &.file {
    background-color: #fff;
    height: 100%;
  }
}




</style>
