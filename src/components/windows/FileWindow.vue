<template>
  <AppDragBox
    :id="id"
    class="file-window"
    :class="{active: isActive}"
    @drag-box-clicked="handleClick"
  >
    <template #drag-area>
      <v-toolbar
        height="30"
        color="black"
        class="text-white file-window__header d-flex align-center justify-space-between"
      >
        <template #append>
          <v-icon
            icon="fal fa-minus-square"
            color="white"
            @click="handleMinimize"
          />
          <v-icon
            icon="far fa-times"
            color="white"
            @click="handleClose"
          />
        </template>
        <p>
          {{ window.title }}
        </p>
      </v-toolbar>
    </template>
    <template #default>
      <slot name="default" />
    </template>
    <template #footer>
      resize handle here
    </template>
  </AppDragBox>
</template>

<script>
import AppDragBox from '@/components/app/AppDragBox.vue';
import { mapStores } from 'pinia';
import { useUiStore } from '@/store/ui';

export default {
  name: 'FileWindow',
  components: { AppDragBox },
  props: {
    id: {
      type: String,
      required: true,
      default: 'fileWindow',
    },
    window: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapStores(useUiStore),
    isActive() {
      return this.uiStore.activeWindow.id === this.id;
    },
  },
  methods: {
    handleClick() {
      this.uiStore.setActiveWindow(this.window);
      this.$router.push({ name: 'window', params: { id: this.id } });
    },
    handleClose() {
      this.uiStore.removeActiveWindow(this.window);
      if (this.uiStore.activeWindows.length === 0) {
        this.$router.push({ name: 'desktop'});
        return;
      }
      this.$router.go(-1);
    },
    handleMinimize() {
      console.log('minimize');
    },
  },
};
</script>

<style scoped lang="scss">
.file-window {
  :deep(.drag-box) {
    border: 1px solid #000;
    background-color: #fff;
    height: 400px;
    width: 500px;
    resize: both;
    overflow: auto;
  }
  &.active {
    :deep(.drag-box) {
      box-shadow: 7px 7px 5px -3px rgba(0,0,0,0.36);
    }
  }
}
.file-window__header {
  cursor: move;
}

</style>
