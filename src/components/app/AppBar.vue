<template>
  <v-app-bar
    name="app-bar"
    elevation="0"
    color="primary"
    :width="appStore.appNavigationDrawerWidth"
    class="px-3 pl-md-6"
    style="z-index: 1010 !important;"
  >
    <div
      class="d-flex justify-space-between align-center flex-grow-1"
    >
      <div class="d-flex align-center">
        <v-btn
          v-if="!isMobileDisplay"
          class="app-bar__rail-toggle bg-primary-lighten-4 rounded-circle"
          elevation="3"
          size="20"
          @click.stop="toggleRail"
        >
          <v-icon
            :icon="toggleIcon ? 'fal fa-angle-right' : 'fal fa-angle-left'"
            size="16"
          />
        </v-btn>
        <v-btn
          v-else
          color="white"
          elevation="0"
          @click.stop="toggleNavigation"
        >
          <v-icon
            icon="far fa-bars"
            size="24"
          />
        </v-btn>

        <AppTitleGroup
          :page-category="routeMeta.category"
          :page-title="routeMeta.title"
          class="pl-3"
        />
      </div>
      <div class="d-flex align-center">
        <AppSearch />
        <v-btn class="d-flex align-center ml-4 text-h4">
          Advanced Search
          <v-icon
            icon="fas fa-chevron-down"
            color="text-white"
            class="ml-2"
            size="20"
          />
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>
<script>
import {useAppStore} from '@/store/app';
import {mapStores} from 'pinia';
import AppTitleGroup from '@/components/app/AppTitleGroup';
import AppSearch from '@/components/app/AppSearch';

export default {
  name: 'AppBar',
  components: {AppSearch, AppTitleGroup},
  data() {
    return {
      toggleIcon: false,
    };
  },
  computed: {
    ...mapStores(useAppStore),
    isMobileDisplay() {
      return this.$vuetify.display.mdAndDown;
    },
    routeMeta() {
      return {
        category: this.$route.meta.category,
        title: this.$route.meta.title,
      };
    },
  },
  methods: {
    toggleNavigation() {
      this.toggleIcon = this.appStore.isAppNavigationDrawerOpen = !this.appStore.isAppNavigationDrawerOpen;
    },
    toggleRail() {
      this.toggleIcon = this.appStore.isAppNavigationDrawerRailActive = !this.appStore.isAppNavigationDrawerRailActive;
    }
  }
};
</script>

<style scoped lang="scss">
.v-app-bar {
  z-index: 1007 !important;
  overflow: unset;
}
.app-bar__rail-toggle {
  position: relative;
  left: -34px;
}
</style>
