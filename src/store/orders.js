import ordersApi from '@/services/ordersAPIService';
import mockData from '@/services/mockDataService';
import { defineStore } from 'pinia';

export const useOrdersStore = defineStore('orders', {
  state: () => {
    return {
      useMockData: import.meta.env.VITE_ENABLE_MOCK_ORDER_DATA === 'true',
      orderDetails: null,
      orderSearchResults: [],
    };
  },
  actions: {
    async fetchOrderDetails(sessionId) {
      if (this.useMockData) {
        this.orderDetails = mockData.getOrderDetails();
      } else {
        const response = await ordersApi.getOrderDetails(sessionId);
        this.orderDetails = response.data;
      }
    },
    getOrderErrorMessage(error) {
      let errorResponse = error?.response || null;
      let errorCode = errorResponse?.status || '';
      let defaultMessage =
        'Something went wrong. Please try again, or contact support.';

      if (errorResponse === null) {
        return `Error: ${errorCode}. ${defaultMessage}`;
      }

      if (errorResponse.status === 403) {
        return 'Something went wrong, this user is not authorized to perform this action. Please try again, or contact support.';
      } else if (errorResponse.status === 404) {
        return 'Something went wrong, this order was not found. Please try again, or contact support.';
      } else {
        return defaultMessage;
      }
    },
    async searchOrders(formData) {
      if (this.useMockData) {
        this.orderSearchResults = mockData.getOrderSearchResults();
      } else {
        const response = await ordersApi.getOrders(formData);
        this.orderSearchResults = response.data;
      }
    },
    async sendOrderReceipt(sessionId, receiptData) {
      const response = await ordersApi.sendReceipt(sessionId, receiptData);
      return response.data;
    },
    async submitOrderRefund(sessionId, formData) {
      await ordersApi.refundOrder(sessionId, formData);
    },
  },
  getters: {
    getIsShippingRefunded() {
      return !!this.orderDetails?.items.find((item) => item.type === 'SH')
        ?.refunds.length;
    },
    getShowIncludeShipping() {
      return (
        !this.getIsShippingRefunded &&
        !!this.orderDetails?.payment?.shippingTotal
      );
    },
  },
});
