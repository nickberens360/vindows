<template>
  <div>
    <div
      class="folder-icon mb-2"
      :class="{ 'folder-icon--active': hasActiveAnimation }"
    >
      <div class="folder-icon__back" />
      <div class="folder-icon__front text-black text-caption font-weight-semibold text-center line-height-1">
        <p
          v-if="!showLabelBelow"
          class="text-caption text-center font-weight-medium text-black"
        >
          {{ label }}
        </p>
      </div>
    </div>
    <p
      v-if="showLabelBelow"
      class="text-caption text-center font-weight-medium text-black line-height-1"
    >
      {{ label }}
    </p>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useWindowManagerStore } from '@/store/windowManager';
export default {
  name: 'FolderIcon',
  props: {
    title: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'sm',
    },
    label: {
      type: String,
      default: '',
    },
    showLabelBelow: {
      type: Boolean,
      default: false,
    },
    hasActiveAnimation: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapStores(useWindowManagerStore),
    folderSize() {
      switch (this.size) {
      case 'sm':
        return {
          width: '45px',
          height: '38px',
          borderWidth: '1px',
          borderRadiusOffset: '-1px',
          borderRadius: '4px',
          tabWidth: '18px',
          tabHeight: '3px',
          tabHeightOffset: '-3px',
          folderFrontHeight: '35px',
          folderFrontSkew: 'skewX(-10deg)',
        };
      case 'lg':
        return {
          width: '80px',
          height: '75px',
          borderWidth: '2px',
          borderRadiusOffset: '-2px',
          borderRadius: '10px',
          tabWidth: '34px',
          tabHeight: '5px',
          tabHeightOffset: '-5px',
          folderFrontHeight: '65px',
          folderFrontSkew: 'skewX(-5deg)',
          activeHeight: '62px',
          activeSkew: 'skewX(-15deg)',
        };
      default:
        return {
          width: '45px',
          height: '38px',
          borderWidth: '1px',
          borderRadiusOffset: '-1px',
          borderRadius: '4px',
          tabWidth: '18px',
          tabHeight: '3px',
          tabHeightOffset: '-3px',
          folderFrontHeight: '35px',
          folderFrontSkew: 'skewX(-10deg)',
        };
      }
    },
  },
};
</script>

<style scoped lang="scss">

.folder-icon {
  position: relative;
  width: v-bind('folderSize.width');
  height: v-bind('folderSize.height');
  margin: auto;
}

.folder-icon__back {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0 v-bind('folderSize.borderRadius') v-bind('folderSize.borderRadius') v-bind('folderSize.borderRadius');
  border: v-bind('folderSize.borderWidth') solid black;
  background: #fae2b6;
}

.folder-icon__back:after {
  content: '';
  position: absolute;
  border-radius: v-bind('folderSize.borderRadius') v-bind('folderSize.borderRadius') 0 0;
  top: v-bind('folderSize.tabHeightOffset');
  left: v-bind('folderSize.borderRadiusOffset');
  width: v-bind('folderSize.tabWidth');
  height: v-bind('folderSize.tabHeight');
  border: v-bind('folderSize.borderWidth') solid black;
  border-bottom: none;
  background: #f6d898;
}
.folder-icon__front {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: v-bind('folderSize.folderFrontHeight');
  border: v-bind('folderSize.borderWidth') solid black;
  background: #ffd57c;
  transform: v-bind('folderSize.folderFrontSkew');
  transform-origin: bottom;
  border-radius: v-bind('folderSize.borderRadius');
  transition: all 0.25s ease;
}

.router-link-active .folder-icon--active .folder-icon__front {
  height: v-bind('folderSize.activeHeight');
  transform: v-bind('folderSize.activeSkew');
}
</style>
