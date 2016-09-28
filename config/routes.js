// eslint-disable-next-line new-cap
const router = require('express').Router();
const developmentOnlyController = require('../app/controllers/development-only');
const healthcheckController = require('../app/controllers/healthcheck');
const contentPageController = require('../app/controllers/content-page');

router.all('/', contentPageController.index);
router.get('/:slug(elements)', developmentOnlyController.index);
router.get('/healthcheck', healthcheckController.index);
router.all('/*(help|symptoms|conditions)/*?', contentPageController.index);

module.exports = router;
