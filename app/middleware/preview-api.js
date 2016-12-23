const parseUrl = require('parseurl');
const get = require('lodash/get');
const crypto = require('crypto');
const timingSafeCompare = require('tsscmp');

const contentStore = require('../../lib/content-store');


/* eslint-disable no-param-reassign */
module.exports = (req, res, next) => {
  const pathName = get(parseUrl.original(req), 'pathname', '');
  const [, givenSignature, pageId, revisionId] = pathName.match(/\/preview\/(.*=)\/(\d+)\/(\d+)/);

  const message = `${pageId}/${revisionId}/`;
  const hmacSha1 = crypto.createHmac('sha1', process.env.PREVIEW_SIGNATURE_KEY).update(message).digest('base64');
  const expectedSignature = hmacSha1.replace(/\+/g, '-').replace(/\//g, '_');

  // Ensure the signature is valid
  if (!timingSafeCompare(expectedSignature, givenSignature)) {
    const err = new Error('Page not found');
    err.status = 404;
    return next(err);
  }

  return contentStore.getPreview(`${pageId}/?revision-id=${revisionId}`)
    .then((response) => {
      const record = response;
      const layout = record.layout || 'content-simple';

      req.layout = `_layouts/${layout}`;
      req.pageData = record;
      req.pageData.previewRevisionId = revisionId;

      next();
    })
    .catch((err) => {
      err.status = 404;
      next(err);
    });
};
