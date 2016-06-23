// eslint-disable-next-line new-cap
const router = require('express').Router();
const config = require('../config/config');

const indexController = require('../app/controllers/index');
const elementsController = require('../app/controllers/elements');
const cookiesController = require('../app/controllers/cookies');
const assuranceController = require('../app/controllers/clinical-assurance');

const healthcheckController = require('../app/controllers/healthcheck');

const stomachAcheController = require('../app/controllers/stomach-ache');

router.get('/', indexController.index);

router.get('/healthcheck', healthcheckController.index);

router.get('/help/cookies', cookiesController.index);
router.get('/help/clinical-assurance', assuranceController.index);

router.all('/symptoms/stomach-ache', stomachAcheController.index);

if (config !== 'production') {
  router.get('/elements', elementsController.index);
}

module.exports = router;
