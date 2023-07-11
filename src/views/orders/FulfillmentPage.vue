<template>
  <BaseTabs
    v-model="tab"
    :tabs="tabs"
    tab-row-variant="styled"
  />
  <router-view />
</template>
<script>
import BaseTabs from '@/components/base/BaseTabs';
import { mapStores } from 'pinia';
import { useFulfillmentStore } from '@/store/fulfillment';

export default {
  name: 'FulfillmentPage',
  components: {BaseTabs},
  data() {
    return {
      tab: 'ordersPendingPick',
    };
  },
  computed: {
    ...mapStores(useFulfillmentStore),
    tabs() {
      return [
        {
          text: 'Picking',
          value: 'ordersPendingPick',
          route: 'ordersPendingPick',
          count: this.fulfillmentStore.getPickingTabCount,
        },
        {
          text: 'Cutting',
          value: 'ordersCutting',
          route: 'ordersCutting',
        },
        {
          text: 'Programming',
          value: 'ordersProgramming',
          route: 'ordersProgramming',
        },
        {
          text: 'Exceptions',
          value: 'ordersExceptions',
          route: 'ordersExceptions',
          canHaveException: true,
        },
      ];
    },
  },
};
</script>
