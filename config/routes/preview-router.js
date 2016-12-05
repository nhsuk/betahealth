const router = require('express').Router();

const previewApiMiddleware = require('../../app/middleware/preview-api');
const contentPageController = require('../../app/controllers/content-page-controller');

router.get('/*preview/*?', previewApiMiddleware, contentPageController.index);

module.exports = router;
