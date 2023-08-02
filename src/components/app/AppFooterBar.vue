<template>
  <v-footer
    app
    class="d-flex align-end justify-space-between"
    height="55"
  >
    <div
      class="app-footer__container d-flex align-center justify-center justify-space-between"
    >
      <router-link
        :to="{name: 'about'}"
        class="app-footer__item d-flex align-center justify-center"
      >
        <img
          src="https://i.imgur.com/ErWuQ2t.gif"
          alt="Projects"
          style="width: 80px; top: 15px; position: relative; border-radius: 50%;"
          class="elevation-4"
          @click="uiStore.addToActiveWindows('projects')"
        >
      </router-link>
    </div>
    <div class="app-footer__minimized d-flex">
      <div
        v-for="window in uiStore.minimizedWindows"
        :key="window.id"
        class="app-footer__item"
        @click="uiStore.removeMinimizedWindow(window)"
      >
        <ExplorerWindow
          :window-id="window.windowId"
          :window="window"
        />
      </div>
    </div>
    <div class="edge">
        &nbsp;
    </div>
    <div class="app-footer__shadow">
        &nbsp;
    </div>
  </v-footer>
</template>

<script>
/* eslint-disable */
import FolderLink from '@/components/navigation/FolderLink.vue';
import ExplorerWindow from '@/components/windows/ExplorerWindow.vue';
import { mapStores } from 'pinia';
import { useUiStore } from '@/store/ui';
export default {
  name: 'AppFooterBar',
  components: { FolderLink, ExplorerWindow },
  computed: {
    ...mapStores(useUiStore),
  },
  methods: {
    handleMinimizedWindowClick(window) {
      this.uiStore.addActiveWindow(window);
    },
  },
};
</script>

<style scoped lang="scss">

.v-footer {
  transform: translateX(-50%) !important;
  width: 1000px !important;
  bottom: 0 !important;
  left: 50% !important;
  right: 50% !important;
  background: rgb(238,238,238);
  background: linear-gradient(313deg, rgba(238,238,238,1) 23%, rgba(210,210,210,1) 99%);
  transition: bottom 0.3s ease-in-out;

  &:hover {
    bottom: 75px !important;
  }
  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    width: 150px;
    top: 0;
    bottom: 0;
    right: -80px;
    background: #eee;
    transform: skewX(45deg);
    border-radius: 0 5px 0 0;
  }
  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 150px;
    top: 0;
    bottom: 0;
    left: -80px;
    background: #d2d2d2;
    transform: skewX(-45deg);
    border-radius: 5px 0 0 0;
  }
}

//.app-footer__minimized {
//  .app-footer__item {
//    &:first-of-type {
//      border-left: 1px solid red;
//    }
//  }
//}


.app-footer__item {
  position: relative;
  top: -38px;
  width: 150px;
  height: 110px;
  z-index: 1;
  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: -20px;
    width: 15%;
    height: 4px;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    background: black;
    //filter: blur(6px);
    opacity: .5;
    border-radius: 50%;
  }
  &.router-link-active {
    &:after {
      background: red;
    }
  }

}


.edge {
  position: absolute;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  width: 1215px;
  margin: auto;
  bottom: -20px;
  height: 20px;
  background: #a2a2a2;
}

.app-footer__shadow {
  position: absolute;
  z-index: -1;
  transform: translateX(-50%) !important;
  width: 1000px !important;

  height: 50px !important;
  bottom: -65px !important;
  left: 50% !important;
  right: 50% !important;
  background: black;
  //filter: blur(5px);
  opacity: 0.30;
  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    width: 150px;
    top: 0;
    bottom: 0;
    right: -80px;
    background: black;
    transform: skewX(45deg);
    border-radius: 0 5px 0 0;
  }
  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 150px;
    top: 0;
    bottom: 0;
    left: -80px;
    background: black;
    transform: skewX(-45deg);
    border-radius: 5px 0 0 0;
  }
}

:deep(.file-window) {
  width: 150px !important;
  height: 115px !important;
  .file-window__sidebar {
    display: none !important;
  }
  .content-panel {
    pointer-events: none !important;
    padding: 0 !important;
  }
  .v-toolbar__append {
    display: none !important;
  }
}
:deep(.drag-box) {
  position: relative !important;
  right: auto !important;
  left: auto !important;
  box-shadow: none !important;
  width: 100% !important;
  height: 100% !important;
  transform: scale(.8) !important;
  .drag-box__handle {
    pointer-events: none !important;
  }
}
</style>
