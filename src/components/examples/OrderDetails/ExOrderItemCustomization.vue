<template>
  <ExampleComponent
    name="OrderItemCustomization"
    description="This component is used to display the customizations chosen for a given product. The orderItem should be injected via the Vue 3 provide / inject pattern. Nothing is displayed for products that cannot be customized such as keys."
    file-path="@/components/compound/OrderDetails/OrderItemCustomization.vue"
  >
    <OrderItemCustomization />

    <template #actions>
      <VRow class="mb-4">
        <VCol
          sm="4"
          md="3"
        >
          <VBtn @click="cycleExample()">
            Cycle Example
          </VBtn>
        </VCol>
        <VCol>
          Current SKU: {{ selectedItem?.sku }}
        </VCol>
      </VRow>
    </template>
  </ExampleComponent>
</template>
<script>
import { computed } from 'vue';
import ExampleComponent from '@/components/compound/ExampleComponent';
import OrderItemCustomization from '@/components/compound/orders/OrderItemCustomization';

export default {
  name: 'ExOrderItemCustomization',
  components: {
    OrderItemCustomization,
    ExampleComponent,
  },
  provide() {
    return {
      orderItem: computed(() => this.selectedItem)
    };
  },
  data: () => ({
    selectedItem: null,
    items: [
      {
        'itemId': 5,
        'sku': 'BAN-OS-BLK',
        'type': 'BA',
        'description': 'Personalized Pet Bandana, Black Check',
        'customization': {
          'frontSideText': 'Custom Text',
          'frontTextOrientation': 'Landscape',
          'textColor': 'White'
        },
        'listPrice': 6,
        'price': 6,
        'subTotal': 6,
        'discountTotal': 0,
        'netTotal': 6,
        'tax': 0.525,
        'total': 6.525,
        'discounts': [],
        'quantity': 7,
        'refunds': []
      }, {
        'itemId': 3,
        'sku': 'BNK-SM-BLK',
        'type': 'BK',
        'description': 'Personalized Pet Blanket SM Black',
        'customization': {
          'frontSideText': 'Different Text',
          'frontTextOrientation': 'Landscape',
          'textColor': 'Navy'
        },
        'listPrice': 15,
        'price': 15,
        'subTotal': 15,
        'discountTotal': 0,
        'netTotal': 15,
        'tax': 1.3125,
        'total': 16.3125,
        'discounts': [],
        'quantity': 7,
        'refunds': []
      }, {
        customization: {},
        description: 'Brass',
        discountTotal: 0,
        discounts: [],
        itemId: 1,
        listPrice: 4,
        netTotal: 3.7037036,
        price: 4,
        quantity: 1,
        refunds: [],
        sku: 'KKWJMB00001BRAS',
        subTotal: 3.7037036,
        tax: 0.2962963,
        total: 4,
        type: 'KE'
      }, {
        customization: {
          font: 'DejaVu Sans',
          frontSideText: 'Customized Front Text',
          frontTextOrientation: 'Landscape',
        },
        description: 'Large Red Anodized Heart',
        discountTotal: 0,
        discounts: [],
        itemId: 1,
        listPrice: 2,
        netTotal: 2,
        price: 2,
        quantity: 2,
        refunds: [],
        sku: '7322-04',
        subTotal: 2,
        tax: 0.22,
        total: 2.22,
        type: 'TG',
      }, {
        customization: {
          backSideText: 'Mica\n(240)\n595-2616',
          backTextOrientation: 'Landscape',
          font: 'DejaVu Sans',
        },
        description: 'Small Black Inset Paw Epoxy Circle',
        discountTotal: 0,
        discounts: [],
        itemId: 1,
        listPrice: 11,
        netTotal: 11,
        price: 11,
        quantity: 1,
        refunds: [],
        sku: '7724-31',
        subTotal: 11,
        tax: 0.9625,
        total: 11.9625,
        type: 'TG',
      }
    ],
  }),
  mounted() {
    this.cycleExample();
  },
  methods: {
    cycleExample() {
      const currentItemIndex = this.items.indexOf(this.selectedItem);
      let newItemIndex = 0;
      if (currentItemIndex < this.items.length - 1) {
        newItemIndex = currentItemIndex + 1;
      }
      this.selectedItem = this.items[newItemIndex];
    },
  }
};
</script>
<style lang="scss" scoped>
</style>
