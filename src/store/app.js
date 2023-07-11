import config from '@/services/envConfig';
import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';

export const useAppStore = defineStore('app', () => {
  const state = reactive({
    config: {
      skuImageBaseUrl: '',
      googleMapsAPI: {
        key: '',
        mapId: '',
      },
      title: '',
    },
    appBarHeight: 64,
    appNavigationDrawerWidth: 300,
    appNavigationRailWidth: 74,
    isAppNavigationDrawerOpen: true,
    isAppNavigationDrawerRailActive: false,
  });

  const actions = {
    async setEnvConfig() {
      const response = await config.getEnvConfigs();

      this.config = {
        skuImageBaseUrl: response.data['sku-image-base-url'],
        googleMapsAPI: {
          key: response.data['google-maps.frontend-api-key'],
          mapId: response.data['google-maps.map-id'],
        },
        title: response.data.title,
        port: response.data['webpack.port'],
        imageSources: response.data['image-sources'],
      };
    },
  };

  return { ...actions, ...toRefs(state) };
});
