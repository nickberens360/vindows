<template>
  <div>
    <div class="folder-icon">
      <div class="folder-icon__back" />
      <div class="folder-icon__front text-black text-caption font-weight-semibold text-center">
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
      class="text-caption text-center font-weight-medium text-black"
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

<style scoped lang="scss">

.folder-icon {
  position: relative;
  width: 45px;
  height: 40px;
  margin: auto;
}

.folder-icon__back {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0 5px 5px 5px;
  border: 1px solid black;
  background: #f6d898;
}

.folder-icon__back:after {
  content: '';
  position: absolute;
  border-radius: 4px 8px 0 0;
  left: -1px;
  width: 18px;
  top: -3px;
  height: 3px;
  border: 1px solid black;
  border-bottom: none;
  background: #f6d898;
}
.folder-icon__front {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 35px;
  border: 1px solid black;
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
