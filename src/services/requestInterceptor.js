import API from './api';
export function apiRequestInterceptor(apiUrl, preferHeader) {
  API.interceptors.request.use(
    config => {
      config.baseURL = apiUrl;
      if (preferHeader) {
        config.headers['Prefer'] = preferHeader;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
}
