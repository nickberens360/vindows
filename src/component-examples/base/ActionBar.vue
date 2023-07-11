<template>
  <ExampleComponentUsage>
    <ActionBar>
      <template #left>
        <v-btn
          color="white"
          variant="flat"
        >
          Left
        </v-btn>
      </template>
      <template #center>
        <v-btn
          color="white"
          variant="flat"
        >
          Center
        </v-btn>
      </template>
      <template #right>
        <v-btn
          color="white"
          variant="flat"
        >
          Right
        </v-btn>
      </template>
    </ActionBar>
    <template #description>
      <p>
        This component is a wrapper for the <code>v-toolbar</code> component.
        It is used to create a toolbar with a left, center and right slot.
      </p>
    </template>
    <template #props>
      <p class="pa-4">
        See the Vuetify <a
          href="https://vuetifyjs.com/en/api/v-toolbar/"
          target="_blank"
        >docs</a> for the full list of the <code>v-toolbar</code> props.
      </p>
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
import { slotTableHeaders } from '@/component-examples/utils/docsTableHeaders';
import ActionBar from '@/components/base/ActionBar';

export default {
  components: {ActionBar},
  data() {
    return {
      slotHeaders: slotTableHeaders,
      slotItems: [
        {
          name: '#left',
          description:'Slot items to be placed on the left side of the toolbar',
          default: 'empty',
        },
        {
          name: '#center',
          description:'Slot items to be placed in the center of the toolbar',
          default: 'empty',
        },
        {
          name: '#right',
          description:'Slot items to be placed on the right side of the toolbar',
          default: 'empty',
        },
      ],
    };
  }
};
</script>
<style lang="scss" scoped>

</style>
