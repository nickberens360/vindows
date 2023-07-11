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
import currency from './currency';
import componentDocs from './component-documentation';

export function registerPlugins(app) {
  app
    .use(createPinia())
    .use(router)
    .use(fontawesome)
    .use(componentDocs)
    .use(vuetify)
    .use(currency);
}
