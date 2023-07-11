<template>
  <v-card class="py-4 px-8">
    <v-row>
      <v-col>
        <h2 class="text-primary-darken-1 text-h4 font-weight-medium mb-2">
          {{ order.customer.name || "" }}
        </h2>
        <v-row class="mb-3">
          <v-col>
            <ShippingAddress />
          </v-col>
          <v-col>
            <ContactInfo />
          </v-col>
        </v-row>
        <v-divider />
        <v-row class="mt-1">
          <v-col>
            <PaymentInfo />
          </v-col>
          <v-col class="d-flex align-center justify-end text-primary">
            <span>{{ $currency(order?.payment?.total) }}</span>
          </v-col>
        </v-row>
        <v-row
          class="mt-8 mb-3 mr-0"
          justify="end"
        >
          <v-btn
            color="primary"
            height="44px"
            variant="elevated"
            @click="openOrderDetails"
          >
            Refund
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { computed } from 'vue';
import { mapStores } from 'pinia';
import { useAppStore } from '@/store/app';
import ContactInfo from '@/components/orders/management/common/ContactInfo';
import PaymentInfo from '@/components/orders/management/common/PaymentInfo';
import ShippingAddress from '@/components/orders/management/common/ShippingAddress';

export default {
  name: 'CustomerInfoCard',
  components: {
    ContactInfo,
    PaymentInfo,
    ShippingAddress,
  },
  provide() {
    return {
      order: computed(() => this.order),
    };
  },
  props: {
    order: {
      required: true,
      type: Object,
    },
  },
  computed: {
    ...mapStores(useAppStore),
    sessionId() {
      return this.order.session.sessionId;
    },
  },
  methods: {
    openOrderDetails() {
      this.$router.push({
        name: 'orderDetails',
        params: { sessionId: this.sessionId },
      });
    },
  },
};
</script>
