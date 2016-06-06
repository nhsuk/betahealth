// eslint-disable-next-line new-cap
const router = require('express').Router();
const indexController = require('../app/controllers/index');
const elementsController = require('../app/controllers/elements');
const cookiesController = require('../app/controllers/cookies');

const stomachAcheController = require('../app/controllers/stomach-ache');

router.get('/', indexController.index);
router.get('/elements', elementsController.index);

router.get('/help/cookies', cookiesController.index);

router.get('/stomach-ache', stomachAcheController.index);

module.exports = router;
