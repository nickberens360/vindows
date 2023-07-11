import API from './api';

export default {
  getEnvConfigs() {
    return API.get('settings');
  },
};
