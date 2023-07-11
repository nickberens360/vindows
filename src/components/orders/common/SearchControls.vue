<template>
  <v-row class="bg-blue-grey-lighten-4 px-3">
    <v-col>
      <v-menu
        v-model="resultLimitMenu"
        bottom
        :close-on-content-click="false"
        origin="top left"
        right
        transition="scale-transition"
      >
        <template #activator="{ props }">
          <v-chip
            class="darken-1 py-6 px-1"
            color="lavender"
            size="large"
            variant="elevated"
            v-bind="props"
          >
            <v-avatar
              class="mr-1"
              color="white"
              size="40"
              variant="tonal"
            >
              <span class="text-white">
                {{ numberOfResults }}
              </span>
            </v-avatar>
            <span class="text-grey-lighten-1">/ {{ resultLimit }} max</span>
            <v-icon
              class="ml-2"
              color="grey-lighten-1"
              icon="fas fa-caret-down"
            />
          </v-chip>
        </template>

        <v-card width="400">
          <v-card-text class="pt-8">
            <v-slider
              v-model="limit"
              label="Max Results"
              max="500"
              min="0"
              step="25"
              thumb-color="blue-grey-lighten-2"
              thumb-label="always"
              track-color="blue-grey-lighten-4"
              track-fill-color="blue-grey-darken-1"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="blue-grey-darken-1"
              @click="resultLimitMenu = false"
            >
              CANCEL
            </v-btn>
            <v-spacer />
            <v-btn
              class="px-4"
              color="blue-grey"
              variant="elevated"
              @click="submitLimit"
            >
              SET LIMIT
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-col>

    <v-col class="d-flex align-center justify-end">
      <v-btn
        class="mr-2"
        color="primary"
        :disabled="loading"
        variant="outlined"
        @click.prevent="$emit('clearSearch')"
      >
        <v-icon
          icon="fal fa-times"
          size="18"
        />
        Clear All
      </v-btn>
      <v-btn
        color="primary"
        :disabled="loading || searchDisabled"
        variant="elevated"
        @click="submitLimit"
      >
        <span v-if="loading">Loading</span>
        <span v-else>
          <v-icon
            icon="fal fa-search"
            size="18"
          />
          Search
        </span>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SearchControls',
  props: {
    loading: {
      type: Boolean,
      required: true,
      default: false,
    },
    numberOfResults: {
      type: Number,
      required: true,
      default: 0,
    },
    resultLimit: {
      type: Number,
      required: true,
      default: 0,
    },
    searchDisabled: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  emits: ['clearSearch', 'setLimit'],
  data: () => ({
    limit: 0,
    resultLimitMenu: false,
  }),
  mounted() {
    this.limit = this.resultLimit;
  },
  methods: {
    setLimit(limit) {
      this.limit = limit;
    },
    submitLimit() {
      this.resultLimitMenu = false;
      this.$emit('setLimit', this.limit);
    },
  },
};
</script>
<style lang="scss" scoped>
:deep(.v-slider-thumb__label) {
  background: rgb(var(--v-theme-blue-grey-lighten-2));
}
</style>
