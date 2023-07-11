<template>
  <div>
    <KeyItemRow
      v-if="pendingPickItemsSortedASC.length > 0"
      v-model="selectedItems"
      :items="pendingPickItemsSortedASC"
      hide-transaction-id-under-sku
      center-content-width="640px"
    />
    <AppDrawer
      is-open
      location="right"
      hide-close-btn
      :width="600"
      color="primary-lighten-4"
      floating
      no-padding
    >
      <template #default>
        <div class="d-flex justify-center pa-8 pb-4">
          <QuantityCircle
            :quantity="quantity"
            :color="circleColor"
            size="md"
          />
        </div>
        <v-container fluid>
          <transition-group
            name="list"
            tag="div"
          >
            <ItemDetailsCard
              v-for="item in selectedItems"
              :key="item.transactionId"
              :items="item.items"
              :quantity="orderItemQuantity(item.items)"
              :date="item.timestamp"
              :transaction-id="item.transactionId"
              class="mb-4"
            >
              <template #left>
                <img
                  :src="transponderSrc"
                  class="mr-4"
                  alt
                >
              </template>
            </ItemDetailsCard>
          </transition-group>
        </v-container>
      </template>
      <template #append>
        <ActionBar color="blue-grey">
          <template #right>
            <v-btn
              variant="flat"
              color="primary"
              :disabled="!selectedItems.length"
              @click="handlePrintAll"
            >
              PRINT ALL
            </v-btn>
          </template>
        </ActionBar>
      </template>
    </AppDrawer>
  </div>
</template>

<script>

import AppDrawer from '@/components/app/AppDrawer';
import ActionBar from '@/components/base/ActionBar';
import QuantityCircle from '@/components/base/QuantityCircle';
import ItemDetailsCard from '@/components/base/ItemDetailsCard';
import KeyItemRow from '@/components/orders/fulfillment/KeyItemRow';

import { mapStores } from 'pinia';
import { useFulfillmentStore } from '@/store/fulfillment';
import transponderSrc from '@/assets/mockImages/transponder.png';

export default {
  name: 'PendingPickPage',
  components: {
    KeyItemRow,
    ItemDetailsCard,
    QuantityCircle,
    ActionBar,
    AppDrawer
  },
  data() {
    return {
      selectedItems: [],
      transponderSrc,
    };
  },
  computed: {
    ...mapStores(useFulfillmentStore),
    circleColor() {
      return this.selectedItems.length === 0 ? 'primary-lighten-3' : 'blue-grey-darken-1';
    },
    quantity() {
      return this.selectedItems.length;
    },
    pendingPickItemsSortedASC() {
      let list = [...this.fulfillmentStore.pendingPickList];
      return list.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    },
  },
  async mounted() {
    await this.fulfillmentStore.fetchPendingPickList();
  },
  methods: {
    orderItemQuantity(items) {
      return items.reduce((total, item) =>
        total + item.quantity, 0
      );
    },
    handlePrintAll() {
      this.fulfillmentStore.postToPickList(this.selectedItems);
      this.$router.push({ name: 'ordersPickInProgress' });
    },
  },
};
</script>

<style scoped lang="scss">
:deep(.v-btn.v-btn--disabled) {
  opacity: .7;
  .v-btn__overlay {
    background: rgb(var(--v-theme-primary)) !important;
    color: white !important;
  }
}
</style>
