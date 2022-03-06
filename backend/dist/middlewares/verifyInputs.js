'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errorHandler = require('./errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifyUserInput = {
  registerUserRequestBody: function registerUserRequestBody(req, res, next) {
    req.check('email', 'invalid email type').isEmail();
    req.check('email', 'email is required').trim().notEmpty();
    req.check('password', 'password is required').trim().notEmpty();
    (0, _errorHandler2.default)(req, res, next);
  },
  crudUserRequestBody: function crudUserRequestBody(req, res, next) {
    req.check('animeName', 'Anime name is required').trim().notEmpty();

    (0, _errorHandler2.default)(req, res, next);
  }
};

exports.default = verifyUserInput;