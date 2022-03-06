'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _errorhandler = require('errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var isProduction = process.env.NODE_ENV === 'production';

// Create global app Objects
var app = (0, _express2.default)();
// Set app to use cors
app.use((0, _cors2.default)());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,x-auth,Accept,content-type,application/json');
  next();
});

// Normal express config defaults
app.use((0, _morgan2.default)('dev'));
app.use((0, _helmet2.default)());
app.use((0, _expressValidator2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

if (!isProduction) {
  app.use((0, _errorhandler2.default)());
}

// fire routes
app.use(_routes2.default);

// catch every invalid route
app.use(function (req, res, next) {
  var err = new Error('Not Found! Invalid Route');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace

if (!isProduction) {
  // eslint-disable-next-line no-unused-vars
  app.use(function (err, req, res, next) {
    // eslint-disable-next-line no-console
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        status: err.status
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

exports.default = app;