const logger = require('../../lib/logger');

function index(req, res, next) {
  const template = req.params.page;

  res.render(template, {
    feedback: true,
  }, (err, html) => {
    if (err) {
      logger.warn(`View template '${template}' not found`);
      next();
    } else {
      res.send(html);
    }
  });
}

module.exports = {
  index,
};
