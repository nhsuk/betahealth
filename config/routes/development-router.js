// eslint-disable-next-line new-cap
const router = require('express').Router();

const elementsController = require('../../app/controllers/elements-controller');
const componentsController = require('../../app/controllers/components-controller');
const developmentMiddleware = require('../../app/middleware/development');

router.get('/elements', developmentMiddleware, elementsController.index);
router.get('/components', developmentMiddleware, componentsController.index);

module.exports = router;
