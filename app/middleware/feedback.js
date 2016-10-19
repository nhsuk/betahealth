/* eslint-disable no-param-reassign */
const requestIp = require('request-ip');
const feedbackApi = require('../../lib/feedback-api');
const logger = require('../../lib/logger');
const config = require('../../config/config');

module.exports = () => {
  return function feedback(req, res, next) {
    const isPost = req.method.toLowerCase() === 'post';
    const isFeedback = req.body.hasOwnProperty('feedback-form-comments');

    res.locals.FEEDBACKFORM = {
      path: req.path,
      disabled: config.feedbackApi.disabled,
    };

    if (isPost && isFeedback && !config.feedbackApi.disabled) {
      req.checkBody('feedback-form-comments').notEmpty();
      req.sanitizeBody('feedback-form-comments');
      req.sanitizeBody('feedback-form-path');

      const errors = req.validationErrors();
      if (errors) {
        res.locals.FEEDBACKFORM.outcome = 'failure';
        res.locals.FEEDBACKFORM.errorType = 'submission';
        res.locals.FEEDBACKFORM.errors = errors;
        res.locals.FEEDBACKFORM.data = req.body;
        next();
      } else {
        const formData = {
          ip: requestIp.getClientIp(req),
          comment: req.body['feedback-form-comments'],
          path: req.body['feedback-form-path'],
        };

        feedbackApi
          .sendComment(formData)
          .then(() => {
            res.locals.FEEDBACKFORM.outcome = 'success';
            next();
          }, (error) => {
            logger.error(error);
            res.locals.FEEDBACKFORM.outcome = 'failure';
            res.locals.FEEDBACKFORM.errorType = 'server';
            res.locals.FEEDBACKFORM.data = req.body;
            next();
          });
      }
    } else {
      next();
    }
  };
};
