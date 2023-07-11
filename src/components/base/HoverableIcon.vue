<template>
  <div class="d-inline">
    <slot name="icon">
      <v-icon
        color="primary-darken-2"
        icon="fas fa-circle-info"
        size="20"
      />
    </slot>
    <v-tooltip
      activator="parent"
      :location="location"
      :origin="origin"
    >
      <slot name="card">
        <v-card class="icon-hover-card elevation-4">
          <v-card-title
            :class="`text-subtitle-2 text-${cardTitleColor} font-weight-bold`"
          >
            <slot name="card-title-icon">
              <v-icon
                class="mr-1"
                :color="cardTitleColor"
                icon="fas fa-circle-exclamation"
                size="16"
              />
            </slot>
            <slot
              name="card-title"
              class="text-subtitle-2"
            />
          </v-card-title>
          <v-card-text
            v-if="$slots['card-content']"
            class="text-subtitle-2 text-blue-grey-darken-2 font-weight-medium"
          >
            <slot name="card-content" />
          </v-card-text>
        </v-card>
      </slot>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: 'HoverableIcon',
  props: {
    cardTitleColor: {
      type: String,
      default: 'primary-lighten-1',
    },
    location: {
      type: String,
      default: 'top end',
    },
    origin: {
      type: String,
      default: 'auto',
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.v-overlay__content) {
  background: white !important;
  padding: 0 !important;
}
:deep(.v-icon) {
  cursor: pointer !important;
}
.icon-hover-card {
  max-width: 250px;

  :deep(.v-card-title .v-icon) {
    margin-top: -4px;
  }
}
</style>
