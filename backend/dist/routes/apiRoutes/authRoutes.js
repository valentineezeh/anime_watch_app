'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authController = require('../../controllers/authController');

var _authController2 = _interopRequireDefault(_authController);

var _verifyInputs = require('../../middlewares/verifyInputs');

var _verifyInputs2 = _interopRequireDefault(_verifyInputs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRouter = _express2.default.Router();

authRouter.post('/register', _verifyInputs2.default.registerUserRequestBody, _authController2.default.SignUp);

authRouter.post('/login', _verifyInputs2.default.registerUserRequestBody, _authController2.default.SignIn);

exports.default = authRouter;