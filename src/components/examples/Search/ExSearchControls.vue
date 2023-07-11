<template>
  <ExampleComponent
    name="SearchControls"
    description="This component is used to perform actions on search results. It takes in props: [loading, numberOfResults, resultLimit, searchDisabled] and emits events: [clearSearch, setLimit]."
    file-path="@/components/compound/Search/SearchControls.vue"
  >
    <SearchControls
      :loading="loading"
      :number-of-results="numberOfResults"
      :result-limit="resultLimit"
      :search-disabled="searchDisabled"
      @clear-search="clearSearch"
      @set-limit="setLimit"
    />
    <template #actions>
      <v-row>
        <v-col cols="2">
          <v-select
            v-model="resultsSelection"
            :items="results"
            item-title="text"
            item-value="value"
            label="numberOfResults"
            variant="solo"
            @update:model-value="updateResults"
          />
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="loading"
            :items="loadingList"
            item-title="text"
            item-value="value"
            label="loading"
            variant="solo"
          />
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="searchDisabled"
            :items="searchAbility"
            item-title="text"
            item-value="value"
            label="searchDisabled"
            variant="solo"
          />
        </v-col>
        <v-col v-if="showCleared">
          Search Inputs were cleared
        </v-col>
        <v-col v-if="searchSubmitted">
          <p>Search performed: {{ numberOfResults }} results</p>
          <p>Search limited to: {{ resultLimit }} results</p>
        </v-col>
      </v-row>
    </template>
  </ExampleComponent>
</template>

<script>
import ExampleComponent from '@/components/compound/ExampleComponent';
import SearchControls from '@/components/compound/Search/SearchControls';
export default {
  name: 'ExSearchControls',
  components: {
    SearchControls,
    ExampleComponent,
  },
  data() {
    return {
      loading: false,
      numberOfResults: 100,
      resultLimit: 200,
      searchDisabled: false,
      resultsSelection: 100,
      showCleared: false,
      searchSubmitted: false,
      loadingList: [
        {
          text: 'False',
          value: false,
        },
        {
          text: 'True',
          value: true,
        },
      ],
      searchAbility: [
        {
          text: 'False',
          value: false,
        },
        {
          text: 'True',
          value: true,
        },
      ],
      results: [
        {
          text: '42',
          value: 42,
        },
        {
          text: '100',
          value: 100,
        },
        {
          text: '117',
          value: 117,
        },
        {
          text: '301',
          value: 301,
        },
      ],
    };
  },
  methods: {
    clearSearch() {
      this.showCleared = true;
      this.resultLimit = 200;
      this.searchSubmitted = false;
    },
    setLimit(limit) {
      this.showCleared = false;
      this.resultLimit = limit;
      if (this.resultsSelection > limit) {
        this.numberOfResults = limit;
      } else this.numberOfResults = this.resultsSelection;
      this.searchSubmitted = true;
    },
    updateResults(selection) {
      if (selection > this.resultLimit) {
        this.numberOfResults = this.resultLimit;
      } else this.numberOfResults = selection;
    },
  },
};
</script>

<style scoped></style>
