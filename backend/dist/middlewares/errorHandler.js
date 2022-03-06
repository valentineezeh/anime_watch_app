'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var handleValidations = function handleValidations(req, res, next) {
  var error = req.validationErrors();
  var validationErrors = [];
  if (error) {
    error.map(function (err) {
      return validationErrors.push(err.param);
    });
    var field = validationErrors.join(',');
    var message = validationErrors.length > 1 ? 'The fields ' + field + ' are required' : 'The field ' + field + ' is required';
    return res.status(400).json({
      error: {
        message: message,
        field: field,
        status: '400'
      }
    });
  }
  next();
};

exports.default = handleValidations;