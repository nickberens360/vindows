<template>
  <div class="content-panel pa-4">
    <div
      v-for="item in content.children"
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
        @click="uiStore.addToActiveWindows(item.name)"
      >
        {{ item.name }} - {{ item.type }}
      </router-link>
    </div>
  </div>
</template>
<script>

import { useUiStore } from '@/store/ui';
import { mapStores } from 'pinia';


export default {
  name: 'ExplorerPanel',
  props: {
    content: {
      type: Object,
      default: () => {},
    },
    windowId: {
      type: [String, Number],
      required: true,
      default: 'window-1',
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    hideTabs: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['folder-clicked'],
  computed: {
    ...mapStores(useUiStore),
  },
};
</script>

<style scoped lang="scss">

.content-panel {
  background-color: #fff;
  height: 100%;
}


</style>
