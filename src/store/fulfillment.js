import fulfillmentApi from '@/services/fulfillmentAPIService';
import { defineStore } from 'pinia';

export const useFulfillmentStore = defineStore('fulfillment', {
  state: () => {
    return {
      pendingPickList: [],
      pickList: [],
      pickedList: [],
    };
  },
  actions: {
    async fetchPendingPickList() {
      try {
        const response = await fulfillmentApi.getPendingPickList();
        this.pendingPickList = response.data;

      } catch (error) {
        console.error(error);
      }
    },
    postToPickList(items) {
      //TODO: Integrate with Picking API https://minutekey.atlassian.net/browse/LIN-1384
      this.pickList = items || [];
    },
    postToPickedList(item) {
      //TODO: Integrate with Picked API https://minutekey.atlassian.net/browse/LIN-1588
      this.pickedList.push(item);
    },
  },
  getters: {
    getPickingTabCount() {
      return this.pendingPickList.length + this.pickList.length + this.pickedList.length;
    },
  }

});
