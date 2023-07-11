<template>
  <ExampleComponent
    name="RadioToggleBar"
    file-path="@/components/compound/RadioToggleBar"
  >
    <RadioToggleBar
      v-model="radioValue"
      :radio-items="radioItems"
      class="elevation-5 bg-primary-lighten-5"
    />
    <dl class="my-5 d-inline-flex bg-primary-lighten-5 px-4 py-2 rounded">
      <dt class="mr-2">
        Emitted Value:
      </dt>
      <dd class="font-weight-bold">
        {{ radioValue || 'null' }}
      </dd>
    </dl>

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
              v-if="item.raw.name === 'modelValue'"
              :items="radioItems"
              :model-value="radioValue"
              label="Active Item"
              @update:model-value="updateActiveItem"
            />
            <ExDocsEditArray
              v-if="item.raw.name === 'radioItems'"
              v-model:items="radioItems"
              :items="radioItems"
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
import ExampleComponent from '@/components/compound/ExampleComponent';
import RadioToggleBar from '@/components/compound/RadioToggleBar';
import ExDocsEditArray from '@/components/examples/ExDocs/ExDocsEditArray';
import ExDocsSelect from '@/components/examples/ExDocs/ExDocsSelect';
import ExDocsToggle from '@/components/examples/ExDocs/ExDocsToggle';

export default {
  name: 'ExRadioToggleBar',
  components: {
    ExDocsToggle,
    ExDocsSelect,
    RadioToggleBar,
    ExampleComponent,
    ExDocsEditArray
  },
  data() {
    return {
      showPropsTable: false,
      showEventsTable: false,
      radioValue: 'valueOne',
      radioItems: [
        {
          label: 'Label One',
          value: 'valueOne',
        },
        {
          label: 'Label Two',
          value: 'valueTwo',
        },
        {
          label: 'Label Three',
          value: 'valueThree',
        },
        {
          label: 'Label Four',
          value: 'valueFour',
        }
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
          name: 'modelValue',
          type: 'String',
          default: '" "',
          required: 'True',
          description: 'The v-model value of the component.',
        },
        {
          name: 'radioItems',
          type: 'Array',
          default: '[]',
          required: 'true',
          description: 'Array of objects with label and value properties',
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
          name: '@update:model-value',
          type: 'String',
          description: 'Emits the value of the selected radio button',
        },
      ],
    };
  },
  methods: {
    updateActiveItem(value) {
      this.radioValue = value;
    },
  },
};
</script>

<style scoped>

</style>
