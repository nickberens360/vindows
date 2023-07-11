<template>
  <ExampleComponent
    name="HoverableIcon"
    file-path="@/components/base/HoverableIcon.vue"
  >
    <div
      :class="`d-flex align-center justify-${position} py-5 px-2 bg-grey-lighten-4`"
    >
      <HoverableIcon
        :card-title-color="cardTitleColor"
        :location="location"
        :origin="origin"
      >
        <template #icon>
          <v-icon
            class="ml-4"
            :color="cardTitleColor"
            :icon="`fas fa-${icon}`"
            size="20"
          />
        </template>
        <template #card>
          <RefundDetailsCard
            v-if="variant === 'refunded'"
            :amount="888.78"
            notes="Customer disliked color"
            reason="Other"
            timestamp="1999-04-01"
            username="bhern"
          />
        </template>
        <template #card-title-icon>
          <v-icon
            class="mr-1"
            :color="cardTitleColor"
            :icon="`fas fa-${cardTitleIcon}`"
            size="16"
          />
        </template>
        <template #card-title>
          {{ cardTitle }}
        </template>
        <template #card-content>
          <span v-if="variant === 'discounts'">
            <div
              v-for="discount in cardContent"
              :key="discount"
            >
              <div>{{ discount }}</div>
            </div>
          </span>
          <span v-else>{{ cardContent }}</span>
        </template>
      </HoverableIcon>
    </div>
    <div class="d-flex mt-1 w-50">
      <span style="width: 300px">
        <ExDocsSelect
          v-model="position"
          :items="positions"
          label="Icon Positioning Example"
        />
      </span>
      <v-spacer />
      <span style="width: 300px">
        <ExDocsSelect
          v-model="variant"
          :items="variants"
          label="Examples"
        />
      </span>
    </div>
    <ExDocsToggle title="Props">
      <template #content>
        <v-data-table
          :headers="propsHeaders"
          :items="propItems"
          hide-default-footer
          class="elevation-2 mt-4"
        >
          <template #[`item.controls`]="{ item }">
            <ExDocsSelect
              v-if="item.raw.name === 'cardTitleColor'"
              v-model="cardTitleColor"
              :items="cardTitleColors"
              label="Colors"
            />
            <ExDocsSelect
              v-if="item.raw.name === 'location'"
              v-model="location"
              :items="locations"
              label="Location"
            />
            <ExDocsSelect
              v-if="item.raw.name === 'origin'"
              v-model="origin"
              :items="origins"
              label="Origin"
            />
          </template>
          <template #[`item.description`]="{ item }">
            {{ item.raw.description }}
            <a
              v-if="item.raw.name === 'origin' || item.raw.name === 'location'"
              href="https://vuetifyjs.com/en/components/overlays/#connected"
              target="_blank"
              rel="noopener noreferrer"
            >
              More info
            </a>
          </template>
          <template #bottom />
        </v-data-table>
      </template>
    </ExDocsToggle>
    <ExDocsToggle title="Slots">
      <template #content>
        <v-data-table
          :headers="slotsHeaders"
          :items="slotItems"
          hide-default-footer
          class="elevation-2 mt-4"
        >
          <template #bottom />
        </v-data-table>
      </template>
    </ExDocsToggle>
  </ExampleComponent>
</template>

<script>
import { computed } from 'vue';
import ExampleComponent from '@/components/compound/ExampleComponent';
import ExDocsSelect from '@/components/examples/ExDocs/ExDocsSelect';
import ExDocsToggle from '@/components/examples/ExDocs/ExDocsToggle';
import HoverableIcon from '@/components/base/HoverableIcon';
import RefundDetailsCard from '@/components/orders/management/details/RefundDetailsCard';

export default {
  name: 'ExHoverableIcon',
  components: {
    ExampleComponent,
    ExDocsSelect,
    ExDocsToggle,
    HoverableIcon,
    RefundDetailsCard,
  },
  provide() {
    return {
      order: computed(() => this.mockOrder),
    };
  },
  data: () => ({
    variant: 'discounts',
    position: 'center',
    cardTitleColor: 'orange',
    location: 'top center',
    origin: 'auto',
    icon: 'eye',
    cardTitle: 'Discount Codes',
    cardTitleIcon: 'circle-exclamation',
    cardContent: ['discountcode', 'free99'],
    propsHeaders: [
      {
        title: 'Name',
        key: 'name',
        sortable: false,
      },
      {
        title: 'Type',
        key: 'type',
        sortable: false,
      },
      {
        title: 'Default',
        key: 'default',
        sortable: false,
      },
      {
        title: 'Required',
        key: 'required',
        sortable: false,
      },
      {
        title: 'Description',
        key: 'description',
        sortable: false,
      },
      {
        title: 'Controls',
        key: 'controls',
        sortable: false,
      },
    ],
    propItems: [
      {
        name: 'cardTitleColor',
        type: 'String',
        default: 'primary-lighten-1',
        required: 'false',
        description: 'Color for card title and icon',
      },
      {
        name: 'location',
        type: 'String',
        default: 'top end',
        required: 'false',
        description: 'String value of location',
      },
      {
        name: 'origin',
        type: 'String',
        default: 'auto',
        required: 'false',
        description: 'String value of origin',
      },
    ],
    slotsHeaders: [
      {
        title: 'Name',
        key: 'name',
        sortable: false,
      },
      {
        title: 'Description',
        key: 'description',
        sortable: false,
      },
      {
        title: 'Default',
        key: 'default',
        sortable: false,
      },
    ],
    slotItems: [
      {
        name: '#icon',
        description: 'Icon shown, when hovered over, reveals an info card.',
        default: 'true',
      },
      {
        name: '#card',
        description: 'Allows for complete customization of card',
        default: 'true',
      },
      {
        name: '#card-title-icon',
        description: 'Icon shown next to the card title.',
        default: 'true',
      },
      {
        name: '#card-title',
        description: 'Text to show for the card title',
        default: 'false',
      },
      {
        name: '#card-content',
        description: 'The rest of the content of the card',
        default: 'false',
      },
    ],
    mockOrder: {
      payment: {
        type: 'card',
        card: {
          cardHolder: 'Nick Berens',
          pan: '476173*0119',
          expirationDate: '2022-12-31',
          issuer: 'Visa',
          processor: 'Stub',
        },
      },
    },
    variants: [
      { label: 'discounts', value: 'discounts' },
      { label: 'non refundable', value: 'nonRefundable' },
      { label: 'refunded', value: 'refunded' },
    ],
    positions: [
      {
        label: 'center',
        value: 'center',
      },
      {
        label: 'start',
        value: 'start',
      },
      {
        label: 'end',
        value: 'end',
      },
    ],
    cardTitleColors: [
      {
        label: 'Grey',
        value: 'primary-lighten-1',
      },
      {
        label: 'Red',
        value: 'red',
      },
      {
        label: 'Green',
        value: 'green',
      },
      {
        label: 'Orange',
        value: 'orange',
      },
    ],
    locations: [
      { label: 'top center', value: 'top center' },
      { label: 'top start', value: 'top start' },
      { label: 'top end', value: 'top end' },
      { label: 'bottom start', value: 'bottom start' },
      { label: 'bottom end', value: 'bottom end' },
      { label: 'start center', value: 'start center' },
    ],
    origins: [
      { label: 'auto', value: 'auto' },
      { label: 'top start', value: 'top start' },
      { label: 'bottom start', value: 'bottom start' },
      { label: 'top end', value: 'top end' },
    ],
  }),
  watch: {
    variant() {
      if (this.variant === 'discounts') {
        this.icon = 'eye';
        this.cardTitle = 'Discount Codes';
        this.cardTitleIcon = 'circle-exclamation';
        this.cardContent = ['discountcode', 'free99'];
        this.cardTitleColor = 'orange';
      }
      if (this.variant === 'refunded') {
        this.icon = 'circle-exclamation';
        this.cardTitleColor = 'primary-lighten-1';
      }
      if (this.variant === 'nonRefundable') {
        this.icon = 'gavel';
        this.cardTitle = 'Not Refundable';
        this.cardTitleIcon = 'circle-exclamation';
        this.cardContent = 'This transaction type cannot be refunded';
        this.cardTitleColor = 'red';
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
