'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _dynamo = require('../lib/dynamo');

var _index = require('../lib/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Auth service class
 * @class AuthService
 */
var AuthService = function () {
  function AuthService() {
    (0, _classCallCheck3.default)(this, AuthService);
  }

  (0, _createClass3.default)(AuthService, null, [{
    key: 'SignUp',

    /**
       * @description sign up user via cognito
       * @param {STRING} email - email
       * @param {STRING} password - email
       * @returns {Object} returns response
       */
    value: function SignUp(email, password) {
      return new _promise2.default(function (resolve) {
        (0, _index.initAWS)();
        (0, _index.setCognitoAttributeList)();
        (0, _index.getUserPool)().signUp(email, password, (0, _index.getCognitoAttributeList)(), null, function (err, result) {
          if (err) return resolve({ statusCode: 422, response: err });
          var response = {
            username: result.user.username,
            userConfirmed: result.userConfirmed
          };
          return resolve({ statusCode: 201, response: response });
        });
      });
    }

    /**
       * @description sign up user via cognito
       * @param {STRING} email - email
       * @param {STRING} password - email
       * @returns {Object} returns response
       */

  }, {
    key: 'SignIn',
    value: function SignIn(email, password) {
      return new _promise2.default(function (resolve) {
        (0, _index.getCognitoUser)(email).authenticateUser((0, _index.getAuthDetails)(email, password), {
          onSuccess: function onSuccess(result) {
            var token = {
              accessToken: result.getAccessToken().getJwtToken(),
              idToken: result.getIdToken().getJwtToken(),
              refreshToken: result.getRefreshToken().getToken()
            };
            var response = (0, _index.decodeJWTToken)(token);
            return resolve({
              statusCode: 201,
              response: response
            });
          },
          onFailure: function onFailure(err) {
            return resolve({
              statusCode: 400,
              response: err.message || (0, _stringify2.default)(err)
            });
          }
        });
      });
    }

    /**
       * @description stores user token into dynamodb
       * @param {STRING} token - token
       * @returns {Object} returns response
       */

  }, {
    key: 'SaveRefreshToken',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(token) {
        var params;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                params = {
                  TableName: _dynamo.TOKEN_TABLE_NAME,
                  Item: {
                    id: token,
                    timestamp: new Date().getTime()
                  }
                };
                _context.next = 4;
                return _dynamo.dynamoClient.put(params).promise();

              case 4:
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', _context.t0);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function SaveRefreshToken(_x) {
        return _ref.apply(this, arguments);
      }

      return SaveRefreshToken;
    }()
  }]);
  return AuthService;
}();

exports.default = AuthService;