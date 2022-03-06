import dotenv from 'dotenv';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';

dotenv.config();

const {
  AWS_COGNITO_REGION,
  AWS_COGNITO_USER_POOL_ID,
} = process.env;

const pems = {};

const fetchPems = async () => {
  try {
    const fetchKeys = await global.fetch(`https://cognito-idp.${AWS_COGNITO_REGION}.amazonaws.com/${AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`);

    const { keys } = await fetchKeys.json();
    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys) {
      pems[[key.kid]] = jwkToPem({
        kty: key.kty,
        n: key.n,
        e: key.e,
      });
    }
  } catch (error) {
    return error;
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['user-key'];

    if (!bearerHeader) {
      return res.status(401).send({
        error: {
          message: 'Authorization code is empty.'
        }
      });
    }

    const decodeJwt = jwt.decode(bearerHeader, { complete: true });
    if (!decodeJwt) {
      return res.status(401).send({
        error: {
          message: 'Unauthorized Access'
        }
      });
    }

    const { kid } = decodeJwt.header;
    await fetchPems();
    const pem = pems[kid];

    if (!pem) {
      return res.status(401).send({
        error: {
          message: 'Unauthorize Access'
        }
      });
    }

    jwt.verify(bearerHeader, pem, (err, data) => {
      if (err) {
        return res.status(401).send({
          error: { message: 'Unauthorized Access' }
        });
      }
      req.userData = data;
      next();
    });
  } catch (error) {
    return res.status(500).send({
      error: {
        message: 'Something went wrong'
      }
    });
  }
};

export default verifyToken;
