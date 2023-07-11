<template>
  <div>
    <slot name="app-top-bar">
      <AppSystemBar class="d-none" />
    </slot>
    <slot name="app-footer-bar">
      <AppFooterBar />
    </slot>
    <v-main>
      <slot name="default" />
    </v-main>
  </div>
</template>

<script>
import AppFooterBar from '@/components/app/AppFooterBar.vue';
import AppSystemBar from '@/components/app/AppSystemBar.vue';

export default {
  name: 'DesktopLayout',
  components: {
    AppFooterBar,
    AppSystemBar,
  },
};
</script>
