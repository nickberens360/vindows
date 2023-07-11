<template>
  <div class="mb-4 mt-4">
    <h3
      style="cursor: pointer"
      class="text-body-1 font-weight-bold d-flex align-center"
      @click="
        toggle"
    >
      <v-icon
        class="mr-2"
        size="16"
        :icon="show ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
      />
      {{ title }}
    </h3>
    <v-expand-transition>
      <v-data-table
        v-if="show"
        :items="items"
        item-value="name"
        :headers="headers"
        hide-default-footer
        class="elevation-1"
      >
        <template #bottom />
      </v-data-table>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  name: 'ExDocs',
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
  },
};
</script>
