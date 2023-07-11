<template>
  <v-sheet
    id="menu-activator"
    :height="appStore.appBarHeight"
    class="user-box d-flex align-center justify-space-between pa-0 mb-4"
    color="primary-lighten-4"
  >
    <v-list-item
      nav
      width="100%"
    >
      <template #prepend>
        <v-avatar
          color="primary-lighten-1"
          class="ml-2"
          size="40"
        >
          <span>{{ userStore?.initials || '' }}</span>
        </v-avatar>
      </template>
      <template
        #title
      >
        <p
          class="user-box__name font-weight-medium text-body-2 text-primary-darken-1"
        >
          {{ userStore?.fullName || '' }}
        </p>
      </template>
    </v-list-item>
    <v-menu activator="#menu-activator">
      <v-list>
        <v-list-item
          :to="{name: 'login'}"
          @click="userStore.logout"
        >
          logout
        </v-list-item>
      </v-list>
    </v-menu>
  </v-sheet>
</template>

<script>
import {useAppStore} from '@/store/app';
import {useUserStore} from '@/store/user';
import {mapStores} from 'pinia';

export default {
  name: 'AppUserBox',
  computed: {
    ...mapStores(useAppStore, useUserStore),
  },
};
</script>

<style scoped lang="scss">
.user-box {
  cursor: pointer;
}
.user-box__name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
}
:deep(.v-list-item){
  &:hover {
    background: none !important;
  }
}
</style>
