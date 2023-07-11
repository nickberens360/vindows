<template>
  <DetailLabelValue
    primary-label="Received"
    variant="bold"
    :primary-value="formattedTimestamp.date"
    :secondary-label="transactionIdLabel"
    :secondary-value="transactionIdValue"
  >
    <template
      v-if="formattedTimestamp.hasException"
      #primary-value-append
    >
      <HoverableIcon
        class="d-inline-flex"
        card-title-color="error"
      >
        <template #icon>
          <v-icon
            class="icon-duotone-circle-exclamation"
            icon="fad fa-circle-exclamation"
            size="34"
          />
        </template>
        <template #card-title>
          <span>{{ formattedTimestamp.exceptionTitle }}</span>
        </template>
        <template #card-content>
          <span>{{ formattedTimestamp.exceptionMessage }}</span>
        </template>
      </HoverableIcon>
    </template>
  </DetailLabelValue>
</template>

<script>
import DetailLabelValue from '@/components/base/DetailLabelValue';
import HoverableIcon from '@/components/base/HoverableIcon';
import { fullDate } from '@/utilities/dateFormatter';
import { differenceInDays, parseISO } from 'date-fns';
export default {
  name: 'KeyOrderDate',
  components: { HoverableIcon, DetailLabelValue },
  props: {
    timestamp: {
      type: String,
      default: null,
    },
    transactionId: {
      type: String,
      default: null,
    },
    hideTransactionId: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    transactionIdLabel() {
      return !this.hideTransactionId ? 'TID' : '';
    },
    transactionIdValue() {
      return !this.hideTransactionId ? this.transactionId : '';
    },
    formattedTimestamp() {
      const timestamp = parseISO(this.timestamp);
      const days = differenceInDays(new Date(), timestamp);
      const formattedDate = fullDate(timestamp);

      return {
        date: formattedDate,
        hasException: days > 30,
        exceptionTitle: days > 30 ? 'Item Exception' : '',
        exceptionMessage: days > 30 ? 'Item has been in pending pick for more than 30 days' : '',
      };
    },
  },
};
</script>

<style
  scoped
  lang="scss"
>

</style>
