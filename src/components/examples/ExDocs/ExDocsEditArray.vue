<template>
  <div class="my-4">
    <p
      style="cursor: pointer"
      class="text-body-1 font-weight-bold d-flex align-center"
      @click="show = !show"
    >
      <v-icon
        class="mr-2"
        size="16"
        :icon="show ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
      />
      Edit Array
    </p>
    <pre
      v-if="show"
      contenteditable="true"
      class="mt-4"
      @input="updateArray($event)"
      v-text="multilineArray"
    />
  </div>
</template>

<script>
export default {
  name: 'ExDocsEditArray',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:items'],
  data() {
    return {
      show: '',
    };
  },
  computed: {
    multilineArray() {
      return this.formatArray(this.items, 1);
    },
  },
  methods: {

    formatArray(value, depth) {
      let formatted = '';
      const indent = '  '.repeat(depth);
      if (Array.isArray(value)) {
        formatted += '[';
        value.forEach((item, index) => {
          formatted += `\n${indent}${this.formatArray(item, depth + 1)}`;
          if (index < value.length - 1) {
            formatted += ',';
          }
        });
        formatted += `\n${'  '.repeat(depth - 1)}]`;
      } else if (typeof value === 'object' && value !== null) {
        formatted += '{';
        const keys = Object.keys(value);
        keys.forEach((key, index) => {
          formatted += `\n${indent}"${key}": ${this.formatArray(value[key], depth + 1)}`;
          if (index < keys.length - 1) {
            formatted += ',';
          }
        });
        formatted += `\n${'  '.repeat(depth - 1)}}`;
      } else {
        formatted += JSON.stringify(value);
      }
      return formatted;
    },
    updateArray(event) {
      try {
        const updatedArray = JSON.parse(event.target.textContent);
        this.$emit('update:items', updatedArray);
      } catch (error) {
        console.error('Invalid JSON format');
      }
    },
  },
};
</script>

<style scoped>
pre {
  border: 1px solid #ccc;
  padding: 10px;
  max-width: 100%;
  overflow: auto;
  white-space: pre-wrap;
}
</style>
