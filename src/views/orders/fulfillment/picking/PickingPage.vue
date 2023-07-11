<template>
  <BaseTabs
    v-model="tab"
    :tabs="tabs"
    tab-variant="secondary"
    tab-row-variant="styled"
  />
  <v-container fluid>
    <router-view />
  </v-container>
</template>

<script>
import BaseTabs from '@/components/base/BaseTabs';
import { mapStores } from 'pinia';
import { useFulfillmentStore } from '@/store/fulfillment';
export default {
  name: 'PickingPage',
  components: {BaseTabs},
  data() {
    return {
      tab: 'ordersPickInProgress',
    };
  },
  computed: {
    ...mapStores(useFulfillmentStore),
    tabs() {
      return [
        {
          text: 'Pending Pick',
          value: 'ordersPendingPick',
          route: 'ordersPendingPick',
          count: this.fulfillmentStore.pendingPickList.length,
        },
        {
          text: 'Picking',
          value: 'ordersPickInProgress',
          route: 'ordersPickInProgress',
          count: this.fulfillmentStore.pickList.length,
        },
        {
          text: 'Picked',
          value: 'ordersPicked',
          route: 'ordersPicked',
          count: this.fulfillmentStore.pickedList.length,
        }
      ];
    }
  },
};
</script>

<style scoped>

</style>
