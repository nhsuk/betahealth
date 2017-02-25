const page = require('./page');

const feedbackPage = Object.create(page, {
  /**
   * define elements
   */
  banner: {
    get: () => {
      return browser.element('.js-feedback-banner');
    },
  },
  toggle: {
    get: () => {
      return browser.element('.js-feedback-banner .js-feedback-toggle');
    },
  },
  feedbackContainer: {
    get: () => {
      return browser.element('#page-feedback');
    },
  },
  form: {
    get: () => {
      return browser.element('form[name="feedback-form"]');
    },
  },
  cancelBtn: {
    get: () => {
      return browser.element('#page-feedback button[type="reset"]');
    },
  },
  comment: {
    get: () => {
      return browser.element('#input-feedback-form-comments');
    },
  },
  reasonFirstOption: {
    get: () => {
      return browser.element('[for="input--feedback-form-theme--1"]');
    },
  },
  foundFirstOption: {
    get: () => {
      return browser.element('[for="input--feedback-form-found--1"]');
    },
  },
  errorSummary: {
    get: () => {
      return browser.element('#page-feedback .callout--error');
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
  submit: {
    value: function value() {
      this.form.submitForm();
    },
  },
});

module.exports = feedbackPage;
