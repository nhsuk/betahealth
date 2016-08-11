// eslint-disable-next-line new-cap
const router = require('express').Router();
const config = require('../config/config');

const indexController = require('../app/controllers/index');
const elementsController = require('../app/controllers/elements');
const cookiesController = require('../app/controllers/cookies');
const assuranceController = require('../app/controllers/clinical-assurance');

const healthcheckController = require('../app/controllers/healthcheck');

const fungalNailInfectionController = require('../app/controllers/fungal-nail-infection');
const stomachAcheController = require('../app/controllers/stomach-ache');
const rashesInChildrenController = require('../app/controllers/rashes-in-babies-and-children');

router.get('/', indexController.index);

router.get('/healthcheck', healthcheckController.index);

router.get('/help/cookies', cookiesController.index);
router.get('/help/clinical-assurance', assuranceController.index);

router.all('/conditions/fungal-nail-infection', fungalNailInfectionController.index);

router.all('/symptoms/rashes-in-babies-and-children', rashesInChildrenController.index);
router.all('/symptoms/stomach-ache', stomachAcheController.index);

if (config.env === 'development') {
  router.get('/elements', elementsController.index);
}

module.exports = router;
