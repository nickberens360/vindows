<template>
  <div class="detail-label-value text-primary-darken-1 align-center">
    <slot name="primary-label-value-group">
      <dl>
        <dt
          v-if="primaryLabel"
          class="mb-1 font-weight-light d-flex align-center"
        >
          {{ primaryLabel }}
          <div
            v-if="$slots['primary-label-append']"
            class="ml-2 d-flex align-center"
          >
            <slot name="primary-label-append" />
          </div>
        </dt>
        <dd
          v-if="primaryValue"
          class="text-h2 font-weight-light line-height-1 mb-1 position-relative"
          :class="{
            'font-weight-bold': variant === 'bold',
            'text-body-3': variant === 'small',
            'd-flex align-center': $slots['primary-value-append'],
          }"
        >
          <slot name="primary-value">
            {{ primaryValue }}
          </slot>
          <div
            v-if="$slots['primary-value-append']"
            class="ml-2 d-flex align-center"
          >
            <slot name="primary-value-append" />
          </div>
        </dd>
      </dl>
    </slot>
    <slot name="secondary-label-value-group">
      <dl
        v-if="secondaryValue && secondaryLabel"
        class="d-flex"
      >
        <dt
          class="font-weight-light mr-1"
        >
          {{ secondaryLabel }}:
        </dt>
        <dd class="font-weight-bold">
          {{ secondaryValue }}
        </dd>
      </dl>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'DetailLabelValue',
  props: {
    primaryLabel: {
      type: String,
      default: null,
    },
    primaryValue: {
      type: [String, Number],
      default: null,
    },
    secondaryLabel: {
      type: String,
      default: null,
    },
    secondaryValue: {
      type: String,
      default: null,
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['bold', 'small', 'default'].includes(value),
    },
    stackAppend: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>

</style>
