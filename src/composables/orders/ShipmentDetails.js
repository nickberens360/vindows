import { computed, unref } from 'vue';
import { kebabToUpperSpace } from '@/utilities/kebabToUpperCase';
import { fullDateWithTime } from '@/utilities/dateFormatter';

export function useShipmentDetails(passedShipment) {
  let shipment = unref(passedShipment);
  if(!shipment) return;

  let shipmentStatusName = computed(() => kebabToUpperSpace(shipment.status));
  let shipmentTimeStamp = computed(() => fullDateWithTime(shipment.timestamp));
  let shipmentIdentifier = computed(() => shipment.identifier);

  let shipmentStatusColor = computed(() => {
    const states = {
      'refunded': 'stage-refunded',
      'pending-ship': 'stage-pending-ship',
      'shipped' : 'stage-shipped',
      'delivered' : 'success',
      'default': 'grey'
    };

    return states[shipment.status] || states['default'];
  });

  return {
    shipmentStatusColor,
    shipmentStatusName,
    shipmentTimeStamp,
    shipmentIdentifier
  };
}
