import { computed, unref } from 'vue';
import { fullDateWithTime } from '@/utilities/dateFormatter';
import { formattedWeekDayName } from '@/utilities/dateFormatter';

export function useOrderActivity(item) {

  const type = computed(() => unref(item)?.type || '');
  const username = computed(() => unref(item)?.username || '');
  const items = computed(() => unref(item)?.items || []);
  const amount = computed(() => unref(item)?.amount || []);
  const identifier = computed(() => unref(item)?.identifier || '');
  const status = computed(() => unref(item)?.status || '');
  const email = computed(() => unref(item)?.email || '');
  const message = computed(() => unref(item)?.message || '');
  const addressVerification = computed(() => unref(item)?.addressVerification || '');
  const timestamp = computed(() => fullDateWithTime(unref(item)?.timestamp) || '');
  const weekDay = computed(() => formattedWeekDayName(unref(item)?.timestamp, 'shortName' ) || '');
  const skus = computed(() => unref(item)?.skus || '');

  const statusColor = computed(() => {
    switch (unref(item)?.status) {
    case 'success':
      return 'rgb(var(--v-theme-success))';
    case 'exception':
      return 'rgb(var(--v-theme-error))';
    case 'processed':
      return 'rgb(var(--v-theme-stage-processed))';
    case 'declined':
      return 'rgb(var(--v-theme-stage-declined))';
    default:
      return 'rgb(var(--v-theme-grey))';
    }
  });

  return {
    type,
    username,
    items,
    identifier,
    status,
    email,
    message,
    addressVerification,
    timestamp,
    weekDay,
    amount,
    skus,
    statusColor,
  };
}
