<template>
  <VListGroup
    v-if="navItems.type === 'directory'"
    :value="navItems.label"
  >
    <template #activator="{ props }">
      <v-list-item
        v-bind="props"
        :title="navItems.label"
        prepend-icon="far fa-folder"
        append-icon=""
      />
    </template>
    <template
      v-for="(child, index) in sortedChildren"
      :key="index"
    >
      <RecursiveNavItem
        v-if="child.type === 'directory'"
        :nav-items="child"
        @nav-click="$emit('nav-click', $event)"
      />

      <VListItem
        v-else
        :title="child.label"
        :value="child.label"
        prepend-icon="far fa-file"
        append-icon=""
        @click="$emit('nav-click', child)"
      />
    </template>
  </VListGroup>

  <VListItem
    v-else
    :title="navItems.label"
    :value="navItems.label"
    @click="$emit('nav-click', navItems)"
  />
</template>
<script>
export default {
  name: 'RecursiveNavItem',
  props: {
    navItems: {
      type: [Array, Object],
      required: true,
      default: () => []
    },
  },
  emits: ['nav-click'],
  computed: {
    sortedChildren() {
      return Object.values(this.navItems.children || {}).sort((a) => a.type === 'directory' ? -1 : 1);
    }
  }
};
</script>
<style lang="scss" scoped>
:deep(.v-icon) {
  font-size: 16px !important;
}
:deep(.v-list-item__prepend > .v-icon) {
  margin-inline-end: 16px;
}
:deep(.v-list-group__items .v-list-item) {
  padding-inline-start: calc(-9px + var(--indent-padding)) !important;
}
</style>
