const contentApi = require('../../lib/content-api');

function index(req, res, next) {
  const slug = req.originalUrl.replace(/^\//, '') || 'index';
  const record = contentApi.getRecord(`${slug}`);
  let feedback = false;

  // only capture feedback on conditions/symptoms
  if (slug.indexOf('conditions') !== -1 || slug.indexOf('symptoms') !== -1) {
    feedback = true;
  }

  if (record) {
    record.feedback = feedback;
    res.render(`_layouts/${record.layout}`, record);
  } else {
    res.render(`${slug}`, {
      feedback,
    }, (err, html) => {
      if (err) {
        next(err);
      } else {
        res.send(html);
      }
    });
  }
}

module.exports = {
  index,
};
