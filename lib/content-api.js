const request = require('request');
const path = require('path');
const fs = require('fs');

const config = require('../config/config');
const logger = require('../lib/logger');

function ContentApi() {
  this.CONTENT_ROOT = path.resolve(__dirname, '..', 'content');
  this.API_BASEURL = config.contentStore.baseUrl;
  this.AUTH_TOKEN = config.contentStore.authToken;
}

function loadFile(filepath) {
  let filecontents;

  try {
    fs.accessSync(filepath, fs.F_OK);
    filecontents = fs.readFileSync(filepath, 'utf8').trim();
  } catch (e) {
    filecontents = false;
  }

  return filecontents;
}

function transformData(obj, dirpath) {
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
        if (value.hasOwnProperty(item) && typeof value[item] === 'object') {
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

ContentApi.prototype.getRecord = function getRecord(slug) {
  return new Promise((resolve) => {
    this.getRecordHttp(slug)
      .then((record) => {
        logger.verbose(`Loaded from content API: ${slug}`);
        resolve(record);
      })
      .catch(() => {
        logger.verbose(`Loaded from file: ${slug}`);
        resolve(this.getRecordFile(slug));
      });
  });
};

ContentApi.prototype.getRecordFile = function getRecordFile(slug) {
  const dirpath = path.resolve(this.CONTENT_ROOT, slug);
  const filepath = path.resolve(dirpath, 'manifest.json');
  const record = loadFile(filepath);

  if (!record) {
    return false;
  }
  return transformData(JSON.parse(record), dirpath);
};

ContentApi.prototype.getRecordHttp = function getRecordHttp(slug) {
  return new Promise((resolve, reject) => {
    if (!this.API_BASEURL) {
      reject(new Error('Content store base URL not set'));
    } else {
      request({
        method: 'GET',
        json: true,
        timeout: config.contentStore.timeout,
        uri: `${this.API_BASEURL}/pages/with-path/${slug}/`,
        headers: {
          Authorization: `Bearer ${this.AUTH_TOKEN}`,
        },
      }, (error, response, body) => {
        if (error) {
          reject(error);
        } else if (!error && response.statusCode === 200) {
          const record = body;
          let layout = 'content-simple';

          if (record.sidebarOrder && record.sidebar.length && record.sidebar.length > 0) {
            layout = `content-sidebar-${record.sidebarOrder}`;
          }

          record.layout = layout;
          resolve(record);
        } else {
          reject(new Error(response));
        }
      });
    }
  });
};

module.exports = new ContentApi();
