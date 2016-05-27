// eslint-disable-next-line new-cap
const router = require('express').Router();
const indexController = require('../app/controllers/index');
const elementsController = require('../app/controllers/elements');

router.get('/', indexController.index);
router.get('/elements', elementsController.index);

module.exports = router;
