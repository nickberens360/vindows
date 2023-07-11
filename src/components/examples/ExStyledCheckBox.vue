<template>
  <ExampleComponent
    name="StyledCheckBox"
    description="Uses the css class .meru-styled-checkbox and fas fa-check for the true-icon prop."
    file-path="@/scss/_utilities.scss"
  >
    <v-checkbox
      v-model="value"
      label="Check Me"
      true-icon="fas fa-check"
      :ripple="false"
      class="meru-styled-checkbox"
      hide-details
    />
    <strong class="mb-4 d-inline-block mr-4">Value: </strong>{{ value }}
  </ExampleComponent>
</template>

<script>
import ExampleComponent from '@/components/compound/ExampleComponent';
export default {
  name: 'ExStyledCheckBox',
  components: {
    ExampleComponent,
  },
  data() {
    return {
      value: false,
    };
  },
};
</script>
