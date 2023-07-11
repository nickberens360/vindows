<template>
  <ExampleComponent
    name="DetailsItemRow"
    file-path="@/components/compound/OrderDetails/ItemRow.vue"
  >
    <div
      v-if="itemType === 'multiple'"
      class="details-table"
    >
      <DetailsItemRow
        v-for="item in storeItems"
        :key="item.itemId"
        v-model="itemsChecked[item.itemId]"
        :order-item="item"
        :item-refundable="allowRefund"
        :item-refunded="!!item.refunds.length"
        :item-selected="!!itemsChecked[item.itemId]"
        @check-item="handleCheck"
      />
    </div>
    <div
      v-else
      class="details-table"
    >
      <DetailsItemRow
        :key="currentItem.itemId"
        v-model="itemsChecked[currentItem.itemId]"
        :order-item="currentItem"
        :item-refundable="allowRefund"
        :item-refunded="!!currentItem.refunds.length"
        :item-selected="!!itemsChecked[currentItem.itemId]"
        @check-item="handleCheck"
      />
    </div>
    <template #actions>
      <v-row class="d-flex align-center">
        <v-col cols="3">
          <v-btn
            class="mx-3"
            height="56"
            @click="toggleShowMultipleItems"
          >
            {{
              itemType !== "multiple"
                ? "Show multiple examples"
                : "Show single example"
            }}
          </v-btn>
        </v-col>
        <v-col
          v-if="itemType !== 'multiple'"
          cols="6"
          class="d-flex pa-0 align-center"
        >
          <v-text-field
            v-model="customization"
            class="mx-3 pt-5"
            clearable
            :disabled="!isCustomizable"
            :label="
              isCustomizable ? 'Customization Text' : 'Item Not Customizable'
            "
            variant="solo"
            @click:clear="resetMockItems"
          />
          <v-btn
            class="mx-3"
            height="56"
            @click="toggleRefunded"
          >
            {{ isRefunded ? "Show not refunded" : "Show refunded" }}
          </v-btn>
          <v-btn
            class="mx-3"
            height="56"
            @click="hasCoupons = !hasCoupons"
          >
            {{ hasCoupons ? "Hide coupons" : "Show coupons" }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center mt-0 mb-8">
        <v-col
          cols="2"
          class="d-flex align-center"
        >
          Number of items selected
          <v-chip
            class="text-white ml-2"
            color="primary"
            variant="elevated"
          >
            {{ selectedItems.length }}
          </v-chip>
        </v-col>
        <v-col>
          <v-btn
            class="pa-0 bg-teal-lighten-5"
            variant="text"
            @click.stop="showSelectedItems = !showSelectedItems"
          >
            Show Selected Items
            <v-icon
              v-if="!showSelectedItems"
              class="ml-1"
              icon="fas fa-chevron-down"
            />
            <v-icon
              v-else
              class="ml-1"
              icon="fas fa-chevron-up"
            />
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-expand-transition>
          <div v-if="showSelectedItems">
            <pre class="mb-4">
                {{ selectedItems }}
              </pre>
          </div>
        </v-expand-transition>
      </v-row>
      <ExDocsToggle title="Props">
        <template #content>
          <v-data-table
            :headers="propsHeaders"
            :items="propItems"
            hide-default-footer
            class="elevation-2 mt-4"
          >
            <template #[`item.controls`]="{ item }">
              <ExDocsSelect
                v-if="item.raw.name === 'orderItem'"
                v-model="itemType"
                :items="itemTypes"
                label="orderItemTypes"
              />
              <v-btn
                v-if="item.raw.name === 'itemRefundable'"
                :disabled="itemType === 'multiple'"
                @click="allowRefund = !allowRefund"
              >
                {{
                  allowRefund
                    ? "Show item non-refundable"
                    : "Show item Refundable"
                }}
              </v-btn>
              <v-btn
                v-if="item.raw.name === 'itemSelected'"
                :disabled="itemType === 'multiple'"
                @click="() => handleCheck(currentItem.itemId)"
              >
                {{
                  !!itemsChecked[currentItem?.itemId]
                    ? "Show unselected"
                    : "Show selected"
                }}
              </v-btn>
            </template>
            <template #bottom />
          </v-data-table>
        </template>
      </ExDocsToggle>
      <ExDocsToggle title="Events">
        <template #content>
          <v-data-table
            :headers="eventHeaders"
            :items="eventItems"
            hide-default-footer
            class="elevation-2 mt-4"
          >
            <template #bottom />
          </v-data-table>
        </template>
      </ExDocsToggle>
    </template>
  </ExampleComponent>
</template>

<script>
import ExampleComponent from '@/components/compound/ExampleComponent';
import ExDocsSelect from '@/components/examples/ExDocs/ExDocsSelect';
import ExDocsToggle from '@/components/examples/ExDocs/ExDocsToggle';
import DetailsItemRow from '@/components/compound/orders/DetailsItemRow';
import { useOrdersStore } from '@/store/orders';
import { mapStores } from 'pinia';
import { computed } from 'vue';

export default {
  name: 'ExDetailsItemRow',
  components: {
    DetailsItemRow,
    ExampleComponent,
    ExDocsSelect,
    ExDocsToggle,
  },
  provide() {
    return {
      order: computed(() =>
        this.orderTypeIsCredit ? this.mockCreditOrder : this.mockCashOrder
      ),
    };
  },
  data: () => ({
    itemsChecked: {},
    selectedItems: [],
    customization: '',
    itemType: 'key',
    allowRefund: true,
    isRefunded: false,
    hasCoupons: false,
    showSelectedItems: false,
    propsHeaders: [
      {
        title: 'Name',
        key: 'name',
        sortable: false,
      },
      {
        title: 'Type',
        key: 'type',
        sortable: false,
      },
      {
        title: 'Default',
        key: 'default',
        sortable: false,
      },
      {
        title: 'Required',
        key: 'required',
        sortable: false,
      },
      {
        title: 'Description',
        key: 'description',
        sortable: false,
      },
      {
        title: 'Controls',
        key: 'controls',
        sortable: false,
      },
    ],
    propItems: [
      {
        name: 'orderItem',
        type: 'Object',
        default: 'false',
        required: 'true',
        description: 'Object of item to be displayed',
      },
      {
        name: 'itemRefundable',
        type: 'Boolean',
        default: 'false',
        required: 'true',
        description: 'Boolean to determine if item is refundable.',
      },
      {
        name: 'itemSelected',
        type: 'Boolean',
        default: 'false',
        required: 'true',
        description: 'Boolean to determine if item is selected',
      },
    ],
    eventHeaders: [
      {
        title: 'Name',
        key: 'name',
        sortable: false,
      },
      {
        title: 'Type',
        key: 'type',
        sortable: false,
      },
      {
        title: 'Description',
        key: 'description',
        sortable: false,
      },
    ],
    eventItems: [
      {
        name: '@checkItem',
        type: '[boolean]',
        description: 'Emitted whenever an item is checked',
      },
    ],
    itemTypes: [
      {
        label: 'Key',
        value: 'key',
      },
      {
        label: 'Tag',
        value: 'tag',
      },
      {
        label: 'Omni',
        value: 'omni',
      },
      {
        label: 'Donation',
        value: 'donation',
      },
    ],
    mockItems: {},
  }),
  computed: {
    ...mapStores(useOrdersStore),
    currentItem() {
      return this.mockItems[this.itemType];
    },
    isCustomizable() {
      return ['TG', 'HA'].includes(this.currentItem.type);
    },
    storeItems() {
      return this.ordersStore.orderDetails.items.filter(
        (item) => item.type !== 'SH'
      );
    },
  },
  watch: {
    itemType() {
      this.allowRefund = true;
      this.isRefunded = false;
      this.hasCoupons = false;
      this.selectedItems = [];
      this.itemsChecked = { 1: false, 2: false, 3: false, 4: false, 5: false };
      this.resetMockItems('all');

      if (this.itemType !== 'multiple') {
        this.currentItem.refunds = [];
        this.currentItem.discounts = [];
        this.customization = '';
      }
    },
    isRefunded(refunded) {
      if (this.itemType !== 'multiple') {
        if (refunded) {
          this.selectedItems = [];
          this.itemsChecked[this.currentItem.itemId] = false;
          this.currentItem.refunds = [
            {
              amount: this.currentItem.total,
              notes: 'Entirely unacceptable',
              reason: 'Other',
              username: 'nberens',
              timestamp: '2023-01-01',
            },
          ];
        } else {
          this.currentItem.refunds = [];
        }
      }
    },
    hasCoupons(coupons) {
      if (this.itemType !== 'multiple') {
        this.currentItem.discounts = coupons ? ['special coupon code'] : [];
      }
    },
    customization(text) {
      if (text !== '' && this.itemType === 'tag') {
        this.currentItem.customization.backSideText = text;
      } else if (text !== '' && this.itemType === 'omni') {
        this.currentItem.customization.frontSideText = text;
      }
    },
  },
  created() {
    this.itemsChecked = { 1: false, 2: false, 3: false, 4: false, 5: false };
    this.resetMockItems('all');
  },
  methods: {
    handleCheck(itemId) {
      this.itemsChecked[itemId] = !this.itemsChecked[itemId];

      if (this.itemsChecked[itemId]) {
        let selectedItem = this.storeItems.find(
          (item) => item.itemId === itemId
        );
        this.selectedItems.push(selectedItem);
      } else {
        this.selectedItems = this.selectedItems.filter(
          (item) => item.itemId !== itemId
        );
      }
    },
    resetMockItems(target) {
      const itemTypes = {
        KE: 'key',
        TG: 'tag',
        HA: 'omni',
        DN: 'donation',
      };
      let mockItems = {};
      for (const type in itemTypes) {
        let item = this.storeItems.find((item) => item.type === type);
        mockItems[itemTypes[type]] = JSON.parse(JSON.stringify(item));
        mockItems[itemTypes[type]].discounts = [];
        mockItems[itemTypes[type]].refunds = [];
      }
      if (target === 'all') {
        this.mockItems = mockItems;
      } else {
        this.$nextTick(() => {
          this.mockItems = mockItems;
        });
      }
    },
    toggleRefunded() {
      this.isRefunded = !this.isRefunded;
      this.$nextTick(() => {
        this.handleCheck(this.currentItem.itemId);
      });
    },
    toggleShowMultipleItems() {
      if (this.itemType === 'multiple') this.itemType = 'key';
      else this.itemType = 'multiple';
    },
  },
};
</script>

<style lang="scss" scoped>
.details-table {
  border: 1px solid rgb(var(--v-theme-grey-lighten-3)) !important;
  min-height: 205px;
}
</style>
