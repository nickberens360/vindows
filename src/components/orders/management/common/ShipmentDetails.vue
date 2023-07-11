<template>
  <tr>
    <td class="pr-1">
      <v-badge
        left
        inline
        :color="shipmentStatusColor"
        :content="props.badgeContent"
      />
    </td>
    <td class="pr-4 text-grey text-body-4 text-decoration-underline">
      {{ shipmentIdentifier }}
    </td>
    <td
      class="pr-2 pl-1"
      :class="`text-${shipmentStatusColor} text-caption-2`"
    >
      {{ shipmentStatusName }}
    </td>
    <td class="text-grey text-caption-2">
      {{ shipmentTimeStamp }}
    </td>
  </tr>
</template>

<script setup>
import { useShipmentDetails } from '@/composables/orders/ShipmentDetails';
const {
  shipmentStatusColor,
  shipmentStatusName,
  shipmentTimeStamp,
  shipmentIdentifier
} = useShipmentDetails(props.shipment);

const props = defineProps({
  shipment: {
    type: Object,
    required: true,
  },
  badgeContent: {
    type: Number,
    required: true
  }
});
</script>

<style scoped lang="scss">
:deep(.v-badge__badge){
  box-shadow: 0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
}
</style>
