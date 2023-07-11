<template>
  <ExampleComponentUsage>
    <SelectionGroup
      v-model="selectedItems"
      :items="items"
      item-key="transactionId"
    >
      <template #left="{item}">
        <div>
          <p class="font-weight-bold">
            Left Slot
          </p>
          <pre>{{ item.sku }}</pre>
        </div>
      </template>
      <template #center="{item}">
        <div class="px-8">
          <p class="font-weight-bold">
            Center Slot
          </p>
          <pre>{{ item.transactionId }}</pre>
        </div>
      </template>
    </SelectionGroup>
    <template #description>
      <p>
        This component is used to return selected items from a group. Expects an array of objects with a unique key.
      </p>
    </template>
    <template #props>
      <v-data-table
        :headers="propHeaders"
        :items="propItems"
        hide-default-footer
        class="mt-4"
      >
        <template #bottom />
      </v-data-table>
    </template>
    <template #slots>
      <v-data-table
        :headers="slotHeaders"
        :items="slotItems"
        hide-default-footer
        class="mt-4"
      >
        <template #bottom />
      </v-data-table>
    </template>
    <template #events>
      <v-data-table
        :headers="eventHeaders"
        :items="eventItems"
        hide-default-footer
        class="mt-4"
      >
        <template #bottom />
      </v-data-table>
    </template>
  </ExampleComponentUsage>
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
      <v-container>
        <pre>{{ selectedItems }}</pre>
      </v-container>
    </template>
  </AppDrawer>
</template>

<script>
import AppDrawer from '@/components/app/AppDrawer';
import SelectionGroup from '@/components/base/SelectionGroup';
import { propTableHeaders, slotTableHeaders, eventTableHeaders } from '@/component-examples/utils/docsTableHeaders';

export default {
  components: { AppDrawer,  SelectionGroup},
  data() {
    return {
      selectedItems: [],
      items: [
        {
          transactionId: '55786789-667',
          sku: '5003973',
          quantity: '1',
          timestamp: '2023-05-30T10:56:38.023-06:00',
        },
        {
          transactionId: '45786789-667',
          sku: '8003973',
          quantity: '2',
          timestamp: '2021-10-10T10:56:38.023-06:00',
        },
        {
          transactionId: '85786789-667',
          sku: '6003973',
          quantity: '4',
          timestamp: '2023-02-01T10:56:38.023-06:00',
        },
      ],
      propHeaders: propTableHeaders,
      propItems: [
        {
          name: 'items',
          type: 'Array',
          default: '[]',
          description: 'Array of items to display in the selection group.',
        },
        {
          name: 'modelValue',
          type: 'Array',
          default: '[]',
          description: 'The v-model value of the component.',
        },
        {
          name: 'item-key',
          type: 'String',
          default: '',
          description: 'Unique key to use for the array item.',
        },
      ],
      slotHeaders: slotTableHeaders,
      slotItems: [
        {
          name: 'left',
          description: 'Slot for the left side of the selection group.',
          scoped: '{ item }',
        },
        {
          name: 'right',
          description: 'Slot for the right side of the selection group.',
          scoped: '{ item }',
        },
        {
          name: 'center',
          description: 'Slot for the center content of the selection group.',
          scoped: '{ item }',
        }
      ],
      eventHeaders: eventTableHeaders,
      eventItems: [
        {
          name: '@update:model-value',
          description: 'Emitted when the selected item changes.',
          type: 'items: Array',
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
:deep(.item-row) {
  border-bottom: 1px solid #ccc !important;
}
</style>
