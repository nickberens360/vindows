<template>
  <slot name="app-nav-drawer">
    <AppNavigationDrawer />
  </slot>
  <slot name="app-bar">
    <AppBar />
  </slot>
  <slot name="app-drawer" />
  <v-main>
    <slot name="default" />
  </v-main>
</template>

<script>
import AppNavigationDrawer from '@/components/app/AppNavigationDrawer';
import AppBar from '@/components/app/AppBar';

export default {
  name: 'DefaultLayout',
  components: {
    AppNavigationDrawer,
    AppBar,
  },
};
</script>
