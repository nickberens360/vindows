<template>
  <ItemRow
    class="text-blue-dark cursor-pointer mx-9"
    v-bind="$props"
  >
    <span>{{ order }}</span>
    <template #center-col>
      <v-row
        class="d-flex align-center flex-nowrap text-blue-dark text-body-4"
        no-gutters
      >
        <v-col
          cols="2"
          class="d-flex align-center flex-wrap"
        >
          <v-sheet
            class="mr-2 flex-shrink-0"
            :color="stageColor"
            height="40"
            width="40"
          />
          <v-tooltip
            activator="parent"
            content-class="bg-grey-darken-2"
            location="top center"
          >
            {{ stageLabel }}
          </v-tooltip>
          {{ order.transactionId }}
        </v-col>
        <v-col
          cols="2"
          class="d-flex align-center"
        >
          <img
            alt="Kiosk Image"
            class="ml-2 mr-6"
            :src="kioskTypeBadgeImageSource"
          >
          <v-tooltip
            activator="parent"
            content-class="bg-grey-darken-2"
            location="top center"
            origin="bottom end"
          >
            {{ kioskTypeBadge.machine }}
          </v-tooltip>
          {{ order.kioskNumber }}
        </v-col>
        <v-col
          cols="2"
          class="ml-2"
        >
          <span class="font-weight-bold">
            {{ formattedTimestamp.date }}
          </span>
          {{ formattedTimestamp.time }}
        </v-col>
        <v-col
          cols="3"
          class="mr-2"
        >
          <span v-if="order.email">
            {{ order.email }}
          </span>
        </v-col>
        <v-col cols="1">
          {{ $currency(order.amount) }}
        </v-col>
        <v-col
          cols="2"
          class="d-flex justify-start"
        >
          <v-chip
            v-if="order.pan"
            class="cursor-pointer"
            color="blue"
            variant="elevated"
          >
            {{ order.pan.substring(order.pan.length - 4) }}
            <v-icon
              class="icon-duotone-credit-card ml-2"
              icon="fad fa-credit-card"
              size="24"
            />
            <span class="ml-2">{{ order.name }}</span>
          </v-chip>
          <span v-else>
            <v-icon
              :class="paymentType.css"
              :icon="paymentType.icon"
              size="50"
            />
            <v-tooltip
              activator="parent"
              content-class="bg-grey-darken-2"
              location="top center"
            >
              {{ order.paymentType }}
            </v-tooltip>
          </span>
        </v-col>
      </v-row>
    </template>
  </ItemRow>
</template>

<script>
import { parseISO, format } from 'date-fns';
import { useOrderStage } from '@/composables/orders/OrderStage';
import ItemRow from '@/components/base/ItemRow';

export default {
  name: 'OrdersRow',
  components: {
    ItemRow,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { stageColor, stageLabel } = useOrderStage(props.order);
    return { stageColor, stageLabel };
  },
  computed: {
    formattedTimestamp() {
      const date = format(parseISO(this.order.timestamp), 'MM/dd/yyyy');
      const time = format(parseISO(this.order.timestamp), 'h:mm a');
      return { date, time };
    },
    kioskTypeBadge() {
      let kiosk = {
        product: 'key',
        machine: 'MinuteKey',
      };
      const kioskIdentifier = this.order.kioskNumber.charAt(0);

      if (kioskIdentifier === 'X') {
        kiosk.product = 'tag';
        kiosk.machine = 'Quick Tag';
      }
      return kiosk;
    },
    kioskTypeBadgeImageSource() {
      const url = import.meta.env.VITE_API_URL || '';
      const kioskType = this.kioskTypeBadge.product;
      return `${url}/assets/images/machine/${kioskType}-kiosk-badge.svg`;
    },
    paymentType() {
      const paymentTypes = {
        cash: {
          css: 'icon-duotone-money-bill-1',
          icon: 'fad fa-money-bill-1',
        },
        coupon: {
          css: 'icon-duotone-coupon',
          icon: 'fad fa-ticket',
        },
        upc: {
          css: 'icon-duotone-upc',
          icon: 'fad fa-rectangle-barcode',
        },
      };
      return paymentTypes[this.order.paymentType];
    },
  },
};
</script>

<style lang="scss" scoped></style>
