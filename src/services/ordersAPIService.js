import API from './api';

export default {
  getOrderDetails(sessionId) {
    return API.get(`order/${sessionId}`);
  },
  getOrders(formData) {
    return API.post('orders', formData);
  },
  refundOrder(sessionId, formData) {
    return API.post(`order/${sessionId}/refund`, formData);
  },
  sendReceipt(sessionId, receiptData) {
    return API.post(`order/${sessionId}/sendReceipt`, receiptData);
  },
};
