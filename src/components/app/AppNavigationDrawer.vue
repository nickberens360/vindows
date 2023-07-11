<template>
  <v-navigation-drawer
    v-model="appStore.isAppNavigationDrawerOpen"
    name="app-navigation-drawer"
    color="blue-grey"
    location="left"
    :rail="appStore.isAppNavigationDrawerRailActive"
    :expand-on-hover="true"
    :rail-width="appStore.appNavigationRailWidth"
    clipped
    width="300"
    :class="{'rail-is-active': appStore.isAppNavigationDrawerRailActive}"
    class="px-0"
  >
    <template #prepend>
      <AppUserBox />
    </template>
    <v-list
      v-model:opened="open"
      density="compact"
      nav
    >
      <v-list-group
        v-for="item in navItemsList"
        :key="item.value"
        :value="item.value"
        collapse-icon="fas fa-caret-up"
        expand-icon="fas fa-caret-down"
        class="px-2"
        :class="{'has-active-sub-item': $route.meta.category === item.title}"
      >
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            :title="item.title"
            exact
          >
            <template #prepend>
              <v-icon
                v-if="item.icon"
                size="24"
              >
                {{ item.icon }}
              </v-icon>
            </template>
          </v-list-item>
        </template>
        <v-list-item
          v-for="subItem in item.children"
          :key="subItem.value"
          :title="subItem.title"
          :value="subItem.value"
          :to="{name: subItem.routeName}"
        />
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script>

import {useAppStore} from '@/store/app';
import {mapStores} from 'pinia';
import arrowRight from '@/assets/images/arrow-right-solid.svg';
import AppUserBox from '@/components/app/AppUserBox';

export default {
  name: 'AppNavigationDrawer',
  components: {AppUserBox},
  data: () => ({
    open: ['orders'],
    navItems: [
      {
        title: 'Dev',
        value: 'dev',
        icon: 'fal fa-code',
        children: [
          {
            title: 'Component Docs',
            value: 'componentDocs',
            routeName: 'componentDocs',
          },
        ],
      },
      {
        title: 'Orders',
        value: 'orders',
        icon: 'fal fa-box-dollar',
        children: [
          {
            title: 'Management',
            value: 'ordersManagement',
            routeName: 'ordersManagement',
          },
          {
            title: 'Fulfillment',
            value: 'ordersPendingPick',
            routeName: 'ordersPendingPick',
          },
        ],
      },
      {
        title: 'Product Management',
        value: 'productManagement',
        icon: 'fal fa-cubes',
        children: [
          {
            title: 'Design',
            value: 'productDesign',
            routeName: 'productDesign',
          },
          {
            title: 'Marketing',
            value: 'productMarketing',
            routeName: 'productMarketing',
          },
          {
            title: 'Pricing',
            value: 'productPricing',
            routeName: 'productPricing',
          },
        ],
      },
      {
        title: 'Kiosk Fleet',
        value: 'kioskFleet',
        icon: 'fal fa-route',
        children: [
          {
            title: 'Locations',
            value: 'fleetLocations',
            routeName: 'kioskFleetLocations',
          },
          {
            title: 'Territory',
            value: 'fleetTerritory',
            routeName: 'kioskFleetTerritory',
          },
          {
            title: 'TSO Support',
            value: 'fleetTSOSupport',
            routeName: 'kioskFleetTSOSupport',
          },
        ],
      },
      {
        title: 'Kiosk Tech',
        value: 'kioskTech',
        icon: 'fal fa-screwdriver-wrench',
        children: [
          {
            title: 'Kiosks',
            value: 'kioskTechKiosks',
            routeName: 'kioskTechKiosks',
          },
          {
            title: 'Inventory',
            value: 'kioskTechInventory',
            routeName: 'kioskTechInventory',
          },
          {
            title: 'Shipments',
            value: 'kioskTechShipments',
            routeName: 'kioskTechShipments',
          },
          {
            title: 'Service Route Planner',
            value: 'kioskTechServiceRoutePlanner',
            routeName: 'kioskTechServiceRoutePlanner',
          },

        ],
      },
      {
        title: 'System Admin',
        value: 'systemAdmin',
        icon: 'fal fa-cog',
        children: [
          {
            title: 'Users',
            value: 'systemAdminUsers',
            routeName: 'systemAdminUsers',
          },
          {
            title: 'Permissions',
            value: 'systemAdminPermissions',
            routeName: 'systemAdminPermissions',
          },
        ],
      },
    ],
  }),
  computed: {
    ...mapStores(useAppStore),
    navItemsList() {
      return import.meta.env.PROD
        ? this.navItems.filter((item) => item.title !== 'Dev')
        : this.navItems;
    },
    setArrowRight() {
      return `url(${arrowRight})`;
    },
  },
};
</script>

<style lang="scss" scoped>

// Base overrides
.v-list-group {
  margin-bottom: 16px;
}

:deep(.v-list-item--nav .v-list-item-title) {
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
}

.v-list-item {
  color:  rgb(var(--v-theme-primary-darken-1));
  height: 36px;
}

.v-list-group__items .v-list-item--active {
  background-color: rgb(var(--v-theme-blue-grey));
  background-image: v-bind('setArrowRight');
  background-repeat: no-repeat;
  background-position: 20px 50%;
  background-size: 10px;
  color: rgb(var(--v-theme-white));
  .v-list-item-title {
    font-weight: 400;
  }
}

:deep(.v-list-group__items .v-list-item--active .v-list-item-title) {
  font-weight: 700;
}

:deep(.v-list-item:not(.v-list-item--active)){
  &:hover {
    background-color: rgb(var(--v-theme-primary-lighten-3)) ;
  }
}

:deep(.v-icon) {
  opacity: 1 !important;
}

.v-list--nav {
  padding-inline-start: 0;
  padding-inline-end: 0;
}

.v-list-item__prepend > .v-icon {
  padding-left: 18px;
}

// if the list group has an active sub item, then make the background color of the list group header the same as the open list header
.v-list-group.has-active-sub-item {
  .v-list-group__header {
    background-color: rgb(var(--v-theme-blue-grey-darken-1));
    color: rgb(var(--v-theme-white));
  }
  &.v-list-group--open {
    background-color: rgb(var(--v-theme-primary-lighten-4)) ;
  }
}

// active list group styles
.v-list-group--open {
  transition: padding 0.3s;
  padding-bottom: 8px;
  padding-top: 8px;
  background-color: transparent;
  .v-list-group__header {
    background-color: rgb(var(--v-theme-primary-lighten-3)) ;
  }
}

//if the rail is active and the drawer is not hovering, then hide the list group items
.rail-is-active:not(.v-navigation-drawer--is-hovering) {
  .v-list-group--open {
    background: none;
    margin-bottom: 0;
  }
  .v-list-group {

    :not(.v-list-item--active) {
      background: none;
    }

    :deep(.v-list-group__items) {
      display: none;
    }

    :deep(.v-list-item__content) {
      display: none;
    }

    :deep(.v-list-item__append) {
      display: none;
    }

    :deep(.v-list-item__prepend > .v-icon) {
      margin-inline-end: 0;
    }

    .v-list-item {
      display: flex;
      justify-content: center;
    }
    .v-list-item__prepend > .v-icon {
      padding-left: 0;
    }
  }
}
</style>
