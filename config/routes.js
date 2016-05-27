// eslint-disable-next-line new-cap
const router = require('express').Router();
const indexCtrl = require('../app/controllers/index');

router.get('/', indexCtrl.index);

module.exports = router;
