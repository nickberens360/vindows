<template>
  <ExampleComponent
    name="AdvancedSearch"
    description="The Advanced Search component is used for searching for all of the things. Currently must be logged in to perform a search. Example values: kiosk number - 'K10442' or 'X00038', transaction ID - 'BH5HYYWV54' or '10442221130203155', name - 'MICHAEL S STAMPS', email - 'michael.stamps@hillmangroup.com', credit card last 4 - '3513'."
    file-path="@/components/compound/Search/AdvancedSearch.vue"
  >
    <AdvancedSearch />
    <div
      v-if="ordersStore.orderSearchResults.length"
      class="d-block"
    >
      <v-btn
        class="pa-0 bg-teal-lighten-5"
        variant="text"
        @click.stop="showSearchResults = !showSearchResults"
      >
        Show Search Results
        <v-icon
          v-if="!showSearchResults"
          class="ml-1"
          icon="fas fa-chevron-down"
        />
        <v-icon
          v-else
          class="ml-1"
          icon="fas fa-chevron-up"
        />
      </v-btn>
    </div>
    <v-expand-transition>
      <div v-if="showSearchResults">
        <pre class="mb-4">
          {{ ordersStore.orderSearchResults }}
        </pre>
      </div>
    </v-expand-transition>
  </ExampleComponent>
</template>

<script>
import ExampleComponent from '@/components/compound/ExampleComponent';
import AdvancedSearch from '@/components/compound/Search/AdvancedSearch';
import { useOrdersStore } from '@/store/orders';
import { mapStores } from 'pinia';
export default {
  name: 'ExAdvancedSearch',
  components: {
    AdvancedSearch,
    ExampleComponent,
  },
  data() {
    return {
      showSearchResults: false,
    };
  },
  computed: {
    ...mapStores(useOrdersStore),
  },
};
</script>

<style scoped></style>
