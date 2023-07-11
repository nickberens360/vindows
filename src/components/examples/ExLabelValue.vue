<template>
  <ExampleComponent
    name="LabelValue"
    file-path="@/components/base/LabelValue.vue"
  >
    <LabelValue
      :label="label"
      :value="value"
      :size="size"
      :variant="variant"
      class="mb-8"
    />
    <ExDocsToggle title="Props">
      <template #content>
        <v-data-table
          :headers="propHeaders"
          :items="propItems"
          hide-default-footer
          class="elevation-2 mt-4"
        >
          <template #[`item.controls`]="{ item }">
            <v-select
              v-if="item.raw.name === 'size'"
              v-model="size"
              :items="sizeItems"
              item-title="text"
              item-value="value"
              label="size"
              variant="solo"
              hide-details
              class="my-3"
            />
            <v-select
              v-if="item.raw.name === 'variant'"
              v-model="variant"
              :items="variantItems"
              item-title="text"
              item-value="value"
              label="variant"
              variant="solo"
              hide-details
              class="my-3"
            />
            <v-text-field
              v-if="item.raw.name === 'label'"
              v-model="label"
              label="label"
              variant="solo"
              hide-details
              class="my-3"
            />
            <v-text-field
              v-if="item.raw.name === 'value'"
              v-model="value"
              label="value"
              variant="solo"
              hide-details
              class="my-3"
            />
          </template>
          <template #bottom />
        </v-data-table>
      </template>
    </ExDocsToggle>
  </ExampleComponent>
</template>

<script>
import ExampleComponent from '@/components/compound/ExampleComponent';
import LabelValue from '@/components/base/LabelValue';
import ExDocsToggle from '@/components/examples/ExDocs/ExDocsToggle';
export default {
  name: 'ExLabelValue',
  components: {ExDocsToggle, LabelValue, ExampleComponent},
  data() {
    return {
      label: 'Some Label',
      size: 'sm',
      variant: 'dark-label',
      value: '$48',
      sizeItems: [
        {
          text: 'sm',
          value: 'sm'
        },
        {
          text: 'md',
          value: 'md'
        },
        {
          text: 'lg',
          value: 'lg'
        },
      ],
      variantItems: [
        {text: 'dark-label', value: 'dark-label'},
        {text: 'light-label', value: 'light-label'},
      ],
      propHeaders: [
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
          name: 'label',
          type: 'String',
          default: '" "',
          required: 'false',
          description: 'Label text.',
        },
        {
          name: 'value',
          type: 'String',
          default: '" "',
          required: 'false',
          description: 'Order tax total.',
        },
        {
          name: 'size',
          type: 'String',
          default: 'sm',
          required: 'false',
          description: 'The size of the label. Options: sm, md, lg',
        },
        {
          name: 'variant',
          type: 'String',
          default: 'dark-label',
          required: 'false',
          description: 'The variant of the label. Options: dark-label, light-label',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
