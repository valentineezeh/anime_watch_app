import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const {
  TABLE_NAME,
  TOKEN_TABLE_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_DB_REGION,
} = process.env;

AWS.config.update({
  region: AWS_DB_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

export {
  dynamoClient,
  TABLE_NAME,
  TOKEN_TABLE_NAME
};
