<template>
  <div
    v-if="showSuccessAnimation"
    class="d-flex flex-column align-center h-100 justify-center"
  >
    <SuccessAnimation
      icon-primary="fad fa-circle-dollar"
      @animation-complete="handleSuccessAnimationComplete"
    >
      <template #message>
        <strong>{{ $currency(successTotal) }}</strong> successfully
        <strong>refunded</strong> to <strong>{{ order.customer?.name }}</strong>.
      </template>
    </SuccessAnimation>
  </div>
  <div
    v-if="errorMessage"
    class="d-flex flex-column align-center justify-center h-100 px-12"
  >
    <v-icon
      class="order-refund-drawer__error-close-icon text-white cursor-pointer"
      size="24"
      icon="fal fa-times"
      @click="handleClearError"
    />
    <p class="mt-4 py-10 px-4 text-caption bg-error rounded font-weight-bold">
      {{ errorMessage }}
    </p>
  </div>

  <v-slide-x-reverse-transition>
    <RefundEportCard v-if="showEportCard" />
  </v-slide-x-reverse-transition>

  <v-slide-x-reverse-transition>
    <v-card
      v-if="selectedItems.length > 0"
      elevation="0"
      rounded="0"
      class="order-refund-drawer"
      color="primary-lighten-5 d-flex flex-column"
    >
      <div class="order-refund-drawer__header">
        <v-card-title class="bg-primary-lighten-3 py-4">
          <span class="text-white">Refund</span>
        </v-card-title>
        <RadioToggleBar
          v-if="selectedItems.length > 1 && !showConfirmationCard"
          v-model="radioValue"
          :radio-items="radioItems"
          class="elevation-5 bg-primary-lighten-5"
        />
      </div>
      <v-row
        v-show="!showConfirmationCard"
        class="flex-column"
        no-gutters
      >
        <v-col>
          <v-card-text class="order-refund-drawer__content pa-0 pt-4 pl-4 pr-8">
            <v-form
              ref="refundForm"
              v-model="refundFormValid"
              validate-on="input"
            >
              <RefundItem
                v-for="(refundItem, index) in selectedItems"
                :key="refundItem.id"
                :item="refundItem"
                class="mb-4"
                :show-item-reason="radioValue === 'different'"
                @refund-reason-selected="handleDifferentReasonSelected"
              >
                <template #append>
                  <SelectWithTextarea
                    v-if="radioValue === 'different'"
                    :items="reasons"
                    :item-id="index"
                    :model-value="getRefundDifferentReason(refundItem)"
                    select-label="Reason"
                    text-area-label="Description"
                    select-required
                    text-area-required
                    is-visible
                    class="mt-4"
                    @update:selection="handleDifferentReasonSelected"
                  />
                </template>
              </RefundItem>
              <SelectWithTextarea
                v-if="radioValue !== 'different'"
                :items="reasons"
                :model-value="refundSameReason"
                select-label="Reason"
                text-area-label="Description"
                select-required
                text-area-required
                is-visible
                @update:selection="handleReasonSameSelected"
              />
            </v-form>
          </v-card-text>
        </v-col>
        <div class="order-refund-drawer__footer">
          <PaymentInfoCard
            :sub-total="refundSubtotal"
            :tax-total="refundTaxTotal"
            :shipping-total="refundShippingCost"
            :total="refundTotal"
            :is-form-valid="refundFormValid"
            :show-include-shipping="ordersStore.getIsShippingRefundable"
            :class="{ 'elevation-10': !showConfirmationCard }"
            @include-shipping="handleIncludeShippingChanged"
            @submit-initiated="handleSubmitInitiated"
          />
        </div>
      </v-row>
      <v-slide-x-reverse-transition>
        <RefundConfirmationCard
          v-if="showConfirmationCard"
          :order="order"
          :items="selectedItems"
          :shipping="refundShippingCost"
          :taxes="refundTaxTotal"
          :total="refundTotal"
          :show-shipping="includeShipping"
          class="animation-item"
          @form-confirmation-complete="handleFormConfirmationComplete"
          @form-confirmation-cancelled="handleFormConfirmationCancelled"
        />
      </v-slide-x-reverse-transition>
    </v-card>
  </v-slide-x-reverse-transition>
</template>

<script>
import { inject } from 'vue';
import { mapStores } from 'pinia';
import { useOrdersStore } from '@/store/orders';
import RefundConfirmationCard from '@/components/orders/management/details/RefundConfirmationCard';
import RefundEportCard from '@/components/orders/management/details/RefundEportCard';
import RefundItem from '@/components/orders/management/details/RefundItem';
import PaymentInfoCard from '@/components/orders/management/common/PaymentInfoCard';
import RadioToggleBar from '@/components/base/RadioToggleBar';
import SelectWithTextarea from '@/components/base/SelectWithTextarea';
import SuccessAnimation from '@/components/base/SuccessAnimation';

export default {
  name: 'OrderRefundDrawer',
  components: {
    RefundEportCard,
    SuccessAnimation,
    RefundConfirmationCard,
    PaymentInfoCard,
    SelectWithTextarea,
    RadioToggleBar,
    RefundItem,
  },
  props: {
    selectedItems: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['refund-items-updated', 'submit-initiated', 'refund-complete'],
  setup() {
    const order = inject('order');
    return {
      order,
    };
  },
  data: () => ({
    refundFormValid: false,
    resetReasonInputs: false,
    radioValue: 'same',
    showConfirmationCard: false,
    showSuccessAnimation: false,
    successTotal: 0,
    showEportCard: false,
    errorMessage: null,
    radioItems: [
      {
        label: 'Reason is the same for all',
        value: 'same',
      },
      {
        label: 'Different Reasons',
        value: 'different',
      },
    ],
    reasons: [
      {
        text: 'Wrong Product',
        value: 'wrong-product',
      },
      {
        text: 'Unsatisfactory Product',
        value: 'unsatisfactory-product',
      },
      {
        text: 'Wrong Color',
        value: 'wrong-color',
      },
      {
        text: 'Other',
        value: 'other',
      },
    ],
    includeShipping: true,
    formData: {
      items: [],
      reason: null, // required
      notes: null, // required
      email: null, // email should stay null, receipt is handled in refund confirmation card
      mailRefund: false, // if true only create refund record, don't submit to payment processor
      zoneOffset: '-06:00',
    },
  }),
  computed: {
    ...mapStores(useOrdersStore),
    isEportOrder() {
      return this.order?.payment?.card?.processor === 'Eport';
    },
    selectedRefundItems() {
      return this?.selectedItems || [];
    },
    refundSameReason() {
      return {
        selected: this.formData.reason,
        textAreaData: this.formData.notes,
      };
    },
    refundShippingCost() {
      return this.order?.payment.shippingTotal || 0;
    },
    refundSubtotal() {
      let sum = 0;
      this.selectedRefundItems.forEach((item) => (sum += item.subTotal));

      return sum;
    },
    refundTaxTotal() {
      let sum = 0;

      this.selectedRefundItems.forEach((item) => (sum += item.tax));

      if (this.includeShipping) {
        sum +=
          this.order.payment.shippingTotal * this.order.payment.shippingTaxRate;
      }

      return sum;
    },
    refundTotal() {
      if (this.includeShipping) {
        return (
          this.refundTaxTotal + this.refundSubtotal + this.refundShippingCost
        );
      } else {
        return this.refundTaxTotal + this.refundSubtotal;
      }
    },
  },
  watch: {
    selectedItems: {
      handler(itemsToRefund) {
        if (itemsToRefund) {
          this.formData.items = itemsToRefund.map((item) => {
            let existingFormItem = this.formData.items.find(
              ({ id }) => item.id === id
            );
            let itemReason = existingFormItem?.reason || null;
            let itemNotes = existingFormItem?.notes || null;
            return {
              id: item.id,
              amount: item.total,
              itemId: item.itemId,
              notes: itemNotes,
              quantity: 1,
              reason: itemReason,
            };
          });

          this.$emit('refund-items-updated', this.formData);
        }
      },
      deep: true,
      immediate: true,
    },
    radioValue: {
      handler(reasonVal) {
        this.$nextTick(() => {
          const { items, notes, reason } = this.formData;
          let sameReasonComplete = !!reason && !!notes;
          let differentReasonComplete = items.every(
            (item) => !!item.reason || (item.reason === 'other' && !!item.notes)
          );
          if (reasonVal === 'same' && sameReasonComplete) {
            this.$refs.refundForm.validate();
          }
          if (reasonVal === 'different' && differentReasonComplete) {
            this.$refs.refundForm.validate();
          }
        });
      },
    },
  },
  mounted() {
    if (!this.ordersStore.getIsShippingRefundable) {
      this.includeShipping = false;
    }
  },
  methods: {
    getRefundDifferentReason(refundItem) {
      let item = this.formData.items.find((item) => item.id === refundItem.id);
      return {
        selected: item.reason,
        textAreaData: item.notes,
      };
    },
    handleAddShippingToRefund() {
      if (this.ordersStore.getIsShippingRefundable) {
        let shipping = this.ordersStore.orderDetails.items.find(
          (item) => item.type === 'SH'
        );
        this.formData.items.push({
          itemId: shipping.itemId,
          amount: shipping.total,
          reason: 'Shipping Refund',
        });
      }
    },
    handleClearError() {
      this.errorMessage = null;
    },
    handleSuccessAnimationComplete() {
      this.showSuccessAnimation = false;
    },
    handleSubmitInitiated() {
      this.showConfirmationCard = true;
    },
    async handleFormConfirmationComplete() {
      this.handleAddShippingToRefund();
      try {
        await this.ordersStore.submitOrderRefund(
          this.order.session.sessionId,
          this.formData
        );
        if (this.isEportOrder) {
          this.showEportCard = true;
        } else {
          this.showSuccessAnimation = true;
        }
        this.showConfirmationCard = false;
        this.successTotal = this.refundTotal;
        this.$refs.refundForm.reset();
        this.$emit('refund-complete');
      } catch (error) {
        this.showConfirmationCard = false;
        this.errorMessage = this.ordersStore.getOrderErrorMessage(error);
      }
    },
    handleFormConfirmationCancelled() {
      this.showConfirmationCard = false;
    },
    handleDifferentReasonSelected({ itemId, selected, textAreaData }) {
      this.formData.items[itemId].reason = selected;
      this.formData.items[itemId].notes = textAreaData;
    },
    handleReasonSameSelected(reason) {
      this.formData.reason = reason.selected;
      this.formData.notes = reason.textAreaData;
    },
    handleIncludeShippingChanged(includeShipping) {
      this.includeShipping = includeShipping;
    },
  },
};
</script>

<style scoped lang="scss">
.order-refund-drawer {
  height: 100%;
  overflow: auto;
}

.order-refund-drawer__header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.order-refund-drawer__footer {
  position: sticky;
  bottom: 0;
}

.order-refund-drawer__error-close-icon {
  position: relative;
  top: 45px;
  left: 240px;
}

.v-card-title {
  position: relative;
  z-index: 20;
}
</style>
