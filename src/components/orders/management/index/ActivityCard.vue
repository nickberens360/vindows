<template>
  <v-card class="activity-card">
    <v-card-title class="activity-card__title d-flex justify-space-between align-center text-white px-6">
      <span class="text-h4">{{ type }} - {{ activityDate }}</span>
      <div>
        <HoverableIcon
          location="left"
          origin="bottom right"
        >
          <template #icon>
            <v-icon
              class="activity-card__icon"
              color="white"
              icon="fad fa-circle-exclamation"
            />
          </template>
          <template #card>
            <v-card elevation="5">
              <v-card-text class="pt-2">
                <div v-if="identifier">
                  <InfoField
                    label="Identifier"
                    content-size="sm"
                  >
                    <template #details>
                      {{ identifier }}
                    </template>
                  </InfoField>
                </div>
                <div v-if="username">
                  <InfoField
                    label="Username"
                    content-size="sm"
                  >
                    <template #details>
                      {{ identifier }}
                    </template>
                  </InfoField>
                </div>
              </v-card-text>
            </v-card>
          </template>
        </HoverableIcon>
      </div>
    </v-card-title>

    <v-card-text class="pa-6">
      <ActivityRefundDetails v-if="items.length" />
      <InfoField
        v-if="amount && !items.length"
        label="Amount"
        class="d-block"
      >
        <template #details>
          <span class="text-body-2">${{ amount }}</span>
        </template>
      </InfoField>
      <InfoField
        v-if="email"
        label="Email"
        class="mt-4"
      >
        <template #details>
          <span class="text-body-2">{{ email }}</span>
        </template>
      </InfoField>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {computed, defineProps, provide} from 'vue';
import InfoField from '@/components/base/InfoField';
import ActivityRefundDetails from '@/components/orders/management/index/ActivityRefundDetails';
import { useOrderActivity } from '@/composables/orders/OrderActivity';
import HoverableIcon from '@/components/base/HoverableIcon';

const props = defineProps({
  item: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

provide('activityItem', computed(() => props.item));

const activityItems = computed(() => {
  return props.item || [];
});

const {
  items,
  type,
  username,
  email,
  identifier,
  amount,
  timestamp,
  weekDay,
  statusColor,
} = useOrderActivity(activityItems);

const activityStatusColor = computed(() => {
  return statusColor.value || '';
});

const activityDate = computed(() => {
  return weekDay.value.toUpperCase() + ' ' + timestamp.value || '';
});

</script>

<style scoped lang="scss">

.activity-card {
  overflow: unset;
  position: relative;
  top: -11px;
  width: 100%;
}
:deep(.v-timeline-item__body){
  width: 100%;
}

.activity-card__title {
  position: relative;
  overflow: unset;
  height: 64px;
  background-color: v-bind("activityStatusColor");
  &:before {
    content: '';
    position: absolute;
    left: -15px;
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-right: 15px solid v-bind("activityStatusColor");
  }
  &:after {
    content: '';
    position: absolute;
    left: -45px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    outline: 3px solid white;
    background-color: v-bind("activityStatusColor");
  }
}

.activity-card__icon {
  --fa-primary-color: white;
  --fa-secondary-color: rgb(var(--v-theme-primary)); --fa-secondary-opacity: 1
}
</style>
