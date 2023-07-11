import { computed, unref } from 'vue';

export function useOrderStage(order) {
  let stageColor = computed(() => {
    switch (unref(order)?.stage) {
    case 'refunded':
      return 'rgb(var(--v-theme-stage-refunded))';
    case 'exception':
      return 'rgb(var(--v-theme-error))';
    case 'processed':
      return 'rgb(var(--v-theme-stage-processed))';
    case 'pending-submission':
      return 'rgb(var(--v-theme-warning))';
    case 'pending-ship':
      return 'rgb(var(--v-theme-stage-pending-ship))';
    case 'pending-cash-refund':
      return 'rgb(var(--v-theme-warning))';
    case 'shipped':
      return 'rgb(var(--v-theme-stage-shipped))';
    case 'eport-refund-recorded':
      return 'rgb(var(--v-theme-stage-refunded))';
    case 'declined':
      return 'rgb(var(--v-theme-stage-declined))';
    default:
      return 'rgb(var(--v-theme-grey))';
    }
  });

  let stageLabel = computed(() => {
    switch (unref(order)?.stage) {
    case 'pending-ship':
      return 'Pending Shipment';
    case 'eport-refund-recorded':
      return 'Eport Refund';
    case 'declined':
      return 'Payment Declined';
    default:
      return kebabToUpperSpace(unref(order)?.stage) || 'Undefined';
    }
  });

  return {
    stageColor,
    stageLabel,
  };
}

function kebabToUpperSpace(string) {
  return (string || '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ')
    .trim();
}
