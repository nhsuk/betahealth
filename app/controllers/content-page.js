const logger = require('../../lib/logger');

function index(req, res, next) {
  const type = req.params.type;
  const view = req.params.page;

  res.render(`${type}/${view}`, {
    feedback: true,
  }, (err, html) => {
    if (err) {
      logger.warn(`View template '${view}' not found`);
      next();
    } else {
      res.send(html);
    }
  });
}

module.exports = {
  index,
};
