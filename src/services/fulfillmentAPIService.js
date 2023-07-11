import API from './api';
import { apiRequestInterceptor } from './requestInterceptor';

const useMockFulfillment = import.meta.env.VITE_ENABLE_MOCK_FULFILLMENT_DATA;
const mockApiUrl = import.meta.env.VITE_MOCK_API_URL;
const apiUrl = import.meta.env.VITE_API_URL;

apiRequestInterceptor(
  useMockFulfillment ? mockApiUrl : apiUrl,
  useMockFulfillment ? 'example=mockData' : null
);

export default {
  getPendingPickList() {
    return API.get('/orders/pendingPick');
  },
};
