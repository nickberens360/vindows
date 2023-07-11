<template>
  <SelectionGroup
    :items="items"
    item-key="transactionId"
    class="key-item-row"
  >
    <template #left>
      <img
        :src="transponderSrc"
        class="mr-4"
        alt
      >
    </template>
    <template #center="{item: order}">
      <v-row
        no-gutters
        class="key-item-row__center-content"
        justify="space-between"
      >
        <v-col
          cols="auto"
        >
          <KeySku
            :order-items="order.items"
            :transaction-id="order.transactionId"
            :hide-transaction-id="hideTransactionIdUnderSku"
          />
        </v-col>
        <v-col
          v-if="!hideDate"
          cols="4"
        >
          <KeyOrderDate
            :timestamp="order.timestamp"
            :transaction-id="order.transactionId"
            :hide-transaction-id="hideTransactionIdUnderDate"
          />
        </v-col>
        <v-col cols="auto">
          <DetailLabelValue
            primary-label="Qty."
            :primary-value="orderQuantity(order)"
            variant="bold"
          />
        </v-col>
        <v-col
          v-if="showReprintBtn"
          cols="auto"
          class="align-self-center"
        >
          <v-btn
            variant="outlined"
            color="primary"
          >
            <v-icon
              icon="fas fa-envelope"
              class="mr-2"
            />
            Reprint label
          </v-btn>
        </v-col>
      </v-row>
    </template>
    <template #right>
      <slot name="right" />
    </template>
  </SelectionGroup>
</template>

<script>
import KeySku from '@/components/orders/fulfillment/KeySku';
import KeyOrderDate from '@/components/orders/fulfillment/KeyOrderDate';
import transponderSrc from '@/assets/mockImages/transponder.png';
import SelectionGroup from '@/components/base/SelectionGroup';
import DetailLabelValue from '@/components/base/DetailLabelValue';

export default {
  name: 'KeyItemRow',
  components: { KeyOrderDate, KeySku, SelectionGroup, DetailLabelValue},
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    sku: {
      type: String,
      default: '',
    },
    timestamp: {
      type: String,
      default: '',
    },
    transactionId: {
      type: String,
      default: '',
    },
    centerContentWidth: {
      type: String,
      default: 'auto',
    },
    hideTransactionIdUnderSku: {
      type: Boolean,
      default: false,
    },
    hideTransactionIdUnderDate: {
      type: Boolean,
      default: false,
    },
    showReprintBtn: {
      type: Boolean,
      default: false,
    },
    hideDate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      transponderSrc,
    };
  },
  computed: {
    centerContentStyle() {
      return {
        maxWidth: this.centerContentWidth,
      };
    },
  },
  methods: {
    orderQuantity(order) {
      return order.items.reduce((sum, item) => sum + item.quantity, 0);
    },
  },
};
</script>

<style scoped lang="scss">
.key-item-row__center-content {
  max-width: v-bind(centerContentWidth);
}
:deep(.item-row) {
  box-shadow: 0px 3px 3px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 3px 4px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 8px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)) !important;
  margin-bottom: 8px;
  width: 100% !important;
}
</style>
