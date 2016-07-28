const fs = require('fs');
const logger = require('../lib/logger');

const sourcePath = './.source_version';

module.exports = {
  getGitSha: () => {
    let sha;

    try {
      fs.accessSync(sourcePath, fs.F_OK);
      sha = fs.readFileSync(sourcePath, 'utf8').trim();
    } catch (e) {
      logger.warn('No source version file found');
    }

    return sha;
  },
};
