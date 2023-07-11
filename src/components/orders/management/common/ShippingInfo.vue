<template>
  <v-card class="pa-4">
    <v-card-text class="py-0">
      <InfoField label="Tracking Info">
        <template #details>
          <h3 v-if="hasShipments">
            <span class="text-primary-darken-1 font-weight-regular">
              {{ numberOfShipments }}
              {{ numberOfShipments > 1 ? "Packages" : "Package" }}
            </span>
            <VIcon
              class="ml-3"
              icon="fa-light fa-truck-moving"
            />
          </h3>
          <div
            v-else
            class="text-grey mt-6 d-flex"
          >
            <v-badge
              color="grey"
              location="top start"
              class="ml-3"
            >
              <v-icon icon="fa-light fa-truck-moving" />
            </v-badge>
            <span class="ml-4">No shipping info available</span>
          </div>
        </template>
      </InfoField>
    </v-card-text>
    <v-card-text class="pt-2">
      <table
        v-if="hasShipments"
        class="shipping-table ml-n2"
      >
        <tbody>
          <ShipmentDetails
            v-for="(shipment, identifier, index) in currentShipmentActivities"
            :key="identifier"
            :badge-content="index + 1"
            :shipment="shipment"
          />
        </tbody>
      </table>
    </v-card-text>
  </v-card>
</template>

<script>
import ShipmentDetails from '@/components/orders/management/common/ShipmentDetails.vue';
import InfoField from '@/components/base/InfoField';
export default {
  name: 'ShippingInfo',
  components: {
    InfoField,
    ShipmentDetails,
  },
  props: {
    order: {
      required: true,
      type: Object,
    },
  },
  computed: {
    shipments() {
      if (!this.order || !this.order.activity) return;
      return this.order.activity.filter(
        (activity) => activity.type === 'Shipment'
      );
    },
    currentShipmentActivities() {
      if (!this.shipments) return;
      return [...this.shipments].reduce((acc, shipment) => {
        acc[shipment.identifier] = shipment;
        return acc;
      }, {});
    },
    numberOfShipments() {
      if (!this.currentShipmentActivities) return 0;
      return Object.keys(this.currentShipmentActivities).length;
    },
    hasShipments() {
      return this.numberOfShipments > 0;
    },
  },
};
</script>
