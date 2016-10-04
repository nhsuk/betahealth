const request = require('request');
const config = require('../config/config');

const API_BASEURL = config.contentApi.baseUrl || 'http://127.0.0.1:8000';

const ContentApi = function ContentApi() {
  this.API_BASEURL = API_BASEURL;
};


function getImage(imageId) {
  return new Promise((resolve, reject) => {
    return request({
      method: 'GET',
      uri: `${API_BASEURL}/api/v2/images/${imageId}/`,
      headers: {
        'Content-Type': 'application/json',
      },
    }, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      if (response.statusCode === 200) {
        return resolve(JSON.parse(body));
      }

      return reject(new Error(response));
    });
  });
}


function transformData(obj) {
  function transformComponents(component, promises) {
    if (component instanceof Array) {
      component.forEach((item) => {
        transformComponents(item, promises);
      });
      return;
    }

    if (typeof component !== 'object') {
      return;
    }

    if (component.type === 'image') {
      promises.push(
        new Promise((resolve) => {
          getImage(component.value).then((data) => {
            component.image = data;
            resolve(component);
          });
        })
      );
      return;
    }

    Object.keys(component).forEach((item) => {
      if (component.hasOwnProperty(item)) {
        transformComponents(component[item], promises);
      }
    });
  }

  const resolvedObj = {
    layout: 'content-sidebar-last',
    title: obj.title,
    nonEmergencyCallout: true,
    choicesOrigin: '',
    localHeader: [
      {
        type: 'markdown',
        content: obj.intro,
      },
    ],
    main: obj.body,
    sidebar: obj.aside,
  };

  const promises = [
    new Promise((resolve) => {
      resolve(resolvedObj);
    }),
  ];

  transformComponents(resolvedObj.main, promises);
  transformComponents(resolvedObj.sidebar, promises);

  return Promise.all(promises);
}

ContentApi.prototype.getRecordById = function getRecordById(pk) {
  return new Promise((resolve, reject) => {
    return request({
      method: 'GET',
      uri: `${API_BASEURL}/api/v2/pages/${pk}/`,
      headers: {
        'Content-Type': 'application/json',
      },
    }, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      if (response.statusCode === 200) {
        transformData(JSON.parse(body)).then((values => {
          resolve(values[0]);
        }));
      } else {
        return reject(new Error(response));
      }

      return null;
    });
  });
};

ContentApi.prototype.getRecord = function getRecord(slug) {
  return new Promise((resolve, reject) => {
    return request({
      method: 'GET',
      uri: `${API_BASEURL}/api/v2/pages/?url_path=/home/${slug}/`,
      headers: {
        'Content-Type': 'application/json',
      },
    }, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      if (response.statusCode === 200) {
        const jsonBody = JSON.parse(body);

        if (!jsonBody.items.length) {
          return reject(false);
        }

        return resolve(this.getRecordById(jsonBody.items[0].id));
      }

      return reject(new Error(response));
    });
  });
};

module.exports = new ContentApi();
