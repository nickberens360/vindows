<template>
  <v-navigation-drawer
    v-model="drawerState"
    class="app-drawer"
    :class="{'pa-8 pt-14': !noPadding}"
    :style="`height: ${appDrawerHeight}`"
    disable-route-watcher
    :width="width"
  >
    <v-icon
      v-if="!hideCloseBtn"
      class="app-drawer__close-icon"
      size="24"
      icon="fal fa-times"
      @click="drawerState = false"
    />
    <div
      class="app-drawer__content"
      :class="{
        'is-vertically-centered': isVerticallyCentered,
      }"
    >
      <div class="app-drawer__column">
        <slot name="default" />
      </div>
    </div>
    <template #append>
      <slot name="append" />
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppDrawer',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    drawerHeight: {
      type: String,
      default: 'auto',
    },
    maxWidth: {
      type: String,
      default: 'auto',
    },
    width: {
      type: [String, Number],
      default: 500,
    },
    hideCloseBtn: {
      type: Boolean,
      default: false,
    },
    closeBtnLocation: {
      type: String,
      default: 'right',
    },
    isVerticallyCentered: {
      type: Boolean,
      default: false,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:is-open'],
  data() {
    return {
      tab: null,
      open: false,
    };
  },
  computed: {
    drawerState: {
      get() {
        return this.isOpen;
      },
      set(newValue) {
        this.$emit('update:is-open', newValue);
      },
    },
    contentMaxWidth() {
      let width = this.maxWidth;
      if (typeof width === 'number') {
        return width + 'px';
      }
      return width;
    },
    appDrawerHeight() {
      let height = this.drawerHeight;
      if (typeof height === 'number') {
        return height + 'px';
      }
      return height;
    },
    closeDrawerBtnLocation() {
      if (this.closeBtnLocation === 'right') {
        return {
          left: 'auto',
          right: '16px',
        };
      } else {
        return {
          left: '16px',
          right: 'auto',
        };
      }
    },
  },
};
</script>

<style scoped lang="scss">
.app-drawer__close-icon {
  position: absolute;
  top: 16px;
  right: v-bind("closeDrawerBtnLocation.right");
  left: v-bind("closeDrawerBtnLocation.left");
  cursor: pointer;
}
.app-drawer__content {
  max-width: v-bind(contentMaxWidth);
  margin-right: auto;
  margin-left: auto;
}

.is-vertically-centered {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .app-drawer__column {
    width: 100%;
  }
}
</style>
