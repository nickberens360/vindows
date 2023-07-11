<template>
  <ExampleComponent
    name="InfoField"
    description="The InfoField component is used to display a label and content."
    file-path="@/components/base/InfoField.vue"
  >
    <InfoField
      :label="label"
      :content-size="contentSize"
    >
      <template #details>
        <p class="mb-0">
          {{ content }}
        </p>
      </template>
    </InfoField>
    <template #actions>
      <v-row style="max-width: 600px">
        <v-col cols="4">
          <v-text-field
            v-model="label"
            label="label"
            variant="solo"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="content"
            label="content"
            variant="solo"
          />
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="contentSize"
            :items="sizeItems"
            item-title="text"
            item-value="value"
            label="contentSize"
            variant="solo"
          />
        </v-col>
      </v-row>
    </template>
  </ExampleComponent>
</template>

<script>
import ExampleComponent from '@/components/compound/ExampleComponent';
import InfoField from '@/components/base/InfoField';
export default {
  name: 'ExInfoField',
  components: {
    InfoField,
    ExampleComponent,
  },
  data() {
    return {
      label: 'Label',
      content: 'Content',
      contentSize: 'lg',
      sizeItems: [
        { text: 'sm', value: 'sm' },
        { text: 'md', value: 'md' },
        { text: 'lg', value: 'lg' },
      ],
    };
  },
};
</script>

<style scoped>

</style>
