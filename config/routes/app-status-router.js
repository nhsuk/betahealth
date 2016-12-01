// eslint-disable-next-line new-cap
const router = require('express').Router();

const healthcheckController = require('../../app/controllers/healthcheck-controller');

router.get('/healthcheck', healthcheckController.index);

module.exports = router;
