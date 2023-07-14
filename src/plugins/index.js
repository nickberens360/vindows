/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { createPinia } from 'pinia';
import router from '../router';
import vuetify from './vuetify';
import fontawesome from './fontawesome';

export function registerPlugins(app) {
  app
    .use(createPinia())
    .use(router)
    .use(fontawesome)
    .use(vuetify);

}
