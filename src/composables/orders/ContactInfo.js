import { computed, unref } from 'vue';

export function useContactInfo(order) {
  const isDetailedOrder = computed(() => typeof unref(order)?.customer === 'object');

  let name = computed(() => isDetailedOrder.value ? unref(order)?.name : unref(order)?.customer?.name);
  let phoneNumber = computed(() => unref(order)?.customer?.phoneNumber || '');
  let emailAddress = computed(() => (isDetailedOrder.value ? unref(order)?.customer?.email : unref(order)?.email));

  return {
    name,
    phoneNumber,
    emailAddress
  };
}
