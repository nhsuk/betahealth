// eslint-disable-next-line new-cap
const router = require('express').Router();
const developmentOnlyController = require('../app/controllers/development-only');
const redirectController = require('../app/controllers/redirect');
const healthcheckController = require('../app/controllers/healthcheck');
const contentRouter = require('./content-router');

router.use('/', contentRouter);
router.get('/:slug(elements)', developmentOnlyController.index);
router.get('/healthcheck', healthcheckController.index);
router.get('/*(help|symptoms|conditions)', redirectController.index);
router.use('/*(help|symptoms|conditions)/*?', contentRouter);

module.exports = router;
