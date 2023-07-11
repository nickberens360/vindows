<template>
  <ExampleComponent
    name="SelectWithTextarea"
    file-path="@/components/compound/SelectWithTextarea.vue"
  >
    <SelectWithTextarea
      :items="items"
      :is-visible="isVisible"
      :trigger-items="triggerItems"
      :select-label="selectLabel"
      :text-area-label="textAreaLabel"
      @update:selection="selectionUpdated"
    />
    <dl class="mb-4">
      <dt class="font-weight-bold">
        Emitted Data
      </dt>
      <dd><pre>{{ emitValue }}</pre></dd>
    </dl>

    <ExDocsToggle title="Props">
      <template #content>
        <v-data-table
          :headers="propsHeaders"
          :items="propsItems"
          hide-default-footer
          class="elevation-2 mt-4"
        >
          <template #[`item.controls`]="{ item }">
            <v-text-field
              v-if="item.raw.name === 'select-label'"
              v-model="selectLabel"
              label="Select Label"
              variant="solo"
              hide-details
              class="my-3"
            />
            <v-text-field
              v-if="item.raw.name === 'text-area-label'"
              v-model="textAreaLabel"
              label="Text Area Label"
              variant="solo"
              hide-details
              class="my-3"
            />
            <v-checkbox
              v-if="item.raw.name === 'is-visible'"
              v-model="isVisible"
              label="Toggle Visibility"
            />
            <v-select
              v-if="item.raw.name === 'trigger-items'"
              v-model="triggerItems"
              :items="items"
              item-title="text"
              item-value="value"
              label="Trigger Items"
              variant="solo"
              hide-details
              class="my-3"
              multiple
            />
            <ExDocsEditArray
              v-if="item.raw.name === 'items'"
              v-model:items="items"
              :items="items"
            />
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
  </ExampleComponent>
</template>

<script>
import SelectWithTextarea from '@/components/compound/SelectWithTextarea';
import ExampleComponent from '@/components/compound/ExampleComponent';
import ExDocsToggle from '@/components/examples/ExDocs/ExDocsToggle';
import ExDocsEditArray from '@/components/examples/ExDocs/ExDocsEditArray';
export default {
  name: 'ExSelectWithTextarea',
  components: {
    ExDocsEditArray,
    ExDocsToggle,
    ExampleComponent,
    SelectWithTextarea
  },
  data() {
    return {
      emitValue: null,
      valid: false,
      triggerItems: ['other'],
      isVisible: true,
      selectLabel: 'Select',
      textAreaLabel: 'Comment',
      items: [
        {
          text: 'Wrong Product',
          value: 'wrong-product',
        },
        {
          text: 'Unsatisfactory Product',
          value: 'unsatisfactory-product',
        },
        {
          text: 'Wrong Color',
          value: 'wrong-color',
        },
        {
          text: 'Other',
          value: 'other',
        },
      ],
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
      propsItems: [
        {
          name: 'items',
          type: 'Array',
          default: '[ ]',
          description: 'Array of objects with text and value properties',
        },
        {
          name: 'is-visible',
          type: 'Boolean',
          default: 'false',
          description: 'Show textarea if the trigger-item item is selected',
        },
        {
          name: 'item-id',
          type: 'String | Number',
          default: 'null',
          description: 'Id to emit back if provided by the parent component',
        },
        {
          name: 'trigger-items',
          type: 'Array',
          default: '[ "other" ]',
          description: 'Value of item(s) that triggers textarea to show',
        },
        {
          name: 'select-required',
          type: 'Boolean',
          default: 'false',
          description: 'Require select to be selected',
        },
        {
          name: 'text-area-required',
          type: 'Boolean',
          default: 'false',
          description: 'Require textarea to be selected',
        },
        {
          name: 'select-label',
          type: 'String',
          default: 'Select',
          description: 'Label for select',
        },
        {
          name: 'text-area-label',
          type: 'String',
          default: 'Comment',
          description: 'Label for textarea',
        }
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
          name: '@update:selection',
          type: 'String',
          description: 'Emits the value of the selected radio button',
        },
      ],
    };
  },
  methods: {
    selectionUpdated(value) {
      this.emitValue = value;
    },
  },
};
</script>

<style scoped>

</style>
