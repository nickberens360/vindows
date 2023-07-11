<template>
  <v-form
    ref="inputField"
    class="search-input d-flex align-center mx-3"
  >
    <v-icon
      v-if="icon"
      color="blue-grey"
      class="mr-3"
      :class="{ 'pt-6': type === 'dateRange' }"
      :icon="icon"
    />
    <span class="w-100 text-no-wrap">
      <label
        for="inputField"
        class="text-blue-grey text-caption-3"
      >
        {{ inputLabel }}
      </label>
      <Datepicker
        v-if="type === 'dateRange'"
        ref="datepicker"
        :enable-time-picker="false"
        hide-input-icon
        input-class-name="thing"
        :keep-action-row="false"
        :model-value="modelValue"
        :month-change-on-scroll="false"
        range
        six-weeks
        utc="preserve"
        week-start="0"
        @closed="handleDateRangeClose"
        @cleared="handleDateRangeReset"
        @internal-model-change="handleDateRangeChange"
      >
        <!-- slot below is to hide unneeded action row-->
        <template #action-row />
      </Datepicker>

      <v-text-field
        v-else
        class="hide-spin-buttons"
        clearable
        density="compact"
        :error-messages="errorMessage || ''"
        height="32"
        :placeholder="placeholder"
        :rules="inputRules"
        :type="type"
        validate-on="blur"
        :value="modelValue"
        variant="solo"
        @click:clear="handleInputReset"
        @input="({ target }) => $emit('update:modelValue', target.value)"
      />
    </span>
  </v-form>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { compareAsc, format, subDays } from 'date-fns';

export default {
  name: 'SearchInput',
  components: { Datepicker },
  props: {
    errorMessage: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    inputLabel: {
      required: true,
      type: String,
      default: '',
    },
    inputRules: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      required: true,
      default: null,
      validator: (value) =>
        value === null ||
        Array.isArray(value) ||
        Number.isInteger(value) ||
        typeof value === 'string',
    },
    placeholder: {
      type: [String, Number],
      default: '',
    },
    type: {
      required: true,
      type: String,
      default: null,
      validator: (type) =>
        ['date', 'dateRange', 'email', 'number', 'tel', 'text'].includes(type),
    },
  },
  emits: ['update:modelValue'],
  data: () => ({
    dateRange: [],
  }),
  computed: {
    defaultDateRange() {
      let today = new Date();
      let yesterday = subDays(today, 1);
      return [yesterday, today];
    },
  },
  methods: {
    handleDateRangeClose() {
      let range = [];

      if (!this.dateRange?.length) {
        range = this.defaultDateRange;
      } else if (this.dateRange.length === 1) {
        range = [this.dateRange[0], new Date()];
      } else if (this.dateRange.length === 2) {
        range = this.dateRange;
      }
      let dateRange = range
        .sort(compareAsc)
        .map((date) => format(date, 'yyyy-MM-dd'));

      this.$emit('update:modelValue', dateRange);
    },
    handleDateRangeChange(dateRange) {
      this.dateRange = dateRange;
    },
    handleDateRangeReset() {
      this.dateRange = [];
      this.$emit('update:modelValue', []);
    },
    handleInputReset() {
      this.$emit('update:modelValue', null);
      this.$refs.inputField.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.search-input {
  :deep(.v-input__prepend .v-icon),
  :deep(.v-field__clearable) {
    color: rgb(var(--v-theme-blue-grey-lighten-3));
  }
  :deep(.v-text-field input) {
    color: rgb(var(--v-theme-primary));
  }
  // prevents input error message cutoff
  :deep(.v-input__details) {
    overflow: visible;
    padding-left: 2px;
  }
  // overrides for VUEPIC Datepicker component to align with vuetify styling
  :deep(.dp__input) {
    color: rgb(var(--v-theme-primary));
  }
  :deep(.dp__pointer) {
    border: transparent;
    box-shadow: 0px 3px 1px -2px rgba(#000, 0.2),
      0px 2px 2px 0px rgba(#000, 0.14), 0px 1px 5px 0px rgba(#000, 0.12);
    height: 40px;
  }
}
</style>
