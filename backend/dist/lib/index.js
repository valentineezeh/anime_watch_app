'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeJWTToken = exports.getAuthDetails = exports.setCognitoAttributeList = exports.getCognitoUser = exports.getUserPool = exports.getCognitoAttributeList = exports.initAWS = undefined;

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _amazonCognitoIdentityJs = require('amazon-cognito-identity-js');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
_dotenv2.default.config();

var cognitoAttributeList = [];

var poolData = {
  UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  ClientId: process.env.AWS_COGNITO_CLIENT_ID
};

var attributes = function attributes(key, value) {
  return {
    Name: key,
    Value: value
  };
};

var setCognitoAttributeList = function setCognitoAttributeList(email, agent) {
  var attributeList = [];
  attributeList.push(attributes('email', email));
  attributeList.forEach(function (element) {
    cognitoAttributeList.push(new _amazonCognitoIdentityJs.CognitoUserAttribute(element));
  });
};

var getCognitoAttributeList = function getCognitoAttributeList() {
  return cognitoAttributeList;
};

var getUserPool = function getUserPool() {
  return new _amazonCognitoIdentityJs.CognitoUserPool(poolData);
};

var getCognitoUser = function getCognitoUser(email) {
  var userData = {
    Username: email,
    Pool: getUserPool()
  };
  return new _amazonCognitoIdentityJs.CognitoUser(userData);
};

var getAuthDetails = function getAuthDetails(email, password) {
  var authenticationData = {
    Username: email,
    Password: password
  };
  return new _amazonCognitoIdentityJs.AuthenticationDetails(authenticationData);
};

var initAWS = function initAWS() {
  var region = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.env.AWS_COGNITO_REGION;
  var identityPoolId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.env.AWS_COGNITO_IDENTITY_POOL_ID;

  _awsSdk2.default.config.region = region; // Region
  _awsSdk2.default.config.credentials = new _awsSdk2.default.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId
  });
};

var decodeJWTToken = function decodeJWTToken(token) {
  var _jwt_decode = (0, _jwtDecode2.default)(token.idToken),
      email = _jwt_decode.email,
      exp = _jwt_decode.exp,
      auth_time = _jwt_decode.auth_time,
      token_use = _jwt_decode.token_use,
      sub = _jwt_decode.sub;

  return {
    token: token, email: email, exp: exp, uid: sub, auth_time: auth_time, token_use: token_use
  };
};

exports.initAWS = initAWS;
exports.getCognitoAttributeList = getCognitoAttributeList;
exports.getUserPool = getUserPool;
exports.getCognitoUser = getCognitoUser;
exports.setCognitoAttributeList = setCognitoAttributeList;
exports.getAuthDetails = getAuthDetails;
exports.decodeJWTToken = decodeJWTToken;