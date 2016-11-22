// eslint-disable-next-line new-cap
const router = require('express').Router();

const contentPageController = require('../../app/controllers/content-page-controller');

const contentApiMiddleware = require('../../app/middleware/content-api');
const guideContainerMiddleware = require('../../app/middleware/guide-container');
const paginationMiddleware = require('../../app/middleware/pagination');
const setFeedbackMiddleware = require('../../app/middleware/set-feedback');

const middlewares = [
  contentApiMiddleware,
  guideContainerMiddleware,
  paginationMiddleware,
  setFeedbackMiddleware,
];

router.all('/', middlewares, contentPageController.index);
router.all('/*(help|symptoms|conditions)/*?', middlewares, contentPageController.index);

module.exports = router;
