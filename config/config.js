const path = require('path');

module.exports = {
  root: path.normalize(`${__dirname}/..`),
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
  staticCdn: process.env.STATIC_CDN || '/',
  dyno: process.env.DYNO,
  azureWebsiteName: process.env.APPSETTING_WEBSITE_SITE_NAME,
};
