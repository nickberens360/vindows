<template>
  <div>
    <p
      v-if="pageCategory"
      class="mb-0 text-uppercase text-caption-2"
    >
      {{ pageCategory }}
    </p>
    <h1
      class="text-body-3  line-height-1"
    >
      {{ pageTitle }}
    </h1>
  </div>
</template>
<script>

export default {
  name: 'AppTitleGroup',
  props: {
    pageCategory: {
      type: String,
      required: false,
      default: '',
    },
    pageTitle: {
      type: String,
      required: false,
      default: 'Meru',
    },
  },
};
</script>
