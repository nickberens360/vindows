<template>
  <div>
    <!--    TODO: Check for nested children-->
    <ul v-if="content.children">
      <li
        v-for="item in content.children"
        :key="item.name"
      >
        <router-link
          :to="{name: item.name,}"
          @click="handleFolderClick(item)"
        >
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    <router-view :key="$router.fullPath" />
    <pre>{{ content.children }}</pre>
  </div>
</template>
<script>

import { useUiStore } from '@/store/ui';
import { mapStores } from 'pinia';


export default {
  name: 'ContentView',
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapStores(useUiStore),
  },
  methods: {
    handleFolderClick(folder) {
      console.log('handleFolderClick', folder);
      this.uiStore.addActiveWindow(folder, false);
      this.uiStore.activeWindowContent = folder;
    },
  },
};
</script>
