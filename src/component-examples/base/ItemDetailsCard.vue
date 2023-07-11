<template>
  <ExampleComponentUsage>
    <div
      style="background-color: #eee"
      class="pa-8"
    >
      <ItemDetailsCard
        sku="5003973"
        quantity="2"
        timestamp="2022-11-10T10:56:38.023-06:00"
        tid="55786789-667"
        style="max-width: 600px;"
      >
        <template #left>
          <img
            src="https://via.placeholder.com/150"
            alt="placeholder"
          >
        </template>
      </ItemDetailsCard>
    </div>
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
  </ExampleComponentUsage>
</template>

<script>
import { propTableHeaders, slotTableHeaders } from '@/component-examples/utils/docsTableHeaders';
import ItemDetailsCard from '@/components/base/ItemDetailsCard';

export default {
  components: {ItemDetailsCard},
  data() {
    return {
      label: 'Label',
      value: 'Value',
      contentSize: 'sm',
      sizeItems: [
        {label: 'sm', value: 'sm'},
        {label: 'md', value: 'md'},
        {label: 'lg', value: 'lg'},
      ],
      propHeaders: propTableHeaders,
      propItems: [
        {
          name: 'sku',
          type: 'String',
          default: 'undefined',
          required: 'false',
          description: 'SKU of the item',
        },
        {
          name: 'quantity',
          type: 'String',
          default: 'undefined',
          required: 'false',
          description: 'Quantity of the item',
        },
        {
          name: 'timestamp',
          type: 'String',
          default: 'undefined',
          required: 'false',
          description: 'Timestamp of the item',
        },
        {
          name: 'tid',
          type: 'String',
          default: 'undefined',
          required: 'false',
          description: 'Transaction ID of the item',
        },
      ],
      slotHeaders: slotTableHeaders,
      slotItems: [
        {
          name: '#left',
          description:'Slot for the left side of the field',
          default: 'ProductImage',
        },
        {
          name: '#center',
          description:'Slot for the center of the field',
          default: 'ItemDetailLabelValue x2',
        },
        {
          name: '#right',
          description:'Slot for the right side of the field',
          default: 'ItemDetailLabelValue x2',
        },
      ],
    };
  }
};
</script>
<style lang="scss" scoped>

</style>
