<template>
  <ExampleComponentUsage>
    <InfoField
      :label="label"
      :content-size="contentSize"
    >
      <template #details>
        <span>{{ value }}</span>
      </template>
    </InfoField>
    <template #description>
      <p>
        InfoField is a component that displays a label and a value.
      </p>
      <p>
        The value can be any type of content, including other components.
      </p>
    </template>
    <template #props>
      <v-data-table
        :headers="propHeaders"
        :items="propItems"
        hide-default-footer
        class="mt-4"
      >
        <template #[`item.controls`]="{ item }">
          <ExDocsSelect
            v-if="item.raw.name === 'contentSize'"
            v-model="contentSize"
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
import InfoField from '@/components/base/InfoField';
import { propTableHeaders, slotTableHeaders } from '@/component-examples/utils/docsTableHeaders';

export default {
  components: {InfoField},
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
          name: 'contentSize',
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
      slotHeaders: slotTableHeaders,
      slotItems: [
        {
          name: '#details',
          description:'Slot for the details of the field',
          default: 'false',
        },
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
