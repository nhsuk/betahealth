// eslint-disable-next-line new-cap
const router = require('express').Router();
const contentPageController = require('../app/controllers/content-page');
const contentApiMiddleware = require('../app/middleware/content-api');
const guideContainerMiddleware = require('../app/middleware/guide-container');
const guideMiddleware = require('../app/middleware/guide');
const setFeedbackMiddleware = require('../app/middleware/set-feedback');

router.use(contentApiMiddleware());
router.use(guideContainerMiddleware());
router.use(guideMiddleware());
router.use(setFeedbackMiddleware());

router.all('/', contentPageController.index);

module.exports = router;
