<template>
  <div class="min-window">
    <div class="min-window__header px-1">
      <p class="text-caption">
        {{ window.windowContentNode.name }}
      </p>
    </div>
    <div class="min-window__content">
      <v-divider
        vertical
        class="ml-5"
      />
    </div>
  </div>
</template>

<script>
// import FolderIcon from '@/components/icons/FolderIcon.vue';

export default {
  name: 'MinWindow',
  // components: {
  //   FolderIcon
  // },
  props: {
    window: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped lang="scss">
.min-window {
  width: 100px;
  height: 75px;
  border-radius: 5px;
  background-color: white;
  border: 1px solid black;
  overflow: hidden;
}
.min-window__header {
  height: 20px;
  background-color: #f1ebde;
  border-bottom: 1px solid black;
}
.min-window__content {
  position: relative;
  height: 55px;
  background-color: white;
  &:after {
    content: "";
    position: absolute;
    width: 25px;
    top: 0;
    bottom: 0;
    left: 0;
    background: #f1ebde;
    border-right: 1px solid black;
  }
}
</style>
