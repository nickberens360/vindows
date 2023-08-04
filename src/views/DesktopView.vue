<template>
  <DesktopLayout>
    <div
      class="d-flex justify-center align-center flex-column"
    >
      <v-navigation-drawer
        v-model="drawer"
        floating
        temporary
        disable-route-watcher
        elevation="0"
        :scrim="false"
        width="150"
        style="z-index: 10;"
        color="transparent"
      >
        <router-link
          :to="{name: 'about'}"
          class="mt-8 d-block"
          @click="windowManagerStore.addToActiveWindows('about')"
        >
          <FolderIcon
            size="lg"
            has-active-animation
            label="About"
          />
        </router-link>
      </v-navigation-drawer>


      <transition-group name="list">
        <ExplorerWindow
          v-for="(window, index) in windowManagerStore.activeWindows"
          :key="window.windowId"
          :window-id="window.windowId"
          :window="window"
          :initial-x="index * 50"
          :initial-y="index * 50"
        />
      </transition-group>
    </div>
  </DesktopLayout>
</template>

<script>

import { mapStores } from 'pinia';
import { useWindowManagerStore } from '@/store/windowManager';

import FolderIcon from '@/components/icons/FolderIcon.vue';
import DesktopLayout from '@/components/layouts/DesktopLayout.vue';
import ExplorerWindow from '@/components/windows/ExplorerWindow.vue';

export default {
  name: 'DesktopView',
  components: { FolderIcon, ExplorerWindow, DesktopLayout },
  data() {
    return {
      drawer: true,
    };
  },
  computed: {
    ...mapStores(useWindowManagerStore),
  },
  watch: {
    '$route'() {
      if (this.$route.name !== 'desktop') {
        this.windowManagerStore.addToActiveWindows(this.$route.name, false);
      }
    }
  },
  mounted() {
    if (this.$route.name !== 'desktop') {
      this.initStoreData();
    }
  },
  methods: {
    initStoreData() {
      this.windowManagerStore.addToActiveWindows(this.$route.name);
    },
  },

};
</script>
<style lang="scss" scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all .25s ease;
}

:deep(.drag-box-container.list-enter-active),
:deep(.drag-box-container.list-leave-active){
  z-index: 1000;
}

.list-enter-from,
.list-leave-to {
  opacity: .25;
  transform: translateY(300px) scale(.5);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

</style>
