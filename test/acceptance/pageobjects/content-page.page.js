const page = require('./page');

const formPage = Object.create(page, {
  /**
   * define elements
   */
  header: {
    get: () => {
      return browser.elements('.local-header');
    },
  },
  h1: {
    get: () => {
      return browser.elements('.local-header h1');
    },
  },

  /**
   * define or overwrite page methods
   */
  open: {
    value: function open() {
      page.open.call(this, 'symptoms/stomach-ache');
    },
  },
});

module.exports = formPage;
