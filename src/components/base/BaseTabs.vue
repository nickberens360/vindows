<template>
  <v-tabs
    v-bind="$attrs"
    bg-color="transparent"
    :class="tabClasses"
    selected-class="meru-tabs--selected"
    slider-color="transparent"
    :color="tabColor"
    height="45"
  >
    <v-tab
      v-for="tabItem in tabs"
      :key="tabItem.value"
      :to="handleRoute(tabItem.route)"
      :value="tabItem.value"
      class="text-primary"
      rounded="0"
    >
      <template #default>
        {{ tabItem.text }}
        <div v-if="tabItem.count > 0">
          <v-avatar
            v-if="!tabItem.canHaveException"
            size="32"
            class="ml-1"
          >
            {{ tabItem.count }}
          </v-avatar>
          <v-badge
            v-else
            color="error"
            icon="fas fa-exclamation"
            offset-y="5"
            offset-x="-3"
          >
            <v-avatar
              size="32"
              class="ml-1"
            >
              {{ tabItem.count }}
            </v-avatar>
          </v-badge>
        </div>
      </template>
    </v-tab>
  </v-tabs>
  <v-divider
    v-if="tabRowVariant === 'styled'"
  />
</template>

<script>
export default {
  name: 'BaseTabs',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    tabRowVariant: {
      type: String,
      default: 'default',
      validator: (value) => {
        const allowedVariants = ['default', 'styled'];
        return allowedVariants.includes(value);
      },
    },
    tabVariant: {
      type: String,
      default: 'primary',
      validator: (value) => {
        const allowedVariants = ['primary', 'secondary'];
        return allowedVariants.includes(value);
      },
    },
  },
  computed: {
    tabColor() {
      if (this.tabVariant === 'primary') return 'primary';
      return 'primary-lighten-5';
    },
    tabClasses() {
      return `meru-tabs--${this.tabVariant}` + (` meru-tabs--${this.tabRowVariant}`);
    },
  },
  methods: {
    handleRoute(route) {
      if (route) return {name: route};
      return null;
    },
  },
};
</script>

<style scoped lang="scss">

.meru-tabs--styled {
  padding: 0 16px 0 16px;
  margin: 12px 0 12px 0;
  &.meru-tabs--primary {
    :deep(.v-slide-group__container) {
      display: inline-block;
      flex: unset;
      box-shadow: 0px 3px 3px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 3px 4px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 8px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
      .v-btn {
        border-right: 2px solid #eee ;
        &:last-child {
          border-right: none ;
        }
      }
    }
  }
}

.meru-tabs--primary {
  overflow: unset;
  .v-avatar {
    background: rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-primary-lighten-5));
  }
  .meru-tabs--selected {
    background: rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-white)) !important;
    transition: all 0.5s ease-in-out;
    .v-avatar {
      background: rgb(var(--v-theme-primary-lighten-5));
      color: rgb(var(--v-theme-primary));
    }
  }
}

.meru-tabs--secondary {
  .v-avatar {
    background: rgb(var(--v-theme-primary)) ;
    color: rgb(var(--v-theme-primary-lighten-5));
  }
  .meru-tabs--selected {
    color: rgb(var(--v-theme-primary)) !important;
    transition: all 0.5s ease-in-out;
    background: rgb(var(--v-theme-primary-lighten-5));
  }
}
.meru-tabs--selected {
  font-weight: bold;
  transition: all 0.5s ease-in-out;
}

.v-btn {
  background: transparent;
}
</style>
