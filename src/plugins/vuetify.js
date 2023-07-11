/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { aliases, fa } from 'vuetify/iconsets/fa-svg';

const defaultTheme = {
  dark: false,
  colors: {
    'anchor': '#1867C0',
    'anchor-link': '#1867C0',
    'primary': '#607d8b',
    'primary-darken-1': '#37474F',
    'primary-darken-2': '#455A64',
    'primary-darken-3': '#37474F',
    'primary-darken-4': '#263238',
    'primary-lighten-1': '#78909C',
    'primary-lighten-3': '#B0BEC5',
    'primary-lighten-4': '#CFD8DC',
    'primary-lighten-5': '#ECEFF1',
    'blue': '#384BC5',
    'blue-dark': '#032955',
    'blue-grey': '#90A4AE',
    'blue-grey-lighten-2': '#90A4AE',
    'blue-grey-lighten-3': '#B0BEC5',
    'blue-grey-lighten-4': '#CFD8DC',
    'blue-grey-darken-1': '#546E7A',
    'lavender': '#626A99',
    'grey': '#B0BEC5',
    'grey-lighten-2': '#eaeff0',
    'grey-lighten-3': '#E0E0E0',
    'grey-lighten-4': '#f7f8f9',
    'secondary': '#00bcd4',
    'accent': '#009688',
    'error': '#f44336',
    'error-lighten-4': '#ffd8d6',
    'error-lighten-5': '#FEE6E5',
    'warning': '#ff9800',
    'info': '#2196f3',
    'success': '#4CAF50',
    'green': '#4CAF50',
    'orange': '#FF9800',
    'red': '#ff0000',
    'white': '#ffffff',
    'orange-lighten-1': '#ffb95a',
    'stage-refunded': '#f44336',
    'stage-declined': '#d32f2f',
    'stage-processed': '#4caf50',
    'stage-pending-ship': '#fb8c00',
    'stage-shipped': '#008000',
  }
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDataTable,
  },
  theme: {
    defaultTheme: 'defaultTheme',
    themes: {
      defaultTheme,
    }
  },
  icons: {
    defaultSet: 'fa',
    aliases: {
      ...aliases,
      sort: 'fal fa-arrow-up'
    },
    sets: {
      fa,
    },
  },
});
