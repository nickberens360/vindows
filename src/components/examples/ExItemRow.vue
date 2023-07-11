<template>
  <ExampleComponent
    name="ItemRow"
    file-path="@/components/base/ItemRow.vue"
  >
    <div
      v-if="isDetailedRow"
      class="items-table ma-4"
    >
      <ItemRow
        :key="currentItem.itemId"
        :item-refunded="itemRefunded || currentItemRefunded"
        :item-selected="itemSelected"
      >
        <template #left-col>
          <!--          <ProductImage-->
          <!--            :show-image-label="currentItem.type !== 'DN'"-->
          <!--            style="width: 140px"-->
          <!--          />-->
        </template>
        <template #center-col>
          <v-row class="px-2">
            <v-col class="d-flex align-center">
              {{ currentItem.description }}
            </v-col>
            <v-col>
              <!--              <ItemCustomization />-->
            </v-col>
          </v-row>
        </template>
        <template #right-col>
          <v-col
            v-if="rightColContent.includes('cost')"
            class="d-flex justify-end mr-2"
          >
            <span class="item-cost">{{ $currency(currentItem.total) }} </span>
          </v-col>
          <v-col
            v-if="rightColContent.includes('coupon')"
            class="mx-2 px-1"
          >
            <HoverableIcon title-color="orange">
              <template #icon>
                <v-icon
                  class="icon-duotone-coupon"
                  size="20"
                  color="primary-lighten-1"
                  icon="fad fa-ticket"
                />
              </template>
              <template #card-title>
                Get yer Coupons!
              </template>
            </HoverableIcon>
          </v-col>
          <v-col
            v-if="rightColContent.includes('label')"
            class="item-checkbox-label d-flex justify-end ml-2 pr-1"
            :class="{ 'justify-center': currentItemRefunded }"
          >
            <HoverableIcon
              v-if="currentItemRefunded"
              title-color="orange"
            >
              <template #icon>
                <v-icon
                  size="20"
                  color="primary-lighten-1"
                  icon="fas fa-circle-info"
                />
              </template>
              <template #card-title>
                Refund Details
              </template>
            </HoverableIcon>
            <span v-else>Refund</span>
          </v-col>
          <v-col
            v-if="rightColContent.includes('check')"
            class="d-flex justify-center ml-4"
          >
            <v-checkbox
              class="meru-styled-checkbox"
              :class="{
                'meru-disabled-selected-checkbox': itemRefunded,
              }"
              hide-details
              :model-value="itemSelected"
              :ripple="false"
              true-icon="fas fa-check"
              @click="itemSelected = !itemSelected"
            />
          </v-col>
        </template>
      </ItemRow>
    </div>
    <div
      v-else
      class="ma-4 cursor-pointer"
    >
      <ItemRow>
        <template #center-col>
          <v-row class="d-flex align-center justify-space-around text-h6 px-2">
            <v-col cols="1">
              <v-sheet
                height="50"
                color="success"
              />
            </v-col>
            <v-col> 12688230413133722 </v-col>

            <v-col cols="1">
              <v-sheet
                height="50"
                color="success"
              />
            </v-col>
            <v-col cols="1">
              K12688
            </v-col>
            <v-col>
              <span class="text-h6 font-weight-bold mr-2">04/01/1999</span>
              <span class="text-h6">1:00 PM</span>
            </v-col>
            <v-col>
              <span>$100.12</span>
              <v-icon
                class="icon-duotone-coupon ml-12"
                size="60"
                color="primary-lighten-1"
                icon="fad fa-ticket"
              />
            </v-col>
          </v-row>
        </template>
      </ItemRow>
    </div>
    <template #actions>
      <div class="d-flex my-4">
        <v-btn
          class="d-flex mx-3"
          @click="isDetailedRow = !isDetailedRow"
        >
          toggle row type
        </v-btn>
        <v-btn
          class="d-flex mx-3"
          :disabled="!isDetailedRow"
          @click="cycleItems"
        >
          cycle detailed items
        </v-btn>
        <v-btn
          class="d-flex mx-3"
          :disabled="!isDetailedRow"
          @click="cycleRightCol"
        >
          cycle right col examples
        </v-btn>
      </div>
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
                v-if="item.raw.name === 'item'"
                v-model="itemType"
                :items="itemTypes"
                label="Trigger Items"
              />
              <v-btn
                v-if="item.raw.name === 'itemRefunded'"
                :disabled="!isDetailedRow"
                @click="toggleRefunded"
              >
                {{ itemRefunded ? "Show non-refunded" : "Show refunded" }}
              </v-btn>
              <v-btn
                v-if="item.raw.name === 'itemSelected'"
                :disabled="!isDetailedRow"
                @click="itemSelected = !itemSelected"
              >
                {{ itemSelected ? "Show unselected" : "Show selected" }}
              </v-btn>
            </template>
            <template #bottom />
          </v-data-table>
        </template>
      </ExDocsToggle>
      <ExDocsToggle title="Slots">
        <template #content>
          <v-data-table
            :headers="slotHeaders"
            :items="slotItems"
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
import { computed } from 'vue';
import ExampleComponent from '@/components/compound/ExampleComponent';
import ExDocsSelect from '@/components/examples/ExDocs/ExDocsSelect';
import ExDocsToggle from '@/components/examples/ExDocs/ExDocsToggle';
import ItemRow from '@/components/base/ItemRow';
import HoverableIcon from '@/components/base/HoverableIcon';
// import ItemCustomization from '@/components/compound/orders/ItemCustomization.vue';
// import ProductImage from '@/components/base/ProductImage';
import { mockOrderDetails } from '@/services/mockDataService';

export default {
  name: 'ExItemRow',
  components: {
    ExampleComponent,
    ExDocsSelect,
    ExDocsToggle,
    HoverableIcon,
    ItemRow,
    // ItemCustomization,
    // ProductImage,
  },
  provide() {
    return {
      orderItem: computed(() => this.currentItem),
    };
  },
  data: () => ({
    currentItem: {},
    itemSelected: false,
    itemRefunded: false,
    isDetailedRow: false,
    rightColContent: ['cost'],
    rightColCycleIndex: 0,
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
        name: 'itemRefunded',
        type: 'Boolean',
        default: 'false',
        required: 'false',
        description: 'Boolean for status of item refund, used for styling',
      },
      {
        name: 'itemSelected',
        type: 'Boolean',
        default: 'false',
        required: 'false',
        description: 'Boolean for status of item selection, used for styling',
      },
    ],
    slotHeaders: [
      {
        title: 'Name',
        key: 'name',
        sortable: false,
      },
      {
        title: 'Description',
        key: 'description',
        sortable: false,
      },
      {
        title: 'Default',
        key: 'default',
        sortable: false,
      },
    ],
    slotItems: [
      {
        name: '#left-col',
        description:
          'Used for "locking" the content of the left column in the row',
        default: 'false',
      },
      {
        name: '#center-col',
        description: 'Will evenly space apart provided content',
        default: 'false',
      },
      {
        name: '#right-col',
        description:
          'Used for "locking" the content of the right column in the row',
        default: 'false',
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
        name: '@check-item',
        type: '[boolean]',
        description: 'Emitted when an item is checked.',
      },
    ],
  }),
  computed: {
    currentItemRefunded() {
      return !!this.currentItem.refunds.length;
    },
    orderItems() {
      return mockOrderDetails.items.filter((item) => item.type !== 'SH');
    },
  },
  created() {
    this.currentItem = this.orderItems[0];
  },
  methods: {
    cycleItems() {
      const currentItemIndex = this.orderItems.indexOf(this.currentItem);
      let newItemIndex = 0;
      if (currentItemIndex < this.orderItems.length - 1) {
        newItemIndex = currentItemIndex + 1;
      }
      this.currentItem = this.orderItems[newItemIndex];
    },
    cycleRightCol() {
      let variations = {
        0: ['cost'],
        1: ['cost', 'coupon'],
        2: ['cost', 'coupon', 'label'],
        3: ['cost', 'coupon', 'label', 'check'],
        4: ['cost', 'label', 'check'],
        5: ['cost', 'check'],
        6: ['check'],
      };
      if (this.rightColCycleIndex < 6) {
        this.rightColCycleIndex = this.rightColCycleIndex + 1;
        this.rightColContent = variations[this.rightColCycleIndex];
      } else {
        this.rightColCycleIndex = 0;
        this.rightColContent = variations[0];
      }
    },
    toggleRefunded() {
      this.itemRefunded = !this.itemRefunded;
      this.itemSelected = !this.itemSelected;
    },
  },
};
</script>

<style lang="scss" scoped>
.items-table {
  border: 1px solid rgb(var(--v-theme-grey-lighten-3)) !important;
  min-height: 205px;

  .item-cost {
    width: 60px;
    text-align: end;
  }
  .item-checkbox-label {
    width: 55px;
  }
}
</style>
