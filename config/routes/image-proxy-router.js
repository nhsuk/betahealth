// eslint-disable-next-line new-cap
const router = require('express').Router();
const proxy = require('http-proxy-middleware');

const config = require('../config');


router.use(config.contentStore.imageProxyPath, proxy({
  target: `${config.contentStore.baseUrl}`,
  pathRewrite: {
    '^/content-images': '/images',
  },
  changeOrigin: true,
}));

module.exports = router;
