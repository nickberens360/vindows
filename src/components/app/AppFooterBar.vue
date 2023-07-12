<template>
  <v-footer
    app
    class="d-flex align-end justify-space-between"
    height="55"
  >
    <div
      class="app-footer__container d-flex align-center justify-space-between"
    >
      <div class="app-footer__item">
        <FolderLink
          :id="uiStore.windows[0].id"
          :window="uiStore.windows[0]"
          title="Test One"
          class="ma-2"
          style="top: -10px; position: relative;"
        />
      </div>
    </div>
    <div class="app-footer__minimized d-flex">
      <div
        v-for="window in uiStore.minimizedWindows"
        :key="window.id"
        class="app-footer__item"
        @click="handleMinimizedWindowClick(window)"
      >
        <FileWindow
          :id="window.id"
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
import FileWindow from '@/components/windows/FileWindow.vue';
import { mapStores } from 'pinia';
import { useUiStore } from '@/store/ui';
export default {
  name: 'AppFooterBar',
  components: { FolderLink, FileWindow },
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
  width: 800px !important;
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
  height: 100px;
  z-index: 1;
  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: -20px;
    width: 50%;
    height: 4px;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    background: black;
    filter: blur(6px);
    opacity: 1;
    border-radius: 100px;
  }

}


.edge {
  position: absolute;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  width: 1015px;
  margin: auto;
  bottom: -20px;
  height: 20px;
  background: #a2a2a2;
}

.app-footer__shadow {
  position: absolute;
  z-index: -1;
  transform: translateX(-50%) !important;
  width: 800px !important;
  height: 50px !important;
  bottom: -65px !important;
  left: 50% !important;
  right: 50% !important;
  background: black;
  filter: blur(5px);
  opacity: 0.50;
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
}
:deep(.drag-box) {
  position: relative !important;
  right: auto !important;
  left: auto !important;
  box-shadow: none !important;
  width: 100% !important;
  height: 100% !important;
  transform: scale(.8) !important;
}
</style>
