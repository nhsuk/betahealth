const parseurl = require('parseurl');

function index(req, res) {
  const parsedUrl = parseurl.original(req);
  res.redirect(`/${parsedUrl.search || ''}`);
}

module.exports = {
  index,
};
