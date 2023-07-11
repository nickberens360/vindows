<template>
  <ExampleComponentUsage>
    <QuantityCircle
      :quantity="quantity"
      :label="label"
      :size="size"
      :exception="exception"
      :exception-message="exceptionMessage"
    />
    <template #props>
      <v-data-table
        :headers="propHeaders"
        :items="propItems"
        hide-default-footer
        class="mt-4"
      >
        <template #[`item.controls`]="{ item }">
          <v-checkbox
            v-if="item.raw.name === 'exception'"
            v-model="exception"
            label="Exception"
            hide-details
            class="my-3"
          />

          <v-text-field
            v-if="item.raw.name === 'exception-message'"
            v-model="exceptionMessage"
            label="Exception Message"
            variant="solo"
            hide-details
            class="my-3"
          />

          <ExDocsSelect
            v-if="item.raw.name === 'quantity'"
            v-model="quantity"
            :items="quantityItems"
            label="Quantity"
          />
          <ExDocsSelect
            v-if="item.raw.name === 'color'"
            v-model="exceptionMessage"
            :items="exceptionMessageItems"
            label="Color"
          />
          <ExDocsSelect
            v-if="item.raw.name === 'size'"
            v-model="size"
            :items="sizeItems"
            label="Size"
          />
          <v-text-field
            v-if="item.raw.name === 'label'"
            v-model="label"
            label="label"
            variant="solo"
            hide-details
            class="my-3"
          />
        </template>
        <template #bottom />
      </v-data-table>
    </template>
  </ExampleComponentUsage>
</template>

<script>
import QuantityCircle from '@/components/base/QuantityCircle';
import { propTableHeaders } from '@/component-examples/utils/docsTableHeaders';

export default {
  components: {QuantityCircle},
  data() {
    return {
      label: 'Qty.',
      propHeaders: propTableHeaders,
      exception: true,
      exceptionMessage: 'Out of stock',
      exceptionMessageItems: [
        {label: 'Out of stock', value: 'Out of stock'},
        {label: 'Sold out', value: 'Sold out'},
        {label: 'Unavailable', value: 'Unavailable'},
      ],
      size: 'lg',
      sizeItems: [
        {label: 'sm', value: 'sm'},
        {label: 'lg', value: 'lg'},
      ],
      quantity: '3',
      quantityItems: [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '10', value: '10'},
      ],
      propItems: [
        {
          name: 'exception',
          type: 'Boolean',
          default: 'false',
          required: 'false',
          description: 'Whether or not to display the exception message',
        },
        {
          name: 'exception-message',
          type: 'String',
          default: 'Exception',
          required: 'false',
          description: 'Message to display when exception is true',
        },
        {
          name: 'quantity',
          type: '[Number, String]',
          default: '0',
          required: 'True',
          description: 'Quantity to display',
        },
        {
          name: 'size',
          type: 'String',
          default: 'sm',
          required: 'True',
          description: 'Size of the content. Can be sm, md, or lg',
        },
        {
          name: 'label',
          type: 'String',
          default: 'undefined',
          required: 'true',
          description: 'Label for the field',
        },
      ],
    };
  }
};
</script>
<style lang="scss" scoped>

</style>
