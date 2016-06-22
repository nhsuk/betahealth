const version = require('../../package.json').version;
const gitLookup = require('../../lib/git-lookup');

function index(req, res) {
  res.json({
    version,
    sha: gitLookup.getGitSha(),
  });
}

module.exports = {
  index,
};
