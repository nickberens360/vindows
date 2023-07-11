<template>
  <div>
    <v-sheet class="order-info-row">
      <v-row>
        <v-col cols="4">
          <h2 class="text-primary-darken-1 text-h4 font-weight-medium mb-2">
            {{ order?.customer?.name || "" }}
          </h2>
          <v-row>
            <v-col>
              <ShippingAddress />
            </v-col>
            <v-col>
              <ContactInfo />
            </v-col>
          </v-row>
          <v-row align="end">
            <v-col>
              <PaymentInfo />
            </v-col>
            <v-col class="d-flex align-center">
              <v-btn
                variant="outlined"
                color="primary"
                height="44px"
                @click="$emit('send-receipt')"
              >
                <v-icon
                  icon="fas fa-paper-plane"
                  class="mr-2"
                />
                Send Receipt
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical />
        <v-col
          cols="4"
          class="ma-auto"
          style="max-width: 380px"
        >
          <TransactionDate class="mb-8" />
          <TransactionLocation />
        </v-col>
        <v-divider vertical />
        <v-col
          class="pl-10"
          cols="4"
        >
          <ShippingInfo
            class="elevation-0"
            :order="order"
          />
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>
<script>
import { inject } from 'vue';
import { useAppStore } from '@/store/app';
import { mapStores } from 'pinia';
import ContactInfo from '@/components/orders/management/common/ContactInfo';
import PaymentInfo from '@/components/orders/management/common/PaymentInfo';
import ShippingAddress from '@/components/orders/management/common/ShippingAddress';
import ShippingInfo from '@/components/orders/management/common/ShippingInfo';
import TransactionDate from '@/components/orders/management/common/TransactionDate';
import TransactionLocation from '@/components/orders/management/common/TransactionLocation';

export default {
  name: 'OrderInfoRow',
  components: {
    ShippingInfo,
    TransactionLocation,
    TransactionDate,
    ContactInfo,
    PaymentInfo,
    ShippingAddress,
  },
  emits: ['send-receipt'],
  setup() {
    const order = inject('order');
    return {
      order,
    };
  },
  computed: {
    ...mapStores(useAppStore),
  },
};
</script>
