'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _dynamo = require('../lib/dynamo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// helper function to get all records bypassing the limit set by dynamodb
var scanDynamoRecords = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(scanParams, itemArray) {
    var dynamoData;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _dynamo.dynamoClient.scan(scanParams).promise();

          case 3:
            dynamoData = _context.sent;

            itemArray = itemArray.concat(dynamoData.Items);

            if (!dynamoData.LastEvaluatedKey) {
              _context.next = 10;
              break;
            }

            scanParams.ExclusiveStartKey = dynamoData.LastEvaluatedKey;
            _context.next = 9;
            return scanDynamoRecords(scanParams, itemArray);

          case 9:
            return _context.abrupt('return', _context.sent);

          case 10:
            return _context.abrupt('return', itemArray);

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](0);
            throw new Error(_context.t0);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 13]]);
  }));

  return function scanDynamoRecords(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
     * @description Crud service
     * @class CrudService
     */

var CrudService = function () {
  function CrudService() {
    (0, _classCallCheck3.default)(this, CrudService);
  }

  (0, _createClass3.default)(CrudService, null, [{
    key: 'GetMethod',

    /**
       * @description Get method
       * @returns {Object} returns response
       */
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var params, response;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = {
                  TableName: _dynamo.TABLE_NAME
                };
                _context2.next = 3;
                return scanDynamoRecords(params, []);

              case 3:
                response = _context2.sent;
                return _context2.abrupt('return', response);

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function GetMethod() {
        return _ref2.apply(this, arguments);
      }

      return GetMethod;
    }()

    /**
       * @description create method
       * @param {Object} payload - payload object
       * @returns {Object} returns response
       */

  }, {
    key: 'CreateMethod',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(payload) {
        var params, response;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = {
                  TableName: _dynamo.TABLE_NAME,
                  Item: payload
                };
                _context3.next = 3;
                return _dynamo.dynamoClient.put(params).promise();

              case 3:
                response = _context3.sent;
                return _context3.abrupt('return', response);

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function CreateMethod(_x3) {
        return _ref3.apply(this, arguments);
      }

      return CreateMethod;
    }()

    /**
       * @description get a single document by ID
       * @param {String} id - id
       * @returns {Object} returns response
       */

  }, {
    key: 'GetByIdMethod',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id) {
        var params, response;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = {
                  TableName: _dynamo.TABLE_NAME,
                  Key: { id: id }
                };
                _context4.next = 3;
                return _dynamo.dynamoClient.get(params).promise();

              case 3:
                response = _context4.sent;
                return _context4.abrupt('return', response);

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function GetByIdMethod(_x4) {
        return _ref4.apply(this, arguments);
      }

      return GetByIdMethod;
    }()

    /**
       * @description delete a single document by ID
       * @param {String} id - id
       * @returns {Object} returns response
       */

  }, {
    key: 'DeleteByIdMethod',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(id) {
        var params, response;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = {
                  TableName: _dynamo.TABLE_NAME,
                  Key: { id: id }
                };
                _context5.next = 3;
                return _dynamo.dynamoClient.delete(params).promise();

              case 3:
                response = _context5.sent;
                return _context5.abrupt('return', response);

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function DeleteByIdMethod(_x5) {
        return _ref5.apply(this, arguments);
      }

      return DeleteByIdMethod;
    }()

    /**
       * @description delete a single document by ID
       * @param {Object} payload - payload
       * @returns {Object} returns response
       */

  }, {
    key: 'UpdateByIdMethod',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(payload) {
        var id, updateQuery, updateValues, params, response;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                id = payload.id, updateQuery = payload.updateQuery, updateValues = payload.updateValues;
                params = {
                  TableName: _dynamo.TABLE_NAME,
                  Key: { id: id },
                  UpdateExpression: updateQuery,
                  ExpressionAttributeValues: updateValues,
                  ReturnValues: 'UPDATED_NEW'
                };
                _context6.next = 4;
                return _dynamo.dynamoClient.update(params).promise().then(function (resp) {
                  var body = {
                    UpdatedAttributes: resp
                  };
                  return body;
                });

              case 4:
                response = _context6.sent;
                return _context6.abrupt('return', response);

              case 6:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function UpdateByIdMethod(_x6) {
        return _ref6.apply(this, arguments);
      }

      return UpdateByIdMethod;
    }()
  }]);
  return CrudService;
}();

exports.default = CrudService;