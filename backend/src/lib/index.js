/* eslint-disable camelcase */
import AWS from 'aws-sdk';
import jwt_decode from 'jwt-decode';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoRefreshToken,
} from 'amazon-cognito-identity-js';
import dotenv from 'dotenv';

dotenv.config();

const cognitoAttributeList = [];

const poolData = {
  UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  ClientId: process.env.AWS_COGNITO_CLIENT_ID
};

const attributes = (key, value) => ({
  Name: key,
  Value: value
});

const setCognitoAttributeList = (email, agent) => {
  const attributeList = [];
  attributeList.push(attributes('email', email));
  attributeList.forEach((element) => {
    cognitoAttributeList.push(new CognitoUserAttribute(element));
  });
};

const getCognitoAttributeList = () => cognitoAttributeList;

const getUserPool = () => new CognitoUserPool(poolData);

const getCognitoUser = (email) => {
  const userData = {
    Username: email,
    Pool: getUserPool()
  };
  return new CognitoUser(userData);
};

const getAuthDetails = (email, password) => {
  const authenticationData = {
    Username: email,
    Password: password,
  };
  return new AuthenticationDetails(authenticationData);
};

const initAWS = (
  region = process.env.AWS_COGNITO_REGION,
  identityPoolId = process.env.AWS_COGNITO_IDENTITY_POOL_ID
) => {
  AWS.config.region = region; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId,
  });
};

const decodeJWTToken = (token) => {
  const {
    email,
    exp,
    auth_time,
    token_use,
    sub
  } = jwt_decode(token.idToken);
  return {
    token, email, exp, uid: sub, auth_time, token_use
  };
};

const authRefreshToken = async (payload) => {
  const token = new CognitoRefreshToken({ RefreshToken: payload.refreshToken });
  const cognitoUser = getCognitoUser(payload.email);

  return new Promise((resolve, reject) => cognitoUser.refreshSession(token, (err, session) => {
    if (err) {
      return err;
    }
    const idToken = session.getIdToken().getJwtToken();
    const accessToken = session.getAccessToken().getJwtToken();
    const refreshToken = session.getRefreshToken().getToken();

    const data = {
      idToken,
      accessToken,
      refreshToken
    };
    resolve(data);
  }));
};

export {
  initAWS,
  getCognitoAttributeList,
  getUserPool,
  getCognitoUser,
  setCognitoAttributeList,
  getAuthDetails,
  decodeJWTToken,
  authRefreshToken,
};
