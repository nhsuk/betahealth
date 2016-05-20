const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'NHS.UK Beta',
  });
});

module.exports = (app) => {
  app.use('/', router);
};
