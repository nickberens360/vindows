<template>
  <v-toolbar
    color="primary"
    class="pa-0"
    extension-height="auto"
  >
    <v-row
      align="center"
      class="px-6"
    >
      <v-col>
        <slot name="title">
          <TransactionId>
            <template #default="{ transactionId, label }">
              <span class="text-h4 mr-3 text-primary-lighten-3">{{ label }}:</span>
              <span class="text-body-3 font-weight-bold">{{ transactionId }}</span>
            </template>
          </TransactionId>
        </slot>
      </v-col>
      <v-col v-if="showContent">
        <slot name="content">
          <OrderStage show-label />
        </slot>
      </v-col>
      <v-spacer />
      <v-spacer />
      <v-col
        v-if="showActions"
        class="flex-grow-0 fill-flex-height white-text text-right"
      >
        <slot name="actions">
          <v-btn
            icon="fal fa-close"
            :to="{ name: props.closeBtnRouteName }"
          />
        </slot>
      </v-col>
    </v-row>
    <template #extension>
      <slot name="extension" />
    </template>
  </v-toolbar>
</template>

<script setup>

import OrderStage from '@/components/orders/management/common/OrderStage';
import TransactionId from '@/components/orders/management/common/TransactionId';

const props = defineProps({
  showContent: {
    type: Boolean,
    default: true
  },
  showActions: {
    type: Boolean,
    default: true
  },
  closeBtnRouteName: {
    type: String,
    default: 'ordersManagement'
  },
});



</script>

<style lang="scss" scoped>
.v-toolbar {
  overflow: visible;
}
</style>
