<template>
  <div>
    <InfoField
      label="Pick List Date"
      content-size="lg"
      class="mb-4"
    >
      <template #details>
        WED 7/20/2022  5:45 PM
      </template>
    </InfoField>
    <transition-group
      name="list"
      tag="div"
    >
      <KeyItemRow
        v-if="pickList.length > 0"
        ref="selectionGroup"
        v-model="activePackageItemSelected"
        :items="pickList"
        show-reprint-btn
        hide-date
        hide-select-all
        hide-checkbox
        center-content-width="640px"
        class="w-100"
      />
      <h1 v-else>
        Pick List is Empty
      </h1>
    </transition-group>

    <AppDrawer
      is-open
      location="right"
      hide-close-btn
      :width="600"
      color="primary-lighten-4"
      floating
      no-padding
    >
      <template #default>
        <SuccessAnimation
          v-if="isKeyPackageValidationComplete"
          message="Pick Complete"
          class="mt-16"
          @animation-complete="handleAnimationComplete"
        />

        <div v-if="!isKeyPackageValidationComplete && pickList.length > 0">
          <KeyPackageValidator
            class="mb-4"
            @validation-complete="handleValidationComplete"
            @scanned-active-package="handleScannedActivePackage( $event )"
          />
        </div>
      </template>
    </AppDrawer>
  </div>
</template>

<script>

import SuccessAnimation from '@/component-examples/base/SuccessAnimation';
import { mapStores } from 'pinia';
import { useFulfillmentStore } from '@/store/fulfillment';

import AppDrawer from '@/components/app/AppDrawer';
import InfoField from '@/components/base/InfoField';
import KeyPackageValidator from '@/components/orders/common/KeyPackageValidator';
import KeyItemRow from '@/components/orders/fulfillment/KeyItemRow';

export default {
  name: 'PickInProgressPage',
  components: { SuccessAnimation, InfoField, KeyPackageValidator, KeyItemRow, AppDrawer},
  data() {
    return {
      pickList: [],
      activePackageItemSelected: [],
      activePackageIndex: null,
      isPackagedScanned: false,
      isKeyPackageValidationComplete: false,
    };
  },

  computed: {
    ...mapStores(useFulfillmentStore),
  },
  mounted() {
    this.pickList = this.fulfillmentStore.pickList;
  },
  methods: {
    handleScannedActivePackage(activePackage) {
      if (activePackage) {
        this.activePackageIndex = this.pickList.findIndex((item) => item === activePackage);
        this.pickList = this.pickList.filter((item) => item !== activePackage);
        this.pickList.unshift(activePackage);
        this.activePackageItemSelected = [activePackage];
      } else {
        if (this.activePackageIndex !== null) {
          let movedItem = this.pickList.splice(0, 1)[0];
          this.pickList.splice(this.activePackageIndex, 0, movedItem);
          this.activePackageIndex = null;
        }
        this.activePackageItemSelected = [];
      }

      setTimeout(() => {
        this.isPackagedScanned = true;
      }, 1000);
    },

    handleValidationComplete() {
      setTimeout(() => {
        this.isKeyPackageValidationComplete = true;
        this.fulfillmentStore.postToPickedList(...this.activePackageItemSelected );
        if (this.pickList.length > 0) {
          this.pickList.shift();
        }
      }, 1000);
    },

    handleAnimationComplete() {
      this.resetState();
    },

    resetState() {
      this.activePackageItemSelected = [];
      this.isPackagedScanned = false;
      this.isKeyPackageValidationComplete = false;
    },
  },
};
</script>

<style scoped lang="scss">

.fake-a-scanner {
  position: absolute;
  top: -110px;
  right: 0;
  z-index: 1;
  cursor: pointer;
  width: 150px;
  height: 125px;
  .v-chip {
    position: absolute;
    bottom: -30px;
    outline: 2px solid white;
    width: 100%;
    justify-content: center;
  }
  .fake-a-scanner__img-box {
    transform-origin: bottom left;
    transform: rotate(0deg);
    transition: transform 0.3s ease-in-out;
  }
  img {
    width: 100px;
  }
  .thumbs-up {
    position: absolute;
    top: 20px;
  }
  &.scan-in-progress {
    .fake-a-scanner__img-box {
      transform: rotate(-10deg);
    }
    img:not(.thumbs-up ) {
      width: 119px;
    }
  }
}
.selection-group {
  :deep(.selected) {
    margin-bottom: 68px;
  }
}

</style>
