<template>
  <ExampleComponentUsage>
    <ItemStatusRow text="Base State" />
    <ItemStatusRow
      :exception="hasException"
      :exception-text="exceptionText"
      :text="text"
      :count="count"
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
            v-model="hasException"
            label="Exception"
          />
          <v-text-field
            v-if="item.raw.name === 'count'"
            v-model="count"
            label="label"
            variant="solo"
            hide-details
            class="my-3"
          />
          <v-text-field
            v-if="item.raw.name === 'text'"
            v-model="text"
            label="label"
            variant="solo"
            hide-details
            class="my-3"
          />
          <v-text-field
            v-if="item.raw.name === 'exceptionText'"
            v-model="exceptionText"
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
import { propTableHeaders } from '@/component-examples/utils/docsTableHeaders';
import ItemStatusRow from '@/components/base/ItemStatusRow';

export default {
  components: { ItemStatusRow },
  data() {
    return {
      hasException: false,
      propHeaders: propTableHeaders,
      exceptionText: 'This is an exception',
      text: '1235478',
      count: '3',
      propItems: [
        {
          name: 'exception',
          type: 'Boolean',
          default: 'false',
          required: false,
          description: 'Whether the item has an exception',
        },
        {
          name: 'text',
          type: 'String',
          default: '" "',
          required: false,
          description: 'The text to display',
        },
        {
          name: 'count',
          type: 'String',
          default: '0',
          required: false,
          description: 'The count to display',
        },
        {
          name: 'exceptionText',
          type: 'String',
          default: 'Wrong SKU',
          required: false,
          description: 'The text to display when the item has an exception',
        }
      ],
    };
  }
};
</script>
<style lang="scss" scoped>
.info-field {
  display: inline-flex;
  flex-direction: column;
  text-align: left;
}
</style>
