'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TOKEN_TABLE_NAME = exports.TABLE_NAME = exports.dynamoClient = undefined;

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var _process$env = process.env,
    TABLE_NAME = _process$env.TABLE_NAME,
    TOKEN_TABLE_NAME = _process$env.TOKEN_TABLE_NAME,
    AWS_COGNITO_REGION = _process$env.AWS_COGNITO_REGION,
    AWS_ACCESS_KEY_ID = _process$env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY = _process$env.AWS_SECRET_ACCESS_KEY;


_awsSdk2.default.config.update({
  region: AWS_COGNITO_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

var dynamoClient = new _awsSdk2.default.DynamoDB.DocumentClient();

exports.dynamoClient = dynamoClient;
exports.TABLE_NAME = TABLE_NAME;
exports.TOKEN_TABLE_NAME = TOKEN_TABLE_NAME;