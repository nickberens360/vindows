<template>
  <v-form class="kiosk-search d-flex align-center">
    <v-text-field
      variant="solo"
      density="compact"
      bg-color="primary-lighten-5"
      label="Kiosk # or ABN"
      hide-details
      class="kiosk-search__field"
    />
    <v-btn
      variant="flat"
      icon="fas fa-search"
      color="primary-darken-2"
      height="42px"
      class="kiosk-search__btn"
    />
  </v-form>
</template>

<script>
export default {
  name: 'AppSearch'
};
</script>

<style lang="scss" scoped>
:deep(.v-input--horizontal .v-input__prepend) {
  margin-inline-end: 0;
}
:deep(.v-field--variant-solo) {
  box-shadow: none;
}
:deep(.v-field) {
  border-radius: 4px 0 0 4px;
  width: 170px;
}

.kiosk-search__btn {
  border-radius: 0 4px 4px 0
}
</style>
