const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const BASE_FILEPATH = path.resolve(__dirname, '..', '..', 'content');

function loadFile(filepath) {
  let contents;

  try {
    fs.accessSync(filepath, fs.F_OK);
    contents = fs.readFileSync(filepath, 'utf8').trim();
  } catch (e) {
    contents = null;
  }

  return contents;
}

function transformData(obj, dirpath) {
  if (!_.isPlainObject(obj)) {
    return null;
  }

  return Object.keys(obj).reduce((previous, key) => {
    const value = obj[key];
    const prevObj = previous;

    if (key === 'guide' && value) {
      const guideManifest = loadFile(path.resolve(dirpath, '..', 'manifest.json'));
      const guide = JSON.parse(guideManifest);

      if (guide) {
        prevObj.meta = {
          parent: guide,
          siblings: [],
        };

        Object.keys(guide.meta.children).forEach((page) => {
          const manifestPath = path.resolve(dirpath, '..', guide.meta.children[page].slug, 'manifest.json');
          const pageManifest = loadFile(manifestPath);
          const pageObj = JSON.parse(pageManifest);

          pageObj.slug = guide.meta.children[page].slug;

          prevObj.meta.siblings.push(pageObj);
        });
      }

      prevObj[key] = value;
    } else if (Array.isArray(value)) {
      Object.keys(value).forEach((item) => {
        if (typeof value[item] === 'string' && value[item].indexOf('!file=') !== -1) {
          const filepath = value[item].replace('!file=', '');
          value[item] = loadFile(path.resolve(dirpath, filepath));
        } else if (value.hasOwnProperty(item) && typeof value[item] === 'object') {
          value[item] = transformData(value[item], dirpath);
        }
      });

      prevObj[key] = value;
    } else if (typeof value === 'object') {
      prevObj[key] = transformData(value, dirpath);
    } else if (typeof value === 'string' && value.indexOf('!file=') !== -1) {
      const filepath = value.replace('!file=', '');
      prevObj[key] = loadFile(path.resolve(dirpath, filepath));
    } else {
      prevObj[key] = value;
    }

    return prevObj;
  }, {});
}

const FileHandler = {
  name: 'File System',
  get(pathname) {
    return new Promise((resolve, reject) => {
      const dirpath = path.resolve(BASE_FILEPATH, pathname);
      const filepath = path.resolve(dirpath, 'manifest.json');
      const record = JSON.parse(loadFile(filepath));
      const transformedData = transformData(record, dirpath);

      if (!transformedData) {
        return reject(new Error('File not found'));
      }

      return resolve(transformedData);
    });
  },

  preview() {
    throw Error('File preview is not implemented');
  },
};

module.exports = FileHandler;
