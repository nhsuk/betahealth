/* eslint-disable no-param-reassign */
const requestIp = require('request-ip');
const filter = require('lodash/filter');
const isArray = require('lodash/isArray');
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
      // validation
      req.checkBody('feedback-form-theme', {
        anchor: 'group-feedback-form-theme',
        label: 'what you were looking for today',
      }).notEmpty();
      if (req.body['feedback-form-theme'] === 'Something else') {
        req.checkBody('feedback-form-theme-other', {
          anchor: 'input-feedback-form-theme-other',
          label: 'what you were looking for today',
        }).notEmpty();
      }
      req.checkBody('feedback-form-found', {
        anchor: 'group-feedback-form-found',
        label: 'if you found it',
      }).notEmpty();

      // sanitisation
      req.sanitizeBody('feedback-form-theme');
      req.sanitizeBody('feedback-form-theme-other');
      req.sanitizeBody('feedback-form-comments');
      req.sanitizeBody('feedback-form-found');
      req.sanitizeBody('feedback-form-path');

      const errors = req.validationErrors(true);
      if (errors) {
        res.locals.FEEDBACKFORM.outcome = 'failure';
        res.locals.FEEDBACKFORM.errorType = 'submission';
        res.locals.FEEDBACKFORM.errors = errors;
        res.locals.FEEDBACKFORM.data = req.body;
        next();
      } else {
        let theme = req.body['feedback-form-theme'];

        theme = !isArray(theme) ? theme.split(',') : theme;
        theme = filter(theme, (item) => {
          return item !== 'Something else';
        });

        const formData = {
          ip: requestIp.getClientIp(req),
          theme,
          themeOther: req.body['feedback-form-theme-other'],
          comment: req.body['feedback-form-comments'],
          found: req.body['feedback-form-found'],
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
