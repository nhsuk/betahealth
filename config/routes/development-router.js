// eslint-disable-next-line new-cap
const router = require('express').Router();

const elementsController = require('../../app/controllers/elements-controller');
const developmentMiddleware = require('../../app/middleware/development');

router.get('/elements', developmentMiddleware, elementsController.index);

module.exports = router;
