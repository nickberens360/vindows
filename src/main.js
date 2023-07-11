import App from './App.vue';
import { createApp } from 'vue';
import { registerPlugins } from '@/plugins';
import '@/scss/global-styles/main.scss';

const app = createApp(App);

registerPlugins(app);
app.mount('#app');
