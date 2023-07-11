<template>
  <div>
    <AdvancedSearch />
    <OrdersRow
      v-for="(order, index) in ordersStore.orderSearchResults"
      :key="index + order.sessionId"
      :order="order"
      @click="setActiveOrder(order.sessionId)"
    />
    <AppDrawer
      v-model:is-open="isDrawerOpen"
      color="primary-lighten-4"
      location="right"
      :width="600"
      close-btn-location="left"
      temporary
    >
      <template #default>
        <div v-if="hasActivity">
          <BaseTabs
            v-model="activeDrawerTab"
            :tabs="tabs"
            align-tabs="center"
            class="mb-6"
          />
          <v-window v-model="activeDrawerTab">
            <v-window-item value="details">
              <SummaryGroup
                v-if="orderLoaded && hasActivity"
                :order="orderDetails"
              />
              <v-progress-linear
                v-if="!orderLoaded"
                indeterminate
                color="primary"
                size="124"
              />
            </v-window-item>
            <v-window-item value="activity">
              <ActivityTimeline
                v-if="orderLoaded && hasActivity"
                :order-activity="orderDetails.activity"
              />
              <v-progress-linear
                v-if="!orderLoaded"
                indeterminate
                color="primary"
                size="124"
              />
            </v-window-item>
          </v-window>
        </div>
        <SummaryGroup
          v-if="orderLoaded && !hasActivity"
          :order="orderDetails"
        />
        <v-progress-linear
          v-if="!orderLoaded"
          indeterminate
          color="primary"
          size="124"
        />
      </template>
    </AppDrawer>
  </div>
  <Suspense>
    <router-view />
  </Suspense>
</template>

<script>

import { computed } from 'vue';
import { mapStores } from 'pinia';
import { useAppStore } from '@/store/app';
import { useOrdersStore } from '@/store/orders';
import AdvancedSearch from '@/components/orders/common/AdvancedSearch.vue';
import AppDrawer from '@/components/app/AppDrawer';
import ActivityTimeline from '@/components/orders/management/index/ActivityTimeline.vue';
import OrdersRow from '@/components/orders/management/index/OrdersRow.vue';
import SummaryGroup from '@/components/orders/management/index/SummaryGroup.vue';
import BaseTabs from '@/components/base/BaseTabs';

export default {
  name: 'ManagementPage',
  components: {
    BaseTabs,
    AppDrawer,
    AdvancedSearch,
    OrdersRow,
    ActivityTimeline,
    SummaryGroup,
  },
  provide() {
    return { order: computed(() => this.orderDetails) };
  },
  data: () => ({
    isDrawerOpen: false,
    orderLoaded: false,
    activeDrawerTab: '',
    tabs: [
      {
        text: 'Details',
        value: 'details',
      },
      {
        text: 'Activity',
        value: 'activity',
      },
    ],
  }),
  computed: {
    ...mapStores(useAppStore, useOrdersStore),
    orderDetails() {
      return this?.ordersStore?.orderDetails || {};
    },
    hasActivity() {
      let activityItems = ['Capture', 'Refund'];
      if (this.orderLoaded) {
        return !!this.orderDetails.activity.find((item) =>
          activityItems.includes(item.type)
        );
      } else {
        return false;
      }

    },
  },
  methods: {
    async setActiveOrder(sessionId) {
      this.orderLoaded = false;
      this.activeDrawerTab = 'details';
      this.isDrawerOpen = true;
      await this.ordersStore.fetchOrderDetails(sessionId);
      this.orderLoaded = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
