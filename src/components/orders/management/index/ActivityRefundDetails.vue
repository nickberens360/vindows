<template>
  <div class="activity-refund-details d-flex">
    <div class="pr-8 activity-refund-details__column">
      <InfoField
        label="Total Refund"
      >
        <template #details>
          <span class="text-body-2">${{ amount }}</span>
        </template>
      </InfoField>
    </div>

    <div class="pl-8 activity-refund-details__column">
      <InfoField
        label="Item(s)"
      >
        <template #details>
          <div class="activity-refund-details__items">
            <div
              v-for="itemRefund in items"
              :key="itemRefund.itemId"
            >
              <v-badge
                color="primary"
                :content="itemRefund.quantity || '1'"
                inline
                class="d-block"
              >
                <span class="text-body-2 order-2 pl-2"> ${{ itemRefund.amount }}</span>
              </v-badge>
            </div>
          </div>
        </template>
      </InfoField>
    </div>
  </div>
</template>
<script setup>
import {inject} from 'vue';
import InfoField from '@/components/base/InfoField';
import { useOrderActivity } from '@/composables/orders/OrderActivity';

const item = inject('activityItem');
const {
  items,
  amount,
} = useOrderActivity(item);

</script>


<style scoped lang="scss">

.activity-refund-details__column {
  &:first-child {
    border-right: 1px solid rgb(var(--v-theme-blue-grey-lighten-2));
  }
}

.activity-refund-details__items {
  height: 65px;
  column-count: 2;
}

:deep(.v-badge__badge) {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  display: flex;
}

</style>
