<template>
  <router-link
    :to="{ name: routeName }"
    class="ma-2"
  >
    <div
      class="desktop-item"
    >
      <div>
        <div class="folder-icon">
          <div class="folder-icon__back" />
          <div class="folder-icon__front text-black text-caption font-weight-semibold text-center">
            {{ title }}
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { mapStores } from 'pinia';
import { useUiStore } from '@/store/ui';
export default {
  name: 'FolderLink',
  props: {
    title: {
      type: String,
      default: '',
    },
    routeName: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapStores(useUiStore),
  },
};
</script>

<style scoped>

.folder-icon {
  position: relative;
  width: 80px;
  height: 75px;
  margin: auto;
}

.folder-icon__back {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0 10px 10px 10px;
  border: 2px solid black;
  background: #fae2b6;
}

.folder-icon__back:after {
  content: '';
  position: absolute;
  top: -5px;
  border-radius: 6px 8px 0 0;
  left: -2px;
  width: 34px;
  height: 5px;
  border: 2px solid black;
  border-bottom: none;
  background: #f6d898;
  //transform: skew(-27deg);
}

.folder-icon__front {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 65px;
  border: 2px solid black;
  background: #ffd57c;
  transform: skewX(-5deg);
  transform-origin: bottom;
  border-radius: 10px;
  transition: all 0.25s ease;
}

.router-link-active .folder-icon__front {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 62px;
  border: 2px solid black;
  transform: skewX(-15deg);
  transform-origin: bottom;
  border-radius: 10px;
}
</style>
