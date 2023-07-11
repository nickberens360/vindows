<template>
  <div class="order-details-contact-info">
    <InfoField label="Contact Info">
      <template #details>
        <div class="d-flex align-center">
          <VIcon
            size="16"
            icon="fal fa-circle-phone"
            class="mr-1 text-primary"
          />
          <span>{{ phoneNumber || noPhoneMessage }}</span>
        </div>
        <div class="d-flex align-center">
          <VIcon
            size="16"
            icon="fal fa-at"
            class="mr-1 text-primary"
          />
          <a
            v-if="emailAddress"
            :href="`mailto:${emailAddress}`"
          >{{ emailAddress }}</a>
          <span v-else>{{ noEmailMessage }}</span>
        </div>
      </template>
    </InfoField>
  </div>
</template>
<script setup>
import { inject } from 'vue';
import { useContactInfo } from '@/composables/orders/ContactInfo';
const order = inject('order');
import InfoField from '@/components/base/InfoField.vue';

const {
  phoneNumber,
  emailAddress
} = useContactInfo(order);
const noPhoneMessage = 'Phone data unavailable';
const noEmailMessage = 'Email data unavailable';
</script>
