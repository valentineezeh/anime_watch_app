import {
  TOKEN_TABLE_NAME,
  dynamoClient
} from '../lib/dynamo';
import {
  initAWS,
  getCognitoAttributeList,
  getUserPool,
  getCognitoUser,
  setCognitoAttributeList,
  getAuthDetails,
  decodeJWTToken,
} from '../lib/index';

/**
 * @description Auth service class
 * @class AuthService
 */
export default class AuthService {
  /**
     * @description sign up user via cognito
     * @param {STRING} email - email
     * @param {STRING} password - email
     * @returns {Object} returns response
     */
  static SignUp(email, password) {
    return new Promise((resolve) => {
      initAWS();
      setCognitoAttributeList();
      getUserPool().signUp(email, password, getCognitoAttributeList(), null, (err, result) => {
        if (err) return resolve({ statusCode: 422, response: err.message });
        const response = {
          username: result.user.username,
          userConfirmed: result.userConfirmed,
        };
        return resolve({ statusCode: 201, response });
      });
    });
  }

  /**
     * @description sign up user via cognito
     * @param {STRING} email - email
     * @param {STRING} password - email
     * @returns {Object} returns response
     */
  static SignIn(email, password) {
    return new Promise((resolve) => {
      getCognitoUser(email).authenticateUser(getAuthDetails(email, password), {
        onSuccess: (result) => {
          const token = {
            accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          };
          const response = decodeJWTToken(token);
          return resolve({
            statusCode: 201,
            response
          });
        },
        onFailure: (err) => resolve({
          statusCode: 400,
          response: err.message || JSON.stringify(err)
        })
      });
    });
  }

  /**
     * @description stores user token into dynamodb
     * @param {STRING} token - token
     * @returns {Object} returns response
     */
  static async SaveRefreshToken(token) {
    try {
      const params = {
        TableName: TOKEN_TABLE_NAME,
        Item: {
          id: token,
          timestamp: new Date().getTime()
        }
      };
      return await dynamoClient.put(params).promise();
    } catch (error) {
      return error;
    }
  }

  /**
     * @description stores user token into dynamodb
     * @param {STRING} token - token
     * @returns {Object} returns response
     */
  static async FindRefreshToken(token) {
    const params = {
      TableName: TOKEN_TABLE_NAME,
      Key: { id: token }
    };
    const resp = await dynamoClient.get(params).promise();
    return resp;
  }
}
