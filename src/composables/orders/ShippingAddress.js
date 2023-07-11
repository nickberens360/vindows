import { computed, unref } from 'vue';

export function useShippingAddress(order) {
  let shippingAddress = computed(() => unref(order)?.shippingAddress);
  let addressLine1 = computed(() => shippingAddress.value?.street || '');
  let addressLine2 = computed(() => (shippingAddress.value ?
    `${shippingAddress.value.city}, ${shippingAddress.value.state} ${shippingAddress.value.zip}` :
    ''
  )
  );
  return {
    shippingAddress,
    addressLine1,
    addressLine2
  };
}
