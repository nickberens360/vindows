<template>
  <div
    class="d-flex flex-column justify-center align-center p-relative success-wrapper success-animation"
  >
    <div class="success-icon-wrapper position-relative">
      <v-scale-transition origin="center center">
        <v-icon
          v-if="showSuccessCheckIcon"
          class="success-check-icon icon-duotone-success-reversed"
          size="44"
        >
          fad fa-check-circle
        </v-icon>
      </v-scale-transition>
      <v-scale-transition origin="center center">
        <div v-if="showSuccessPrimaryIcon">
          <slot name="icon">
            <v-icon
              size="124"
              class="icon-duotone-success mb-4"
            >
              {{ iconPrimary }}
            </v-icon>
          </slot>
        </div>
      </v-scale-transition>
    </div>
    <v-expand-transition>
      <div
        v-if="expandSuccessMessage"
        class="success-text text-center"
      >
        <slot name="heading">
          <p
            class="font-weight-bold mb-1 text-body-3"
            style="color: #4CAF50"
          >
            {{ heading }}
          </p>
        </slot>
        <slot name="message">
          <p class="mb-0 text-body-1">
            {{ message }}
          </p>
        </slot>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  name: 'SuccessAnimation',
  props: {
    iconPrimary: {
      type: String,
      default: 'fad fa-check-circle'
    },
    useSuccessCheckIcon: {
      type: Boolean,
      default: true
    },
    usePrimaryIcon: {
      type: Boolean,
      default: true
    },
    heading: {
      type: String,
      default: 'Success!'
    },
    message: {
      type: String,
      default: 'Your changes have been saved.'
    },
  },
  emits: ['animation-complete'],
  data() {
    return {
      expandSuccessMessage: false,
      scaleSuccessIcon: false,
      scaleSuccessCheckIcon: false,
      isAnimationComplete: false,
    };
  },
  computed: {
    showSuccessCheckIcon() {
      return this.scaleSuccessCheckIcon && this.useSuccessCheckIcon;
    },
    showSuccessPrimaryIcon() {
      return this.scaleSuccessIcon && this.usePrimaryIcon;
    },
  },
  mounted() {
    this.displaySuccessAnimation();
  },
  methods: {
    displaySuccessAnimation() {
      setTimeout(() => {
        this.scaleSuccessIcon = true;
      }, 300);
      setTimeout(() => {
        this.expandSuccessMessage = true;
        this.scaleSuccessCheckIcon = true;
      }, 600);
      setTimeout(() => {
        this.isAnimationComplete = true;
        this.$emit('animation-complete');
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>

.success-animation--text {
  .success-check-icon {
    right: -18px !important;
  }
}

.success-check-icon {
  position: absolute !important;
  right: -10px !important;
  top: -8px !important;
  z-index: 2 !important;
  border-radius: 50% !important;
  box-shadow: 0 0 0 4px #fff !important;
}

.success-text {
  width: 100%;
}
</style>
