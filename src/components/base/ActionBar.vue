<template>
  <v-toolbar
    class="toolbar"
    color="primary"
    elevation="0"
  >
    <template #prepend>
      <slot name="left" />
    </template>
    <template #default>
      <slot name="center" />
    </template>
    <template #append>
      <slot name="right" />
    </template>
  </v-toolbar>
</template>

<script>
export default {
  name: 'ActionBar'
};
</script>

<style scoped>

</style>
