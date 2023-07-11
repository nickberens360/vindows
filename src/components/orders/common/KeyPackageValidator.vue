<template>
  <div>
    <v-fade-transition>
      <KeyQuantityCard
        v-if="activeScannedPackage"
        :items="activeScannedPackage.items"
        :transaction-id="activeScannedPackage.transactionId"
      />
    </v-fade-transition>
    <v-container>
      <v-form
        ref="form"
        validate-on="submit"
        @submit.prevent
      >
        <v-label
          class="text-caption-2 primary-lighten-1 mb-1 text-primary-lighten-1"
          :text="labelValue"
        />
        <v-text-field
          v-if="!isPackageScanned"
          v-model="packageInputId"
          variant="outlined"
          bg-color="white"
          class="elevation-0"
          autofocus
          @keyup.enter="handleScannedPackage(packageInputId)"
        />
        <v-slide-x-reverse-transition>
          <div v-if="!isValidPackageInput">
            <ItemStatusRow
              exception
              exception-text="Package ID is invalid."
              :text="packageInputId"
              count="1"
            />
          </div>
        </v-slide-x-reverse-transition>
        <v-text-field
          v-if="isPackageScanned"
          ref="input"
          v-model="scanValue"
          variant="outlined"
          bg-color="white"
          class="elevation-0"
          autofocus
          @keyup.enter="handleManualSkuInput(scanValue)"
        />
      </v-form>
      <transition-group
        name="list"
        tag="div"
      >
        <ItemStatusRow
          v-for="(item, i) in itemStatusRowItems"
          :key="item.text + i"
          :exception="item.hasException"
          :exception-text="item.exceptionText"
          :text="item.text"
          :count="i + 1"
        />
      </transition-group>
    </v-container>
    <v-footer
      v-if="isPackageScanned"
      app
      class="w-100 d-flex flex-column"
    >
      <ActionBar
        color="primary-lighten-3"
        height="86"
      >
        <template #center>
          <v-btn
            variant="flat"
            color="red"
            class="font-weight-regular"
          >
            Out of Stock
          </v-btn>
        </template>
      </ActionBar>
      <ActionBar color="blue-grey">
        <template #left>
          <v-btn
            variant="flat"
            color="white"
            class="text-primary font-weight-regular"
            @click="handleCancel()"
          >
            Cancel
          </v-btn>
        </template>
      </ActionBar>
    </v-footer>
  </div>
</template>

<script>
import ItemStatusRow from '@/components/base/ItemStatusRow';
import KeyQuantityCard from '@/components/orders/fulfillment/KeyQuantityCard';
import ActionBar from '@/components/base/ActionBar';
import { useFulfillmentStore } from '@/store/fulfillment';

import { mapStores } from 'pinia';

export default {
  name: 'KeyPackageValidator',
  components: { KeyQuantityCard, ItemStatusRow, ActionBar },
  emits: ['scanned-active-package', 'validation-complete'],
  data() {
    return {
      itemStatusRowItems: [], // Array of items to be shown in the status row, each item contains information about scanned SKU, count, exception, and exception text
      skusInPickList: [], // Array of SKUs that need to be validated when scanning
      activeScannedPackage: null, // Holds the package that is currently being scanned
      isInvalidSku: false,
      exceptionItemIndex: null, // Index of the item that has an exception
      isPackageScanned: false,
      packageInputId: '',
      scanValue: '',
      isValidPackageInput: true,
    };
  },
  computed: {
    ...mapStores(useFulfillmentStore),
    labelValue() {
      return this.isPackageScanned ? 'Scan Key Package' : 'Scan Package Label';
    },
  },
  methods: {

    handleScannedPackage(transactionId) {
      let packageInputValue = this.fulfillmentStore.pickList.find(item => item.transactionId === transactionId);

      if (!packageInputValue) {
        this.isValidPackageInput = false;
        this.$refs.form.validate();
        return;
      }
      this.isValidPackageInput = true;
      this.activeScannedPackage = packageInputValue;
      this.skusInPickList.push(...this.formatPickList(this.activeScannedPackage));
      this.$emit('scanned-active-package', this.activeScannedPackage);
      this.isPackageScanned = true;

      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },

    handleManualSkuInput(value) {
      if (this.isInvalidSku) {
        this.handlePreviousInvalidScan();
      }
      if (this.skusInPickList.includes(value)) {
        this.handleValidSku(value);
      } else if (value !== ''){
        this.handleInvalidSku(value);
      }
      setTimeout(() => {
        this.$refs.input.select();
      }, 500);

      if (this.skusInPickList.length === 0 && !this.isInvalidSku) {
        this.$emit('validation-complete');
      }

      this.$refs.input.select();
    },

    handlePreviousInvalidScan() {
      this.itemStatusRowItems.splice(this.exceptionItemIndex, 1);
    },

    handleValidSku(value) {
      this.isInvalidSku = false;

      this.itemStatusRowItems.push({
        text: value,
        hasException: false,
        exceptionText: '',
      });

      let index = this.skusInPickList.indexOf(value);

      if (index !== -1) {
        this.skusInPickList.splice(index, 1);
      }
    },

    handleInvalidSku(value) {
      this.isInvalidSku = true;

      this.$nextTick(() => {
        this.itemStatusRowItems.push({
          text: value,
          hasException: true,
          exceptionText: 'Wrong SKU',
        });

        this.exceptionItemIndex = this.itemStatusRowItems.length - 1;
      });
    },

    handleCancel() {
      this.itemStatusRowItems = [];
      this.skusInPickList = [];
      this.activeScannedPackage = null;
      this.isInvalidSku = false;
      this.exceptionItemIndex = null;
      this.isPackageScanned = false;
      this.packageInputId = '';
      this.scanValue = '';
      this.$emit('scanned-active-package', null);
    },

    formatPickList(activePackageItem) {
      let skus = [];

      activePackageItem.items.forEach(item => {
        skus.push(...Array.from({ length: item.quantity }, () => item.hillmanSku));
      });

      return skus;
    }
  },

  // TODO: integration https://minutekey.atlassian.net/browse/LIN-1446?atlOrigin=eyJpIjoiYmJjOGFjOTE3OWZkNDNkNjg4ZDQzMWRjZTk1ZmQyMzUiLCJwIjoiaiJ9
};
</script>

<style scoped lang="scss">

:deep(.v-footer) {
  left: 0 !important;
  right: 0 !important;
  padding: 0 !important;
  display: block !important;
}

:deep(.v-input) {
  input {
    color: rgb(var(--v-theme-primary-lighten-1)) !important;
  }

  .v-field__outline {
    color: rgb(var(--v-theme-primary)) !important;
  }

}


:deep(.v-label) {
  opacity: 1 !important;
}


</style>
