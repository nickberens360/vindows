/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { createPinia } from 'pinia';
import { markRaw } from 'vue';
import router from '../router';
import vuetify from './vuetify';
import fontawesome from './fontawesome';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

export function registerPlugins(app) {
  const pinia = createPinia();
  pinia.use(({ store }) => {
    store.$router = markRaw(router);
  }).use(piniaPluginPersistedState);
  app
    .use(pinia)
    .use(router)
    .use(fontawesome)
    .use(vuetify);

}
