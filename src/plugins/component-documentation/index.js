import ExampleComponent from './components/ExampleComponent.vue';
import ExDocs from './components/ExDocs.vue';
import ExDocsSelect from './components/ExDocsSelect.vue';
import ExDocsToggle from './components/ExDocsToggle.vue';
import ExDocsEditArray from './components/ExDocsEditArray.vue';


export default {
  install(app) {
    const docComponentModules = import.meta.glob('./components/**/*.vue');
    const componentModules = import.meta.glob('@/components/**/*.vue');
    const exampleModules = import.meta.glob('@/component-examples/**/*.vue');
    if (!import.meta.env.PROD) {
      app.provide('componentDocPlugin', {
        convertPathToExampleName,
        docComponentModules,
        componentModules,
        exampleModules
      });
      app.component('ExampleComponentUsage', ExampleComponent);
      app.component('ExDocs', ExDocs);
      app.component('ExDocsSelect', ExDocsSelect);
      app.component('ExDocsToggle', ExDocsToggle);
      app.component('ExDocsEditArray', ExDocsEditArray);
    }
  }
};

function convertPathToExampleName(path) {
  return 'Example' + path.replaceAll(' ', '-')
    .replaceAll('.vue', '')
    .split('/')
    .map((part) => {
      return part.split('-')
        .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join('')
        .trim();
    }).join('')
    .trim();
}
