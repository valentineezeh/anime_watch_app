import AuthService from '../services/authService';
import { authRefreshToken, decodeJWTToken } from '../lib/index';

/**
 * @description Auth controller class
 * @class AuthController
 */
export default class AuthController {
/**
     * @description sign up user via cognito controller
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns response
     */
  static async SignUp(req, res) {
    const { email, password } = req.body;
    const resp = await AuthService.SignUp(email, password);
    if (resp.statusCode === 422) {
      return res.status(422).send({
        error: { message: resp.response }
      });
    }
    return res.status(resp.statusCode).send(resp.response);
  }

  /**
     * @description sign in user via cognito controller
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns response
     */
  static async SignIn(req, res) {
    const { email, password } = req.body;
    const resp = await AuthService.SignIn(email, password);
    if (resp.statusCode === 400) {
      return res.status(resp.statusCode).send({
        error: {
          message: resp.response
        }
      });
    }
    const { refreshToken } = resp.response.token;
    await AuthService.SaveRefreshToken(refreshToken);
    return res.status(resp.statusCode).send(resp.response);
  }

  /**
     * @description get new id token from the refresh token
     * @param {Object} req - Http Request object
     * @param {Object} res - Http Request object
     * @returns {Object} returns response
     */
  static async GetNewToken(req, res) {
    try {
      // get user email from the req body
      const { refreshToken, idToken } = req.body;

      const { email } = decodeJWTToken({ idToken });

      // find refresh token in the db
      const findRefreshToken = await AuthService.FindRefreshToken(refreshToken);

      // findRefreshToken.Item.id
      // check if refresh token exist
      if (Object.keys(findRefreshToken).length === 0) {
        return res.status(401).send({
          error: {
            message: 'Kindly Login'
          }
        });
      }

      // construct payload
      const payload = { refreshToken, email };

      // get new access token
      const response = await authRefreshToken(payload);
      return res.status(200).send({
        token: response,
        message: 'Your new access token is ready'
      });
    } catch (error) {
      return res.status(500).send({
        error: { message: 'Internal server error ' }
      });
    }
  }
}
