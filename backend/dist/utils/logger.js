'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-shadow */
_dotenv2.default.config();

var CONSOLE_DATE_FORMAT = 'HH:mm:ss.SSS';

/**
 * Factory method to create a logger with the parameters provided
 * @param {string} label Log label
 * @param {string} level Log level e.g info, debug, warn
 * @param {string} filename Filename to write logs
 * @returns {winston.Logger} Logger
 */
var createLogger = function createLogger() {
  var label = process.env.LOG_LABEL;
  var level = process.env.LOG_LEVEL;
  var filename = process.env.LOG_FILE;
  var logger = _winston2.default.createLogger({ level: level });

  // Console transport for display messages in the terminal
  logger.add(new _winston2.default.transports.Console({
    format: _winston2.default.format.combine(_winston2.default.format.colorize(), _winston2.default.format.label({ label: label }), _winston2.default.format.timestamp({ format: CONSOLE_DATE_FORMAT }), _winston2.default.format.splat(), _winston2.default.format.printf(function (_ref) {
      var level = _ref.level,
          message = _ref.message,
          label = _ref.label,
          timestamp = _ref.timestamp;
      return timestamp + ' [' + label + '] ' + level + ': ' + message;
    }))
  }));

  // If a filename is specified, create a file logger
  if (typeof filename === 'string' && filename.length) {
    logger.add(new _winston2.default.transports.File({
      filename: filename,
      format: _winston2.default.format.combine(_winston2.default.format.label({ label: label }), _winston2.default.format.timestamp(), _winston2.default.format.splat(), _winston2.default.format.uncolorize(), _winston2.default.format.json())
    }));
  }

  return logger;
};

var logger = createLogger();

exports.default = logger;