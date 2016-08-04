const cookieMessage = require('./modules/cookie-message');
const feedbackForm = require('./modules/feedback-form');
const analytics = require('./modules/analytics');

cookieMessage('global-cookies-banner');
feedbackForm.init();
analytics.init();
