<template>
  <div>
    <ul>
      <li
        v-for="item in content.children"
        :key="item.name"
      >
        <router-link
          :to="{name: item.name }"
          @click="handleFolderClick(item)"
        >
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    {{ isActive }}


    <!--    <v-tabs
      v-if="content.children"
      v-model="tab"
      color="primary"
      :disabled="!isActive"
    >
      <div
        v-for="item in content.children"
        :key="item.name"
      >
        <v-tab
          v-if="item.children && !hideTabs"
          :value="item.name"
          :to="{ name: item.name }"
        >
          {{ item.name }}
        </v-tab>
      </div>
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
        <pre v-if="item.children">{{ item.children }}</pre>
        <pre v-else>{{ item }}</pre>
      </v-window-item>
    </v-window>-->
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
      this.$emit('folder-clicked', folder);
      this.uiStore.addActiveWindow(folder, false);
      this.uiStore.activeWindowContent = folder;
    },
  },
};
</script>
