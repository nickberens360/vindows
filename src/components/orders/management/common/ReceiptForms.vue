<template>
  <div>
    <v-form
      v-if="!formSubmitted"
      ref="form"
      v-model="isFormValidated"
      validate-on="blur"
    >
      <RadioToggleBar
        v-model="radioValue"
        :radio-items="radioItems"
        class="pl-0"
      />
      <div v-if="radioValue === 'email'">
        <label
          for="email"
          class="text-caption-2 text-blue-grey"
        >Email Address</label>
        <v-text-field
          id="email"
          ref="email"
          v-model="formData.email"
          :rules="validEmail"
          color="primary"
          placeholder="name@email.com"
          variant="underlined"
          density="compact"
          autofocus
          class="text-blue-dark"
        />
      </div>
      <div v-else>
        <label
          for="phone"
          class="text-caption-2 text-blue-grey"
        >Phone Number</label>
        <v-text-field
          id="phone"
          ref="phone"
          v-model="formData.phone"
          :rules="phoneNumber"
          color="primary"
          placeholder="555-123-4567"
          density="compact"
          variant="underlined"
          autofocus
          class="text-blue-dark"
        />
      </div>

      <v-row
        justify="end"
        align="center"
        class="flex-row"
      >
        <v-col class="flex-grow-0 pr-0">
          <v-btn
            color="primary"
            variant="outlined"
            class="mr-2"
            @click.prevent="handleCancel"
          >
            Cancel
          </v-btn>
        </v-col>
        <v-col class="flex-grow-0">
          <v-btn
            type="submit"
            color="primary"
            variant="flat"
            :disabled="!isFormValidated || emptyInput"
            @click.prevent="handleReceiptSubmit"
          >
            {{ submitButtonText }}
          </v-btn>
        </v-col>
      </v-row>
      <v-expand-transition>
        <p
          v-if="errorMessage"
          class="mt-4 py-2 px-4 text-caption bg-error rounded font-weight-bold"
        >
          {{ errorMessage }}
        </p>
      </v-expand-transition>
    </v-form>
    <SuccessAnimation
      v-if="formSubmitted && !errorMessage && !hideSuccessAnimation"
      :icon-primary="successIcon"
      :class="{ 'success-animation--text': radioValue === 'text' }"
      @animation-complete="handleAnimationComplete"
    >
      <template #message>
        Receipt has been
        <span class="font-weight-bold">{{ sendMethodLabel }}</span> to
        <span class="font-weight-bold">{{ receiptData.recipient }}.</span>
      </template>
    </SuccessAnimation>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useOrdersStore } from '@/store/orders';
import { phoneNumber, validEmail, required } from '@/utilities/validationRules';
import RadioToggleBar from '@/components/base/RadioToggleBar';
import SuccessAnimation from '@/components/base/SuccessAnimation';

export default {
  name: 'ReceiptForms',
  components: {
    SuccessAnimation,
    RadioToggleBar,
  },
  props: {
    customer: {
      type: Object,
      default: null,
    },
    session: {
      type: Object,
      default: null,
    },
    hideSuccessAnimation: {
      type: Boolean,
      default: false,
    },
    submitButtonText: {
      type: String,
      default: 'Send Receipt',
    },
  },
  emits: ['receipt-submission-complete', 'receipt-submission-cancelled'],
  data() {
    return {
      radioValue: 'email',
      validEmail,
      phoneNumber,
      required,
      radioItems: [
        {
          label: 'Email',
          value: 'email',
        },
        {
          label: 'Text',
          value: 'phone',
        },
      ],
      isFormValidated: false,
      formSubmitted: false,
      errorMessage: null,
      successIcon: null,
      sendMethodLabel: null,

      formData: {
        email: null,
        phone: null,
      },
      receiptData: {
        notes: null, // optional
        recipient: '', // email address or phone number
        zoneOffset: '-06:00', // timezone offset of CS agent - TODO: get from current user
      },
    };
  },
  computed: {
    ...mapStores(useOrdersStore),
    emptyInput() {
      return !this.formData[this.radioValue];
    },
    isTextReceiptEnabled() {
      //QT3 machines do not support text receipts, option is hidden for QT3 machines
      return this.session?.kioskNumber.toLowerCase().includes('x');
    },
  },
  watch: {
    radioValue() {
      this.$nextTick(() => {
        this.$refs.form.validate();
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.isTextReceiptEnabled) {
        this.radioItems = this.radioItems.filter(
          (item) => item.value !== 'phone'
        );
      }
      this.formData.email = this?.customer?.email || null;
      this.formData.phone = this?.customer?.phoneNumber || null;
      this.$refs.form.validate();
    });
  },
  methods: {
    handleCancel() {
      this.$emit('receipt-submission-cancelled');
    },
    handleAnimationComplete() {
      this.$emit('receipt-submission-complete');
      this.formSubmitted = false;
    },
    async handleReceiptSubmit() {
      if (this.errorMessage) {
        this.resetErrorMessage();
      }

      if (this.radioValue === 'email') {
        this.receiptData.recipient = this.formData.email;
      } else {
        this.receiptData.recipient = this.formData.phone;
      }
      try {
        await this.ordersStore.sendOrderReceipt(this.session.sessionId, {
          ...this.receiptData,
        });
        this.formSubmitted = true;
        this.setSuccessMessage();
        if (this.hideSuccessAnimation) {
          this.$emit('receipt-submission-complete');
        }
      } catch (error) {
        this.formSubmitted = false;
        this.errorMessage = this.ordersStore.getOrderErrorMessage(error);
      }
    },
    resetErrorMessage() {
      this.errorMessage = false;
    },
    setSuccessMessage() {
      if (this.radioValue === 'email') {
        this.successIcon = 'fad fa-envelope-open-text';
        this.sendMethodLabel = 'emailed';
      } else {
        this.successIcon = 'fad fa-message-text';
        this.sendMethodLabel = 'texted';
      }
    },
  },
};
</script>

<style scoped></style>
