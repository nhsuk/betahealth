const fs = require('fs');
const path = require('path');

const dataDir = path.resolve(__dirname, '../../data');

function index(req, res) {
  const data = {
    componentFamilies: {},
  };
  const files = fs.readdirSync(dataDir);
  let family;

  for (let i = 0; i < files.length; i += 1) {
    const filename = files[i];
    const fileContents = fs.readFileSync(path.resolve(dataDir, filename), 'utf8').trim();
    const componentData = JSON.parse(fileContents);

    if (family !== componentData.family) {
      family = componentData.family;
      data.componentFamilies[family] = [];
    }

    data.componentFamilies[family].push(componentData);
  }

  res.render('components', data);
}

module.exports = {
  index,
};
