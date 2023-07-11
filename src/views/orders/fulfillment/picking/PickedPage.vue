<template>
  <div>
    <InfoField
      label="Pick List Date"
      content-size="lg"
      class="mb-4"
    >
      <template #details>
        WED 7/20/2022  5:45 PM
      </template>
    </InfoField>
    <KeyItemRow
      v-if="fulfillmentStore.pickedList.length > 0"
      :items="fulfillmentStore.pickedList"
      hide-date
      hide-select-all
      hide-checkbox
      center-content-width="300px"
      class="w-100"
    >
      <template #right>
        <v-icon
          color="primary-lighten-4"
          icon="fas fa-check-circle"
          size="94"
        />
      </template>
    </KeyItemRow>
    <AppDrawer
      is-open
      location="right"
      hide-close-btn
      :width="600"
      color="primary-lighten-4"
      floating
      no-padding
    >
      <template #append>
        <ActionBar color="blue-grey" />
      </template>
    </AppDrawer>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useFulfillmentStore } from '@/store/fulfillment';
import KeyItemRow from '@/components/orders/fulfillment/KeyItemRow';
import AppDrawer from '@/components/app/AppDrawer.vue';
import ActionBar from '@/components/base/ActionBar.vue';
import InfoField from '@/components/base/InfoField.vue';
export default {
  name: 'PickedPage',
  components: { InfoField, ActionBar, AppDrawer, KeyItemRow },
  computed: {
    ...mapStores(useFulfillmentStore),
  },
};
</script>

<style scoped>

</style>
