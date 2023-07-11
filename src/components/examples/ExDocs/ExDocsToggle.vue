<template>
  <div class="mb-2">
    <v-expansion-panels>
      <v-expansion-panel
        :title="title"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
      >
        <template #text>
          <slot name="content" />
        </template>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: 'ExDocsToggle',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Title'
    },
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style scoped lang="scss">
:deep(.v-data-table) {
  margin-top: 0 !important;
};
:deep(.v-expansion-panel-text__wrapper) {
  padding: 0 !important;
};

</style>
