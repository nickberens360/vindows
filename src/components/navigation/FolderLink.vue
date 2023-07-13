<template>
  <router-link
    :to="{ name: 'window', params: { id: window.id } }"
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
    window: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapStores(useUiStore),
  },
};
</script>

<style scoped>

.desktop-item {
  border-radius: 10px;
  width: 100px;
  height: 115px;
  min-height: 115px;
  min-width: 100px;
  max-height: 115px;
  max-width: 100px;
  margin: auto auto 15px;
}

.folder-icon {
  position: relative;
  width: 80px;
  height: 90px;
  margin: auto;
}

.folder-icon__back {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 2px solid black;
  background: #f6d898;
}

.folder-icon__back:after {
  content: '';
  position: absolute;
  top: -4px;
  border-radius: 8px 8px 0 0;
  left: 10px;
  width: 24px;
  height: 5px;
  border: 2px solid black;
  border-bottom: none;
  background: #f6d898;
  transform: skew(-27deg);
}

.folder-icon__back:before {
  content: '';
  position: absolute;
  top: -4px;
  border-radius: 8px 8px 0 0;
  left: 10px;
  width: 24px;
  height: 5px;
  border: 2px solid black;
  border-bottom: none;
  background: #f6d898;
  transform: skew(27deg);
}
.folder-icon__front {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  border: 2px solid black;
  background: #ffd57c;
  transform: skewX(5deg);
  transform-origin: bottom;
  border-radius: 10px;
  transition: all 0.25s ease;
}

.router-link-active .folder-icon__front {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  border: 2px solid black;
  transform: skewX(15deg);
  transform-origin: bottom;
  border-radius: 10px;
}
</style>
