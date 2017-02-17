const fs = require('fs');
const path = require('path');

const dataDir = path.resolve(__dirname, '../../data');

function index(req, res) {
  const data = {
    componentsData: {},
  };
  const files = fs.readdirSync(dataDir);

  for (let i = 0; i < files.length; i += 1) {
    const filename = files[i];
    const contents = fs.readFileSync(path.resolve(dataDir, filename), 'utf8').trim();

    data.componentsData[filename.replace(/\.[^/.]+$/, '')] = JSON.parse(contents);
  }

  res.render('components', data);
}

module.exports = {
  index,
};
