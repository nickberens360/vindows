import axios from 'axios';
import router from '@/router';
import { useUserStore } from '@/store/user';

export default (() => {
  const config = {
    baseURL: import.meta.env.VITE_API_URL || '/',
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  };
  const apiKey = import.meta.env.VITE_API_KEY || null;
  if (apiKey) {
    config.headers['x-api-key'] = apiKey;
  }
  const apiService = axios.create(config);

  apiService.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.status === 403) {
        useUserStore().$reset();
        router.push({ name: 'login' });
      }
      return Promise.reject(error);
    }
  );

  return apiService;
})();
