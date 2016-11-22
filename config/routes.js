// eslint-disable new-cap
const app = require('express');

const router = app.Router();
const contentRouter = app.Router();
const contentPageController = require('../app/controllers/content-page');
const developmentOnlyController = require('../app/controllers/development-only');
const redirectController = require('../app/controllers/redirect');
const healthcheckController = require('../app/controllers/healthcheck');
const contentApiMiddleware = require('../app/middleware/content-api');
const guideContainerMiddleware = require('../app/middleware/guide-container');
const guideMiddleware = require('../app/middleware/guide');
const setFeedbackMiddleware = require('../app/middleware/set-feedback');

router.get('/:slug(elements)', developmentOnlyController.index);
router.get('/healthcheck', healthcheckController.index);
router.get('/*(help|symptoms|conditions)', redirectController.index);

contentRouter.all('/', contentPageController.index);
contentRouter.all('/*(help|symptoms|conditions)/*?', contentPageController.index);

module.exports = [
  router,
  [
    contentApiMiddleware,
    guideContainerMiddleware,
    guideMiddleware,
    setFeedbackMiddleware,
    contentRouter,
  ],
];
