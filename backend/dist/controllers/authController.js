'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _authService = require('../services/authService');

var _authService2 = _interopRequireDefault(_authService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Auth controller class
 * @class AuthController
 */
var AuthController = function () {
  function AuthController() {
    (0, _classCallCheck3.default)(this, AuthController);
  }

  (0, _createClass3.default)(AuthController, null, [{
    key: 'SignUp',

    /**
         * @description sign up user via cognito controller
         * @param {Object} req - Http Request object
         * @param {Object} res - Http Request object
         * @returns {Object} returns response
         */
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$body, email, password, resp;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, password = _req$body.password;
                _context.next = 3;
                return _authService2.default.SignUp(email, password);

              case 3:
                resp = _context.sent;
                return _context.abrupt('return', res.status(resp.statusCode).send(resp.response));

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function SignUp(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return SignUp;
    }()

    /**
       * @description sign in user via cognito controller
       * @param {Object} req - Http Request object
       * @param {Object} res - Http Request object
       * @returns {Object} returns response
       */

  }, {
    key: 'SignIn',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var _req$body2, email, password, resp, idToken;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context2.next = 3;
                return _authService2.default.SignIn(email, password);

              case 3:
                resp = _context2.sent;
                idToken = resp.response.token.idToken;
                _context2.next = 7;
                return _authService2.default.SaveRefreshToken(idToken);

              case 7:
                return _context2.abrupt('return', res.status(resp.statusCode).send(resp.response));

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function SignIn(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return SignIn;
    }()
  }]);
  return AuthController;
}();

exports.default = AuthController;