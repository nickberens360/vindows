export default {
  install: (app) => {
    app.config.globalProperties.$currency = (price) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
    };
  },
};
