'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _crudService = require('../services/crudService');

var _crudService2 = _interopRequireDefault(_crudService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Crud controller class
 * @class CrudController
 */
var CrudController = function () {
  function CrudController() {
    (0, _classCallCheck3.default)(this, CrudController);
  }

  (0, _createClass3.default)(CrudController, null, [{
    key: 'GetAnimes',

    /**
         * @description get all anime controller
         * @param {Object} req - Http Request object
         * @param {Object} res - Http Request object
         * @returns {Object} returns response
         */
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var resp;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _crudService2.default.GetMethod();

              case 3:
                resp = _context.sent;
                return _context.abrupt('return', res.status(200).send({
                  data: resp
                }));

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', res.status(500).send({
                  error: { message: 'Internal server error' }
                }));

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function GetAnimes(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return GetAnimes;
    }()

    /**
       * @description get all anime controller
       * @param {Object} req - Http Request object
       * @param {Object} res - Http Request object
       * @returns {Object} returns response
       */

  }, {
    key: 'CreateAnime',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var sub, animeName, payload;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                sub = req.userData.sub;
                animeName = req.body.animeName;
                payload = {
                  id: sub,
                  animeName: animeName,
                  timestamp: new Date().getTime()
                };
                _context2.next = 6;
                return _crudService2.default.CreateMethod(payload);

              case 6:
                return _context2.abrupt('return', res.status(200).send({
                  message: 'Success! Resource created.'
                }));

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', res.status(500).send({
                  error: { message: 'Internal server error' }
                }));

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 9]]);
      }));

      function CreateAnime(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return CreateAnime;
    }()

    /**
       * @description get a single anime controller using userId
       * @param {Object} req - Http Request object
       * @param {Object} res - Http Request object
       * @returns {Object} returns response
       */

  }, {
    key: 'GetAnimeById',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var id, resp;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                id = req.params.id;
                _context3.next = 4;
                return _crudService2.default.GetByIdMethod(id);

              case 4:
                resp = _context3.sent;

                if (resp) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt('return', res.status(404).send({
                  error: { message: 'Resource not found' }
                }));

              case 7:
                return _context3.abrupt('return', res.status(200).send({
                  data: resp.Item
                }));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3['catch'](0);
                return _context3.abrupt('return', res.status(500).send({
                  error: { message: 'Internal server error' }
                }));

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 10]]);
      }));

      function GetAnimeById(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return GetAnimeById;
    }()

    /**
       * @description get a single anime controller using userId
       * @param {Object} req - Http Request object
       * @param {Object} res - Http Request object
       * @returns {Object} returns response
       */

  }, {
    key: 'DeleteAnimeById',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var id, sub, findAnime;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = req.params.id;
                sub = req.userData.sub;
                _context4.next = 5;
                return _crudService2.default.GetByIdMethod(sub);

              case 5:
                findAnime = _context4.sent;

                if (!((0, _keys2.default)(findAnime).length === 0)) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt('return', res.status(400).send({
                  error: { message: 'You are not authorize to delete this resource' }
                }));

              case 8:
                _context4.next = 10;
                return _crudService2.default.DeleteByIdMethod(id);

              case 10:
                return _context4.abrupt('return', res.status(200).send({
                  message: 'Resource successfully deleted'
                }));

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4['catch'](0);
                return _context4.abrupt('return', res.status(500).send({
                  error: { message: 'Internal server error' }
                }));

              case 16:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 13]]);
      }));

      function DeleteAnimeById(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return DeleteAnimeById;
    }()

    /**
       * @description get a single anime controller using userId
       * @param {Object} req - Http Request object
       * @param {Object} res - Http Request object
       * @returns {Object} returns response
       */

  }, {
    key: 'UpdateAnimeById',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var id, sub, animeName, findAnime, payload, resp;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                id = req.params.id;
                sub = req.userData.sub;
                animeName = req.body.animeName;
                _context5.next = 6;
                return _crudService2.default.GetByIdMethod(sub);

              case 6:
                findAnime = _context5.sent;

                if (!((0, _keys2.default)(findAnime).length === 0)) {
                  _context5.next = 9;
                  break;
                }

                return _context5.abrupt('return', res.status(400).send({
                  error: { message: 'You are not authorize to update this resource' }
                }));

              case 9:
                payload = {
                  id: id,
                  updateQuery: 'set animeName = :value',
                  updateValues: { ':value': animeName },
                  timestamp: new Date().getTime()
                };
                _context5.next = 12;
                return _crudService2.default.UpdateByIdMethod(payload);

              case 12:
                resp = _context5.sent;

                console.log('resp :>> ', resp);
                return _context5.abrupt('return', res.status(200).send({
                  message: 'Resource was successfully updated',
                  data: resp.UpdatedAttributes.Attributes
                }));

              case 17:
                _context5.prev = 17;
                _context5.t0 = _context5['catch'](0);

                console.log('error :>> ', _context5.t0);
                return _context5.abrupt('return', res.status(500).send({
                  error: { message: 'Internal server error' }
                }));

              case 21:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 17]]);
      }));

      function UpdateAnimeById(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return UpdateAnimeById;
    }()
  }]);
  return CrudController;
}();

exports.default = CrudController;