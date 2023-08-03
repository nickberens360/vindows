<template>
  <div class="content-panel pa-4">
    <pre>{{ content }}</pre>
  </div>
</template>
<script>

import { useWindowManagerStore } from '@/store/windowManager';
import { mapStores } from 'pinia';


export default {
  name: 'FilePanel',
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
    ...mapStores(useWindowManagerStore),
  },
};
</script>

<style scoped lang="scss">

.content-panel {
  background-color: #fff;
  height: 100%;
}


</style>
