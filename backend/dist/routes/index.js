'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authRoutes = require('./apiRoutes/authRoutes');

var _authRoutes2 = _interopRequireDefault(_authRoutes);

var _crudRoutes = require('./apiRoutes/crudRoutes');

var _crudRoutes2 = _interopRequireDefault(_crudRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// fire up express router
var router = _express2.default.Router();

// welcome route
router.get('/', function (req, res) {
  res.status(200).json({
    message: 'Welcome to Valentine Training API.'
  });
});

router.use('/api', _authRoutes2.default);

router.use('/api', _crudRoutes2.default);

exports.default = router;