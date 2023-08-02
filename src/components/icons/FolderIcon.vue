<template>
  <div>
    <div class="folder-icon mb-2">
      <div class="folder-icon__back" />
      <div class="folder-icon__front text-black text-caption font-weight-semibold text-center line-height-1">
        <p
          v-if="!showLabelBelow"
          class="text-caption text-center font-weight-medium"
          text-black
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
import { useUiStore } from '@/store/ui';
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
  },
  computed: {
    ...mapStores(useUiStore),
  },
};
</script>

<style>
:root {
  --folder-border-radius: 4px;
  --folder-width: 45px;
  --folder-height: 40px;
  --folder-border-width: 1px;
  --folder-tab-width: 18px;
  --folder-tab-height: 3px;
  --folder-tab-height-offset: calc(-1 * var(--folder-tab-height));
}
</style>

<style scoped lang="scss">

.folder-icon {
  position: relative;
  width: var(--folder-width);
  height: var(--folder-height);
  margin: auto;
}

.folder-icon__back {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0 var(--folder-border-radius) var(--folder-border-radius) var(--folder-border-radius);
  border: var(--folder-border-width) solid black;
  background: #fae2b6;
}

.folder-icon__back:after {
  content: '';
  position: absolute;
  border-radius: var(--folder-border-radius) var(--folder-border-radius) 0 0;
  top: var(--folder-tab-height-offset);
  left: -1px;
  width: var(--folder-tab-width);
  height: var(--folder-tab-height);
  border: var(--folder-border-width) solid black;
  border-bottom: none;
  background: #f6d898;
}
.folder-icon__front {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 35px;
  border: var(--folder-border-width) solid black;
  background: #ffd57c;
  transform: skewX(-10deg);
  transform-origin: bottom;
  border-radius: 4px;
  transition: all 0.25s ease;
}

//.router-link-active .folder-icon__front {
//  position: absolute;
//  bottom: 0;
//  left: 0;
//  width: 100%;
//  height: 70px;
//  border: 1px solid black;
//  transform: skewX(15deg);
//  transform-origin: bottom;
//  border-radius: 10px;
//}
</style>
