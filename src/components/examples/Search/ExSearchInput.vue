<template>
  <ExampleComponent
    name="SearchInput"
    description="This component is used to create a dynamic input based on a few props. It takes in props: [errorMessage, icon, inputLabel, inputRules, modelValue, placeholder, type] (Note - label, modelValue, and type are required), and emits event: [update:modelValue]. Supplying a ref allows for clearing the input from the parent component."
    file-path="@/components/compound/Search/SearchInput.vue"
  >
    <SearchInput
      ref="exInput"
      v-model="modelValue"
      :error-message="errorMessage"
      :icon="icon"
      :input-label="inputLabel"
      :input-rules="inputRules[inputRuleName]"
      :model-value="modelValue"
      :placeholder="placeholder"
      :type="type"
    />
    <template #actions>
      <v-row>
        <v-col cols="2">
          <v-btn @click="reset">
            Reset input
          </v-btn>
        </v-col>
        <v-col>
          <p>
            Value of Search Input:
            {{ modelValue }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <v-select
            v-model="errorMessage"
            :items="errorMessageList"
            item-title="text"
            item-value="value"
            label="errorMessage"
            variant="solo"
          />
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="icon"
            :items="iconList"
            item-title="text"
            item-value="value"
            label="icon"
            variant="solo"
          />
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="inputLabel"
            :items="inputLabelList"
            item-title="text"
            item-value="value"
            label="inputLabel"
            variant="solo"
          />
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="inputRuleName"
            :items="inputRulesList"
            item-title="text"
            item-value="value"
            label="inputRules"
            variant="solo"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-select
            v-model="placeholder"
            :items="placeholderList"
            item-title="text"
            item-value="value"
            label="placeholder"
            variant="solo"
          />
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="type"
            :items="typeList"
            item-title="text"
            item-value="value"
            label="type"
            variant="solo"
          />
        </v-col>
      </v-row>
    </template>
  </ExampleComponent>
</template>

<script>
import ExampleComponent from '@/components/compound/ExampleComponent';
import SearchInput from '@/components/compound/Search/SearchInput';
export default {
  name: 'ExSearchInput',
  components: {
    SearchInput,
    ExampleComponent,
  },
  data() {
    return {
      errorMessage: '',
      icon: '',
      inputLabel: 'Default Label',
      inputRuleName: '',
      inputRules: {
        negative: [(v) => !v || v > -1 || 'Cannot be negative'],
        only4: [(v) => v?.length >= 4 || 'Enter 4 characters'],
      },
      modelValue: null,
      placeholder: '',
      type: 'text',
      errorMessageList: [
        {
          text: 'Custom Error',
          value: 'Why would you do that?',
        },
        {
          text: 'Another Error',
          value: 'Seriously, please stop',
        },
      ],
      iconList: [
        {
          text: 'fa-credit-card',
          value: 'fal fa-credit-card',
        },
        {
          text: 'fa-calendar',
          value: 'fal fa-calendar',
        },
        {
          text: 'fa-user',
          value: 'fal fa-user',
        },
      ],
      inputLabelList: [
        {
          text: 'Customer Name',
          value: 'Customer Name',
        },
        {
          text: 'Default Label',
          value: 'Default Label',
        },
        {
          text: 'Email',
          value: 'Email',
        },
        {
          text: 'Start ~ End Date',
          value: 'Start ~ End Date',
        },
      ],
      inputRulesList: [
        {
          text: 'No Negatives',
          value: 'negative',
        },
        {
          text: 'Only 4 digits',
          value: 'only4',
        },
      ],
      placeholderList: [
        {
          text: 'Customer Name',
          value: 'Customer Name',
        },
        {
          text: 'Email',
          value: 'Email',
        },
        {
          text: 'Kiosk Number',
          value: 'Kiosk Number',
        },
      ],
      typeList: [
        {
          text: 'dateRange',
          value: 'dateRange',
        },
        {
          text: 'email',
          value: 'email',
        },
        {
          text: 'number',
          value: 'number',
        },
        {
          text: 'text',
          value: 'text',
        },
      ],
    };
  },
  methods: {
    reset() {
      this.$refs.exInput.handleInputReset();
      this.errorMessage = '';
      this.icon = '';
      this.inputLabel = 'Default Label';
      this.inputRuleName = '';
      this.modelValue = null;
      this.placeholder = '';
      this.type = 'text';
    },
  },
};
</script>

<style scoped></style>
