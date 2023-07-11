<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
    style="background-color: white"
  >
    <div
      v-if="order"
      class="order-details"
    >
      <AppDetailsBar>
        <template
          #extension
        >
          <v-expand-transition>
            <div
              v-if="isReceiptDrawerOpen"
              v-click-outside="onClickOutside"
              class="receipt-form-extension bg-white w-100 elevation-5 pa-6 d-flex flex-column justify-center align-center"
            >
              <div class="receipt-form-extension__container">
                <ReceiptForms
                  :session="order?.session"
                  :customer="order?.customer"
                  class="pb-4"
                  @receipt-submission-cancelled="isReceiptDrawerOpen = false"
                  @receipt-submission-complete="isReceiptDrawerOpen = false"
                />
              </div>
            </div>
          </v-expand-transition>
        </template>
      </AppDetailsBar>

      <div class="order-details__info-header mb-2">
        <InfoRow
          class="py-9 pl-12 pr-3"
          @send-receipt="isReceiptDrawerOpen = true"
        />
      </div>
      <div class="order-details__item-content d-flex px-2">
        <div class="order-details__table-container mr-2">
          <DetailsTableHeader
            :all-items-selected="allItemsSelected"
            :number-of-items="itemsExcludingShipping.length"
            @refund-all-checked="handleCheckAllItems"
          />
          <div class="order-details__table d-flex flex-column h-100 pa-0">
            <DetailsItemRow
              v-for="item in itemsExcludingShipping"
              :key="item.id"
              v-model="itemsChecked[item.id]"
              :order-item="item"
              :item-refundable="orderRefundable"
              :item-refunded="!!itemsRefunded[item.id]"
              :item-selected="!!itemsChecked[item.id]"
              @check-item="handleItemCheck"
            />
            <v-spacer />
            <v-toolbar
              class="order-details__table-footer"
              color="white"
              height="68"
            >
              <v-spacer />
              <v-btn
                class="text-body-4"
                color="primary"
                prepend-icon="fas fa-paper-plane"
                variant="outlined"
                @click="isReceiptDrawerOpen = true"
              >
                Send Receipt
              </v-btn>
            </v-toolbar>
          </div>
        </div>
        <div class="order-details__refund-container">
          <RefundDrawer
            :selected-items="selectedItems"
            @refund-complete="handleRefundComplete"
          />
        </div>
      </div>
    </div>
  </v-dialog>
</template>
<script>

import { computed } from 'vue';
import { mapStores } from 'pinia';
import { useAppStore } from '@/store/app';
import { useRoute } from 'vue-router';
import { useOrdersStore } from '@/store/orders';
import { useTransactionInfo } from '@/composables/orders/TransactionInfo';
import AppDetailsBar from '@/components/app/AppDetailsBar.vue';
import DetailsItemRow from '@/components/orders/management/details/DetailsItemRow.vue';
import DetailsTableHeader from '@/components/orders/management/details/DetailsTableHeader.vue';
import InfoRow from '@/components/orders/management/details/InfoRow';
import RefundDrawer from '@/components/orders/management/details/RefundDrawer.vue';
import ReceiptForms from '@/components/orders/management/common/ReceiptForms.vue';

export default {
  name: 'OrderDetails',
  components: {
    AppDetailsBar,
    DetailsItemRow,
    DetailsTableHeader,
    InfoRow,
    RefundDrawer,
    ReceiptForms,
  },
  provide() {
    return {
      order: computed(() => {
        return this.order;
      }),
    };
  },
  async setup() {
    let { sessionId } = useRoute().params;
    let ordersStore = useOrdersStore();
    let order = computed(() => ordersStore.orderDetails);
    let shippingRefunded = computed(() => ordersStore.getIsShippingRefunded);
    if (!order.value || order.value.session.sessionId !== sessionId) {
      await ordersStore.fetchOrderDetails(sessionId);
    }

    let { kioskRefundable, paymentTypeRefundable } = useTransactionInfo(order);
    return {
      kioskRefundable,
      order,
      paymentTypeRefundable,
      shippingRefunded,
    };
  },
  data: () => ({
    allItemsSelected: false,
    itemsChecked: {},
    itemsRefunded: {},
    orderItems: [],
    selectedItems: [],
    isReceiptDrawerOpen: false,
    dialog: true,
  }),
  computed: {
    ...mapStores(useAppStore, useOrdersStore),
    itemsExcludingShipping() {
      return this.orderItems.filter((item) => item.type !== 'SH');
    },
    itemsInOrder() {
      return JSON.parse(JSON.stringify(this.order.items));
    },
    orderRefundable() {
      return this.kioskRefundable && this.paymentTypeRefundable;
    },
    refundableItems() {
      return this.itemsExcludingShipping.filter((item) => {
        if (!this.itemsRefunded[item.id]) return item;
      });
    },
  },
  created() {
    this.individualizeOrderItems();

    let checkedItems = {};
    this.refundableItems.forEach((item) => {
      checkedItems[item.id] = false;
    });
    this.itemsChecked = checkedItems;
  },
  methods: {
    handleCheckAllItems() {
      this.allItemsSelected = !this.allItemsSelected;
      this.selectedItems = this.allItemsSelected ? this.refundableItems : [];
      let items = {};
      for (const itemId in this.itemsChecked) {
        items[itemId] = this.allItemsSelected;
      }
      this.itemsChecked = items;
    },
    handleItemCheck(id) {
      this.itemsChecked[id] = !this.itemsChecked[id];
      if (this.itemsChecked[id]) {
        let selectedItem = this.itemsExcludingShipping.find(
          (item) => item.id === id
        );
        this.selectedItems.push(selectedItem);
      } else {
        this.selectedItems = this.selectedItems.filter(
          (item) => item.id !== id
        );
      }
      this.allItemsSelected =
        this.selectedItems.length === this.refundableItems.length;
    },
    async handleRefundComplete() {
      this.allItemsSelected = true;
      this.handleCheckAllItems();
      this.itemsRefunded = {};
      await this.ordersStore.fetchOrderDetails(this.$route.params.sessionId);
      this.individualizeOrderItems();
    },
    individualizeOrderItems() {
      let items = [];
      let id = 0;

      this.itemsInOrder.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
          items.push({ ...item, id });
          id++;
        }
      });
      this.setOrderItemsRefundStatus();
      this.orderItems = items;
    },
    setOrderItemsRefundStatus() {
      let refundedItems = {};
      let id = 0;

      this.itemsInOrder.forEach((item) => {
        let numItemsRefunded = 0;
        item.refunds.forEach(
          (refundObj) => (numItemsRefunded += refundObj.quantity)
        );

        for (let i = 0; i < item.quantity; i++) {
          refundedItems[id] = i < numItemsRefunded;
          id++;
        }
      });
      this.itemsRefunded = refundedItems;
    },
    onClickOutside () {
      this.isReceiptDrawerOpen = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.order-details {
  &__info-header {
    border-bottom: 1px solid #e7e7e7;
  }
  &__item-content {
    height: calc(100vh - 339px);
  }
  &__table-container {
    border-color: rgb(var(--v-theme-grey-lighten-3));
    border-style: solid;
    border-width: 0 1px 0 1px;
    overflow: scroll;
    width: 100%;
  }
  &__table-footer {
    bottom: 0;
    box-shadow: 0px -2px 8px -1px rgba(0, 0, 0, 0.14) !important;
    padding-right: 15px;
    position: sticky;
    z-index: 1;
  }
  &__refund-container {
    width: 615px;
    flex: 1 0 615px;
  }
}

.receipt-form-extension {
  height: 500px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
}
.receipt-form-extension__container {
  max-width: 350px;
  margin: auto;
}

</style>
