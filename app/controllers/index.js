const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'NHS.UK Beta',
  });
});

module.exports = (app) => {
  app.use('/', router);
};
