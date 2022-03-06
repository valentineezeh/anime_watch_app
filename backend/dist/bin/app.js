'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

// get the host and port name
var hostName = process.env.HOSTNAME || 'localhost';
var port = process.env.PORT || 3000;

// finally, let's start our server...
var server = _app2.default.listen(port, function () {
  // eslint-disable-next-line no-console
  _logger2.default.info('Listening on ' + hostName + ': ' + server.address().port);
});

// shutting down the app completely
process.on('SIGINT', function () {
  _logger2.default.info('Server shutting down');
  _logger2.default.info('Server shut down success');
  process.exit(0);
});