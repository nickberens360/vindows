<template>
  <v-sheet class="content-panel pa-4 d-flex flex-wrap">
    <div
      v-for="item in content.children"
      :key="item.uid"
    >
      <router-link
        v-if="item.type === 'folder'"
        class="panel-link"
        :to="{ name: item.name}"
        @click="windowManagerStore.updateWindowContentByNodeName(windowId, item.name)"
      >
        <FolderIcon
          size="sm"
          :label="item.name"
          show-label-below
        />
      </router-link>
      <router-link
        v-if="item.type === 'file'"
        class="panel-link"
        :to="{ name: item.name}"
        @click="windowManagerStore.addToActiveWindows(item.name)"
      >
        <v-icon color="blue">
          fad fa-file
        </v-icon>
        <p
          class="text-caption text-center font-weight-medium text-black line-height-1"
        >
          {{ item.name }}
        </p>
      </router-link>
    </div>
  </v-sheet>
</template>
<script>

import FolderIcon from '@/components/icons/FolderIcon.vue';
import { useWindowManagerStore } from '@/store/windowManager';
import { mapStores } from 'pinia';


export default {
  name: 'ExplorerPanel',
  components: { FolderIcon },
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

.panel-link {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 75px;
  width: 100px;
  text-decoration: none;
  margin: 0 .5rem;
  .v-icon {
    font-size: 3rem;
  }
  p {
    font-weight: 500;
    font-size: .75rem;
    padding: .15rem;
    line-height: 1 !important;
  }
}


</style>
