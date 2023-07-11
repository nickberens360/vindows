<template>
  <div class="mb-2">
    <v-toolbar
      flat
      style="cursor: pointer"
      @click="show = !show"
    >
      <v-toolbar-title>
        <v-icon
          :icon="show ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
          class="mr-2"
          size="16"
        />
        <slot name="titleBar">
          {{ title }}
        </slot>
      </v-toolbar-title>
    </v-toolbar>
    <v-expand-transition>
      <div v-if="show">
        <slot name="content" />
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  name: 'ExDocsToggle',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Title'
    },
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style scoped lang="scss">
:deep(.v-data-table) {
  margin-top: 0 !important;
}
</style>
