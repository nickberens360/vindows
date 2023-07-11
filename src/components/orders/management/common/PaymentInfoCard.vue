<template>
  <div
    ref="drawerActions"
    class="bg-primary-lighten-5 d-block px-6 pb-6 pt-3"
  >
    <div
      class="d-flex align-center mb-4"
      style="min-height: 56px;"
    >
      <v-checkbox
        v-if="showIncludeShipping"
        v-model="includeShipping"
        label="Checkbox"
        true-icon="fas fa-check"
        :ripple="false"
        class="meru-styled-checkbox meru-styled-checkbox--small flex-grow-0 ml-n2 details-absolute"
      >
        <template #label>
          <span
            class="ml-1 text-blue-dark"
          >
            Include Shipping: <span class="font-weight-bold ml-2">{{ $currency(shippingTotal) }}</span>
          </span>
        </template>
      </v-checkbox>
      <div
        :class="{'ml-n6': !showIncludeShipping}"
        class="d-flex"
      >
        <LabelValue
          label="Subtotal:"
          :value="$currency(subTotal)"
          class="ml-6"
        />
        <LabelValue
          label="Taxes:"
          :value="$currency(taxTotal)"
          class="ml-6"
        />
      </div>
    </div>
    <v-row
      justify="space-between"
      align="start"
      no-gutters
      class="mb-3"
    >
      <v-col>
        <PaymentInfo />
      </v-col>
      <v-col cols="auto">
        <LabelValue
          label="Total:"
          :value="$currency(total)"
          size="lg"
        />
      </v-col>
    </v-row>
    <v-row
      justify="space-between"
      no-gutters
    >
      <v-spacer />
      <v-col class="flex-grow-0">
        <VBtn
          color="primary"
          elevation="0"
          :disabled="!isFormValid"
          @click="$emit('submit-initiated', true)"
        >
          Submit
        </VBtn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LabelValue from '@/components/base/LabelValue';
import PaymentInfo from '@/components/orders/management/common/PaymentInfo';

export default {
  name: 'PaymentInfoCard',
  components: {
    LabelValue,
    PaymentInfo,
  },
  props: {
    showIncludeShipping: {
      type: Boolean,
      default: false,
    },
    shippingTotal: {
      type: [Number, String],
      default: '0',
    },
    subTotal: {
      type: [Number, String],
      default: '0',
    },
    taxTotal: {
      type: [Number, String],
      default: '0',
    },
    total: {
      type: [Number, String],
      default: '0',
    },
    isFormValid: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['submit-initiated', 'include-shipping'],
  data() {
    return {
      includeShipping: true
    };
  },
  watch: {
    includeShipping() {
      this.$emit('include-shipping', this.includeShipping);
    },
  },
};
</script>

<style scoped lang="scss">

</style>
