// eslint-disable-next-line new-cap
const router = require('express').Router();
const config = require('../config/config');
const indexController = require('../app/controllers/index');
const elementsController = require('../app/controllers/elements');
const cookiesController = require('../app/controllers/cookies');
const assuranceController = require('../app/controllers/clinical-assurance');
const healthcheckController = require('../app/controllers/healthcheck');
const contentPageController = require('../app/controllers/content-page');

router.get('/', indexController.index);

if (config.env === 'development') {
  router.get('/elements', elementsController.index);
}

router.get('/help/cookies', cookiesController.index);
router.get('/help/clinical-assurance', assuranceController.index);

router.get('/healthcheck', healthcheckController.index);

router.all('/:type(conditions|symptoms)/:page', contentPageController.index);

module.exports = router;
