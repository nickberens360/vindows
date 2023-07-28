<template>
  <ul>
    <li
      v-for="item in content.children"
      :key="item.name"
    >
      <router-link
        :to="{ name: item.name }"
      >
        {{ item.name }}
      </router-link>
    </li>
  </ul>
  {{ content }}
  <!--    <v-tabs
      v-if="content.children"
      v-model="tab"
      color="primary"
      :disabled="!isActive"
    >
      <v-tab
        v-for="item in content.children"
        :key="item.name"
        :value="item.name"
        :to="{ name: item.name }"
      >
        {{ item.name }}
      </v-tab>
    </v-tabs>
    <v-window
      v-if="content.children"
      v-model="tab"
    >
      <v-window-item
        v-for="item in content.children"
        :key="item.name"
        :value="item.name"
      >
        <pre>{{ item }}</pre>
        <pre v-if="item.children">{{ item.children }}</pre>
      </v-window-item>
    </v-window>-->
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
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tab: this.content.name,
    };
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
