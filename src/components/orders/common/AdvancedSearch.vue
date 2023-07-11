<template>
  <v-form
    @keydown.enter.prevent
    @submit.prevent="submitSearch"
  >
    <v-card
      class="pa-0"
      color="grey-lighten-2"
      flat
    >
      <v-card-text class="pa-0">
        <v-row
          class="elevation-3 pb-1"
          no-gutters
        >
          <v-col cols="2">
            <SearchInput
              ref="kioskNumber"
              v-model="formData.kioskNumber"
              input-label="Kiosk Number"
              type="text"
            />
          </v-col>
          <span class="kiosk-number-divider" />
          <v-col cols="2">
            <SearchInput
              ref="orderNumber"
              v-model="formData.orderNumber"
              input-label="Transaction ID"
              type="text"
            />
          </v-col>
          <v-col cols="3">
            <SearchInput
              v-model="formData.dateRange"
              icon="fal fa-calendar"
              input-label="Start - End Date"
              type="dateRange"
            />
          </v-col>
          <v-col
            cols="3"
            class="d-flex flex-column"
          >
            <span class="d-flex">
              <SearchInput
                ref="minAmount"
                v-model.number="formData.minAmount"
                icon="fal fa-square-dollar"
                input-label="Min Amount"
                :input-rules="transactionAmountRules"
                type="number"
              />
              <SearchInput
                ref="maxAmount"
                v-model.number="formData.maxAmount"
                input-label="Max Amount"
                :input-rules="transactionAmountRules"
                type="number"
              />
            </span>
            <span
              v-if="minMaxError.length"
              class="validation-error-message d-flex justify-center mt-n4 text-error"
            >
              {{ minMaxError }}
            </span>
          </v-col>
        </v-row>

        <v-row
          class="pb-1"
          no-gutters
        >
          <v-col cols="3">
            <SearchInput
              ref="name"
              v-model="formData.name"
              icon="fal fa-user"
              input-label="Card Holder's Name"
              :input-rules="customerFullNameRules"
              type="text"
            />
          </v-col>
          <v-col cols="3">
            <SearchInput
              ref="email"
              v-model="formData.email"
              icon="fal fa-envelope"
              input-label="Email"
              :input-rules="customerEmailRules"
              type="email"
            />
          </v-col>
          <v-col cols="2">
            <SearchInput
              ref="last4"
              v-model="formData.last4"
              icon="fal fa-credit-card"
              input-label="CC Last 4"
              :input-rules="creditCardRules"
              type="number"
              @update:model-value="restrictLast4"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-progress-linear
        v-if="loading"
        color="lavender"
        indeterminate
      />

      <v-card-actions>
        <SearchControls
          :loading="loading"
          :number-of-results="ordersStore.orderSearchResults.length"
          :result-limit="formData.limit"
          :search-disabled="isSearchDisabled"
          @clear-search="clearSearch"
          @set-limit="setFormLimit"
        />
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import SearchControls from './SearchControls.vue';
import SearchInput from './SearchInput.vue';
import { useOrdersStore } from '@/store/orders';
import { mapStores } from 'pinia';
import { format, subDays } from 'date-fns';
import {
  noSpecialCharacters,
  nullableCreditCardLast4,
  nullableTransactionAmount,
  validEmail,
} from '@/utilities/validationRules';

export default {
  name: 'AdvancedSearch',
  components: {
    SearchControls,
    SearchInput,
  },
  data: () => ({
    loading: false,
    formData: {
      dateRange: [], //Array - [startDate, endDate] sale happened afer / sale happened before
      email: null, //String - receipt email
      kioskNumber: null, //String - kiosk where transaction occurred
      last4: null, //Number - last 4 of the PAN
      limit: 200, //Number - REQUIRED - maximum number of records to return
      maxAmount: null, //Number - transaction amount less than or equal to
      minAmount: null, //Number - transaction amount greater than or equal to
      name: null, //String - cardholder or shipping recipient first name
      orderNumber: null, //String - WorldNet transaction ID for sale/capture or AKG order number
    },
  }),
  computed: {
    ...mapStores(useOrdersStore),
    creditCardRules() {
      return nullableCreditCardLast4;
    },
    customerEmailRules() {
      return validEmail;
    },
    customerFullNameRules() {
      return noSpecialCharacters;
    },
    defaultDateRange() {
      let today = new Date();
      let yesterday = subDays(today, 1);
      return [format(yesterday, 'yyyy-MM-dd'), format(today, 'yyyy-MM-dd')];
    },
    isSearchDisabled() {
      let { dateRange, orderNumber } = this.formData;
      return orderNumber === null && dateRange.length === 0;
    },
    minMaxError() {
      const { maxAmount, minAmount } = this.formData;
      const error = maxAmount && minAmount && minAmount > maxAmount;
      return error ? 'Min cannot be greater than Max' : '';
    },
    transactionAmountRules() {
      return nullableTransactionAmount;
    },
  },
  mounted() {
    this.formData.dateRange = this.defaultDateRange;
    this.submitSearch();
  },
  methods: {
    clearSearch() {
      for (const key in this.formData) {
        if (key === 'limit') this.formData.limit = 200;
        else if (key === 'dateRange')
          this.formData.dateRange = this.defaultDateRange;
        else this.$refs[key].handleInputReset();
      }
    },
    handleDateInput(dateRange) {
      this.formData.dateRange = dateRange;
    },
    restrictLast4() {
      this.$nextTick(() => {
        if (this.formData.last4?.length >= 4) {
          this.formData.last4 = this.formData.last4.substring(0, 4);
        }
      });
    },
    setFormLimit(limit) {
      this.formData.limit = limit;
      this.submitSearch();
    },
    async submitSearch() {
      let formData = JSON.parse(JSON.stringify(this.formData));
      formData.startDate = formData.dateRange[0];
      formData.endDate = formData.dateRange[1];
      delete formData.dateRange;

      this.loading = true;
      await this.ordersStore.searchOrders(formData);
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.kiosk-number-divider {
  margin-left: 8px;
  margin-right: 8px;
  border-right: 2px solid rgb(var(--v-theme-blue-grey-lighten-4));
}
.validation-error-message {
  font-size: 12px;
  line-height: 12px;
}
</style>
