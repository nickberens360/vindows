<template>
  <v-toolbar
    height="50"
    :color="exception ? 'red-lighten-5' : 'primary-lighten-5'"
    class="item-status-row mb-1 text-primary-darken-4"
    :class="{
      'item-status-row--exception': exception,
    }"
  >
    <template #prepend>
      <div class="ml-3">
        <v-avatar
          v-if="count"
          size="20"
          class="mr-2 text-caption elevation-3"
          color="primary"
        >
          {{ count }}
        </v-avatar>
        <span class="text-body-4">{{ text }}</span>
      </div>
    </template>
    <template #append>
      <v-icon
        v-if="exception"
        class="mr-3"
        color="error"
        icon="far fa-xmark"
        size="28"
      />
      <v-icon
        v-else
        class="icon-duotone-success-reversed mr-3"
        icon="fad fa-circle-check"
        size="28"
      />
    </template>
    <template
      v-if="exception"
      #extension
    >
      <v-toolbar
        height="50"
        color="#e86f66"
        class="item-status-row__extension pl-1 w-100"
      >
        <template #prepend>
          <v-icon
            icon="fad fa-circle-exclamation"
            size="35"
            class="icon-duotone-circle-exclamation mr-2"
          />
          <span class="text-body-3 text-white">{{ exceptionText }}</span>
        </template>
      </v-toolbar>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  name: 'ItemStatusRow',
  props: {
    exception: {
      type: Boolean,
      default: false,
    },
    exceptionText: {
      type: String,
      default: 'Wrong SKU',
    },
    count: {
      type: [Number, String],
      default: null,
    },
    text: {
      type: [Number, String],
      default: '',
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/scss/injectable/transitions.scss";
.item-status-row--exception {
  border: 1px solid rgb(var(--v-theme-error));
}
</style>
