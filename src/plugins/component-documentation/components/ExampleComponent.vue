<template>
  <div class="example-component position-relative">
    <slot name="default" />

    <div
      v-if="$slots.actions"
      class="mt-6"
    >
      <slot name="actions" />
    </div>

    <div
      v-if="description || $slots.description"
      class="mt-6"
    >
      <VExpansionPanels>
        <VExpansionPanel title="Description">
          <template #text>
            <slot name="description">
              <p>
                {{ description }}
              </p>
            </slot>
          </template>
        </VExpansionPanel>
      </VExpansionPanels>
    </div>

    <div
      v-if="$slots.props"
      class="mt-6"
    >
      <VExpansionPanels class="remove-panel-padding">
        <VExpansionPanel title="Props">
          <template #text>
            <slot name="props" />
          </template>
        </VExpansionPanel>
      </VExpansionPanels>
    </div>

    <div
      v-if="$slots.slots"
      class="mt-6"
    >
      <VExpansionPanels class="remove-panel-padding">
        <VExpansionPanel
          title="Slots"
        >
          <template #text>
            <slot name="slots" />
          </template>
        </VExpansionPanel>
      </VExpansionPanels>
    </div>

    <div
      v-if="$slots.events"
      class="mt-6"
    >
      <VExpansionPanels class="remove-panel-padding">
        <VExpansionPanel
          title="Events"
        >
          <template #text>
            <slot name="events" />
          </template>
        </VExpansionPanel>
      </VExpansionPanels>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    description: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
.example-component {
  padding-bottom: 16px;
}
:deep(.remove-panel-padding .v-expansion-panel-text__wrapper) {
  padding: 0;
}
</style>
