const request = require('request');
const config = require('../../config/config');

const BASEURL = config.contentStore.baseUrl;
const AUTH_TOKEN = config.contentStore.authToken;
const TIMEOUT = config.contentStore.timeout;

const RestHandler = {
  name: 'HTTP REST',
  get(pathname) {
    return new Promise((resolve, reject) => {
      if (!BASEURL) {
        return reject(new Error('Content store base URL not set'));
      }

      return request({
        method: 'GET',
        json: true,
        timeout: TIMEOUT,
        uri: `${BASEURL}/pages/with-path/${pathname}/`,
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        if (response.statusCode === 200) {
          const record = body;
          let layout = 'content-simple';

          if (record.sidebarOrder && record.sidebar.length && record.sidebar.length > 0) {
            layout = `content-sidebar-${record.sidebarOrder}`;
          }

          record.layout = layout;
          return resolve(record);
        }

        return reject(new Error(response));
      });
    });
  },
};

module.exports = RestHandler;
