/* eslint-disable no-param-reassign */
module.exports = () => {
  return function feedback(req, res, next) {
    const isPost = req.method.toLowerCase() === 'post';
    const isFeedback = req.body.hasOwnProperty('feedback-form-comments');

    res.locals.FEEDBACKFORM = {
      path: req.path,
    };

    if (isPost && isFeedback) {
      req.checkBody('feedback-form-comments').notEmpty();

      const errors = req.validationErrors();
      if (errors) {
        res.locals.FEEDBACKFORM.outcome = 'failure';
        res.locals.FEEDBACKFORM.errorType = 'submission';
        res.locals.FEEDBACKFORM.errors = errors;
        next();
      } else {
        req.sanitizeBody('feedback-form-comments');
        req.sanitizeBody('feedback-form-path');

        const formData = {
          comment: req.body['feedback-form-comments'],
          path: req.body['feedback-form-path'],
        };

        console.log(formData);

        res.locals.FEEDBACKFORM.outcome = 'success';
        next();
      }
    } else {
      next();
    }
  };
};
