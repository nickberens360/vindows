<template>
  <ExampleComponent
    name="ProductImage"
    description="This component is used to display the image of a product and it's SKU. The order should be injected via the Vue 3 provide / inject pattern. Via Props, this component has the option to resize the image width and the option to display or remove the sku label of the product image."
    file-path="@/components/base/ProductImage.vue"
  >
    <ProductImage
      :show-image-label="showImageLabel"
      :img-width="imgWidth"
      class="text-primary-darken-1 bg-blue-grey-lighten-5 pa-8"
    />
    <template #actions>
      <v-row style="max-width: 600px">
        <v-col cols="4">
          <v-select
            v-model="imgWidth"
            :items="imgWidthItems"
            item-title="text"
            item-value="value"
            label="imgWidth"
            variant="solo"
            width="100px"
          />
        </v-col>
        <v-col cols="4">
          <v-checkbox
            v-model="showImageLabel"
            label="Show Sku Label"
          />
        </v-col>
      </v-row>
    </template>
  </ExampleComponent>
</template>

<script>
import { computed } from 'vue';
import ExampleComponent from '@/components/compound/ExampleComponent';
import ProductImage from '@/components/base/ProductImage';
import { mockOrderDetails } from '@/services/mockDataService';

export default {
  name: 'ExProductImage',
  components: {
    ExampleComponent,
    ProductImage,
  },
  provide() {
    return {
      orderItem: computed(() => mockOrderDetails.items[0]),
    };
  },
  data: () => ({
    showImageLabel: true,
    imgWidth: '65',
    imgWidthItems: [
      {
        text: '50px',
        value: '50px',
      },
      {
        text: '100px',
        value: '100px',
      },
    ],
  }),
};
</script>

<style lang="scss" scoped></style>
