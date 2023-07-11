<template>
  <ExampleComponentUsage>
    <DetailLabelValue
      :primary-label="primaryLabel"
      :primary-value="primaryValue"
      :secondary-label="secondaryLabel"
      :secondary-value="secondaryValue"
      :variant="variant"
      :stack-append="stackAppend"
    >
      <template
        v-if="!hidePrepend"
        #prepend
      >
        <img
          alt="Foxy Logo"
          src="../../plugins/component-documentation/images/logo.png"
          class="foxy-logo"
          style="max-width: 100px;"
        >
      </template>
      <template
        v-if="!hidePrimaryValueAppend"
        #primary-value-append
      >
        <HoverableIcon class="d-inline-flex">
          <template #icon>
            <v-icon
              class="icon-duotone-circle-exclamation"
              icon="fad fa-circle-exclamation"
              size="34"
            />
          </template>
        </HoverableIcon>
      </template>
      <template
        v-if="!hideAppend"
        #append
      >
        <img
          style="width: 100px; height: 100px; border-radius: 50%;"
          src="https://avatars.githubusercontent.com/u/39391585?v=4"
          class="rotate-img"
          alt
        >
      </template>
    </DetailLabelValue>

    <template #props>
      <v-data-table
        :headers="
          propHeaders"
        :items="propItems"
        hide-default-footer
        class="mt-4"
      >
        <template #[`item.controls`]="{ item }">
          <v-text-field
            v-if="item.raw.name === 'primaryLabel'"
            v-model="primaryLabel"
            label="label"
            variant="solo"
            hide-details
            class="my-3"
          />
          <v-text-field
            v-if="item.raw.name === 'primaryValue'"
            v-model="primaryValue"
            label="value"
            variant="solo"
            hide-details
            class="my-3"
          />
          <v-text-field
            v-if="item.raw.name === 'secondaryLabel'"
            v-model="secondaryLabel"
            label="label"
            variant="solo"
            hide-details
            class="my-3"
          />
          <v-text-field
            v-if="item.raw.name === 'secondaryValue'"
            v-model="secondaryValue"
            label="value"
            variant="solo"
            hide-details
            class="my-3"
          />
          <ExDocsSelect
            v-if="item.raw.name === 'variant'"
            v-model="variant"
            :items="variantItems"
            label="Size"
          />
          <v-checkbox
            v-if="item.raw.name === 'stackAppend'"
            v-model="stackAppend"
            label="Stack append"
          />
        </template>
        <template #bottom />
      </v-data-table>
    </template>
    <template #slots>
      <v-data-table
        :headers="slotHeaders"
        :items="slotItems"
        hide-default-footer
        class="mt-4"
      >
        <template #[`item.controls`]="{ item }">
          <v-checkbox
            v-if="item.raw.name === '#append'"
            v-model="hideAppend"
            label="Hide append"
          />
          <v-checkbox
            v-if="item.raw.name === '#prepend'"
            v-model="hidePrepend"
            label="Hide prepend"
          />
          <v-checkbox
            v-if="item.raw.name === '#primary-value-append'"
            v-model="hidePrimaryValueAppend"
            label="Hide primary value append"
          />
        </template>
        <template #bottom />
      </v-data-table>
    </template>
  </ExampleComponentUsage>
</template>

<script>
import { propTableHeaders, slotTableHeaders } from '@/component-examples/utils/docsTableHeaders';
import DetailLabelValue from '@/components/base/DetailLabelValue';
import HoverableIcon from '@/components/base/HoverableIcon';

export default {
  components: {HoverableIcon, DetailLabelValue},
  data() {
    return {
      primaryLabel: 'Primary Label',
      primaryValue: 'Primary Value',
      secondaryLabel: 'Secondary Label',
      secondaryValue: 'Secondary Value',
      variant: 'bold',
      stackAppend: false,
      hideAppend: false,
      hidePrepend: false,
      hidePrimaryValueAppend: false,
      variantItems: [
        {label: 'default', value: 'default'},
        {label: 'bold', value: 'bold'},
        {label: 'small', value: 'small'},
      ],
      propHeaders: propTableHeaders,
      propItems: [
        {
          name: 'primaryLabel',
          type: 'String',
          default: '',
          required: 'true',
          description: 'Primary label',
        },
        {
          name: 'primaryValue',
          type: 'String',
          default: '',
          required: 'true',
          description: 'Primary value',
        },
        {
          name: 'secondaryLabel',
          type: 'String',
          default: 'null',
          required: 'false',
          description: 'Secondary label',
        },
        {
          name: 'secondaryValue',
          type: 'String',
          default: 'null',
          required: 'false',
          description: 'Secondary value',
        },
        {
          name: 'variant',
          type: 'String',
          default: 'default',
          required: 'false',
          description: 'Variant of the primary value. Validate "default", "bold", "small"',
        },
        {
          name: 'stackAppend',
          type: 'Boolean',
          default: 'false',
          required: 'false',
          description: 'Stack the append slot and center content',
        },
      ],
      slotHeaders: slotTableHeaders,
      slotItems: [
        {
          name: '#append',
          description: 'Slot for the append content',
          default: 'empty',
        },
        {
          name: '#prepend',
          description: 'Slot for the prepend content',
          default: 'empty',
        },
        {
          name: '#primary-value-append',
          description: 'Slot for the primary value append content',
          default: 'empty',
        }
      ],
    };
  }
};
</script>
<style lang="scss" scoped>
.rotate-img {
  animation: rotate 5s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>
