const page = require('./page');

const guidePage = Object.create(page, {
  /**
   * define elements
   */
  header: {
    get: () => {
      return browser.element('.local-header');
    },
  },
  h1: {
    get: () => {
      return browser.element('.local-header h1');
    },
  },
  navigation: {
    get: () => {
      return browser.element('.local-header nav.link-list__row');
    },
  },
  navigationLinks: {
    get: () => {
      return browser.elements('.local-header nav.link-list__row a');
    },
  },
  currentPage: {
    get: () => {
      return browser.element('.local-header nav.link-list__row .is-active');
    },
  },
  nextLink: {
    get: () => {
      return browser.element('.article-pagination__item a[rel="next"]');
    },
  },
  prevLink: {
    get: () => {
      return browser.element('.article-pagination__item a[rel="prev"]');
    },
  },

  /**
   * define or overwrite page methods
   */
  open: {
    value: function open() {
      page.open.call(this, 'conditions/type-2-diabetes');
    },
  },
});

module.exports = guidePage;
