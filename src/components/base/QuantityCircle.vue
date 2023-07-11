<template>
  <div class="quantity-circle">
    <div class="quantity-circle__wrap">
      <HoverableIcon
        v-if="exception"
        class="quantity-circle__hoverable-icon"
        card-title-color="error"
      >
        <template #icon>
          <v-avatar
            :size="hoverableIconSize"
            color="error"
          >
            <v-icon
              size="12"
              icon="fas fa-exclamation"
            />
          </v-avatar>
        </template>
        <template #card-title>
          {{ exceptionMessage }}
        </template>
      </HoverableIcon>
      <v-avatar
        :color="color"
        :size="avatarSize"
      >
        <dl class="quantity-circle__list">
          <dt
            v-if="size !== 'sm' && label"
            class="text-body-1"
            :class="labelColor"
          >
            {{ label }}
          </dt>
          <dd
            class="font-weight-bold"
            :class="quantityLabelStyles"
          >
            {{ quantity }}
          </dd>
        </dl>
      </v-avatar>
    </div>
  </div>
</template>

<script>
import HoverableIcon from '@/components/base/HoverableIcon';
export default {
  name: 'QuantityCircle',
  components: {HoverableIcon},
  props: {
    label: {
      type: String,
      default: ''
    },
    labelColor: {
      type: String,
      default: 'text-primary-lighten-4'
    },
    color: {
      type: String,
      default: 'blue-grey-darken-1'
    },
    quantity: {
      type: [Number, String],
      default: 0,
      required: true
    },
    size: {
      type: String,
      default: 'lg',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    exception: {
      type: Boolean,
      default: false
    },
    exceptionMessage: {
      type: String,
      default: 'Exception'
    }
  },
  computed: {
    quantityLabelStyles() {
      let fontSize = '';
      if (this.size === 'lg') {
        fontSize = 'text-h2 ';
      } else if (this.size === 'md') {
        fontSize = 'text-h1 ';
      } else {
        fontSize = 'text-body-1 ';
      }
      return fontSize + this.labelColor;
    },
    avatarSize() {
      if (this.size === 'lg') {
        return '104px';
      } else if (this.size === 'md') {
        return '80px';
      } else {
        return '32px';
      }
    },
    hoverableIconSize() {
      if (this.size === 'lg') {
        return '24px';
      } else {
        return '16px';
      }
    },
    hoverableIconPosition() {
      if (this.exception && this.size === 'lg') {
        return {
          right: '2px',
          top: '6px',
        };
      } else {
        return {
          right: '-7px',
          top: '-7px',
        };
      }
    }
  }
};
</script>

<style scoped lang="scss">
.quantity-circle__wrap {
  position: relative;
  width: v-bind('avatarSize');
}
.quantity-circle__hoverable-icon {
  position: absolute;
  z-index: 1;
  top: v-bind('hoverableIconPosition.top');
  right: v-bind('hoverableIconPosition.right');
}
.quantity-circle__list {
  dd {
    line-height: 1;
  }
}
</style>
