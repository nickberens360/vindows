<template>
  <AppDragBox
    :id="id"
    class="file-window"
    :class="{active: isActive}"
    @drag-box-clicked="handleClick"
  >
    <template #default>
      <slot name="default" />
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
  },
};
</script>

<style scoped lang="scss">
.file-window {
  &.active {
    :deep(.drag-box) {
      box-shadow: 7px 7px 5px -3px rgba(0,0,0,0.36);
    }
  }
}

</style>
