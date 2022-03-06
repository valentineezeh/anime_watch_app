'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _cognitoExpress = require('cognito-express');

var _cognitoExpress2 = _interopRequireDefault(_cognitoExpress);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _dynamo = require('../lib/dynamo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var verifyToken = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
    var _process$env, AWS_COGNITO_REGION, AWS_COGNITO_USER_POOL_ID, TOKEN_EXPIRATION, cognitoExpress, bearerHeader, params, findUserToken;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _process$env = process.env, AWS_COGNITO_REGION = _process$env.AWS_COGNITO_REGION, AWS_COGNITO_USER_POOL_ID = _process$env.AWS_COGNITO_USER_POOL_ID, TOKEN_EXPIRATION = _process$env.TOKEN_EXPIRATION;
            // Initializing CognitoExpress constructor

            cognitoExpress = new _cognitoExpress2.default({
              region: AWS_COGNITO_REGION,
              cognitoUserPoolId: AWS_COGNITO_USER_POOL_ID,
              tokenUse: 'id', // Possible Values: access | id
              tokenExpiration: TOKEN_EXPIRATION // Up to default expiration of (3600000000 ms)
            });
            bearerHeader = req.headers['user-key'];

            if (bearerHeader) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', res.status(401).send({
              error: {
                message: 'Authorization code is empty.'
              }
            }));

          case 6:
            // construct params payload
            params = {
              TableName: _dynamo.TOKEN_TABLE_NAME,
              Key: { id: bearerHeader }
            };
            _context.next = 9;
            return _dynamo.dynamoClient.get(params).promise();

          case 9:
            findUserToken = _context.sent;

            if (findUserToken) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return', res.status(401).send({
              error: {
                message: 'Unauthorized Access'
              }
            }));

          case 12:
            // validate token using cognito express
            cognitoExpress.validate(bearerHeader, function (err, response) {
              // If API is not authenticated, Return 401 with error message.
              if (err) return res.status(401).send(err);

              // Else API has been authenticated. Proceed.
              req.userData = response;
              next();
            });
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', res.status(500).send({
              error: {
                message: 'Something went wrong'
              }
            }));

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 15]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = verifyToken;