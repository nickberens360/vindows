<template>
  <v-card
    class="refund-info-card elevation-4 px-2 pt-2 text-blue-grey-darken-2"
  >
    <v-card-title class="pb-3 text-subtitle-2">
      <v-icon
        size="16"
        color="blue-grey-darken-1"
        icon="fas fa-user"
      />
      <span class="ml-1 text-blue-grey-darken-1 font-weight-bold">
        {{ username }}
      </span>
      <span class="ml-2">{{ date }}</span>
    </v-card-title>
    <v-card-text class="text-blue-grey-lighten-2 text-subtitle-2">
      <v-row class="text-no-wrap">
        <v-col class="d-flex flex-column">
          <span>Refund Reason</span>
          <span class="text-no-wrap text-blue-grey-darken-1">
            {{ reason }}
          </span>
        </v-col>
        <v-col class="d-flex flex-column">
          <span>Refund Amount</span>
          <span class="text-blue-grey-darken-1"> {{ $currency(amount) }} </span>
        </v-col>
        <v-col>
          <span>Refunded To</span>
          <PaymentInfo
            content-size="sm"
            hide-label
            hide-processor
          />
        </v-col>
      </v-row>
      <v-row class="mx-0">
        Notes
      </v-row>
      <v-row class="mx-0 mb-2 text-blue-grey-darken-1">
        {{ notes }}
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import PaymentInfo from '@/components/orders/management/common/PaymentInfo';

export default {
  name: 'RefundDetailsCard',
  components: {
    PaymentInfo,
  },
  props: {
    amount: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      default: '',
    },
    reason: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  computed: {
    date() {
      const [year, month, day] = this.timestamp.substring(0, 10).split('-');
      const formattedDate = `${parseInt(month)}/${parseInt(day)}/${year}`;
      return formattedDate;
    },
  },
};
</script>

<style lang="scss" scoped>
.refund-info-card {
  width: 450px;

  .v-card-title .v-icon {
    margin-top: -4px; // adjusts icon up to be centered
  }
}
</style>
