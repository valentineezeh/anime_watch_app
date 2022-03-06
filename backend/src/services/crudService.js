import { dynamoClient, TABLE_NAME } from '../lib/dynamo';

// helper function to get all records bypassing the limit set by dynamodb
const scanDynamoRecords = async (scanParams, itemArray) => {
  try {
    const dynamoData = await dynamoClient.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartKey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch (error) {
    throw new Error(error);
  }
};

/**
     * @description Crud service
     * @class CrudService
     */
export default class CrudService {
  /**
     * @description Get method
     * @returns {Object} returns response
     */
  static async GetMethod() {
    const params = {
      TableName: TABLE_NAME
    };
    const response = await scanDynamoRecords(params, []);
    return response;
  }

  /**
     * @description create method
     * @param {Object} payload - payload object
     * @returns {Object} returns response
     */
  static async CreateMethod(payload) {
    const params = {
      TableName: TABLE_NAME,
      Item: payload
    };
    const response = await dynamoClient.put(params).promise();
    return response;
  }

  /**
     * @description get a single document by ID
     * @param {String} id - id
     * @returns {Object} returns response
     */
  static async GetByIdMethod(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id }
    };
    const response = await dynamoClient.get(params).promise();
    return response;
  }

  /**
     * @description delete a single document by ID
     * @param {String} id - id
     * @returns {Object} returns response
     */
  static async DeleteByIdMethod(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id }
    };
    const response = await dynamoClient.delete(params).promise();
    return response;
  }

  /**
     * @description delete a single document by ID
     * @param {Object} payload - payload
     * @returns {Object} returns response
     */
  static async UpdateByIdMethod(payload) {
    const {
      id,
      updateQuery,
      updateValues
    } = payload;
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: updateQuery,
      ExpressionAttributeValues: updateValues,
      ReturnValues: 'UPDATED_NEW',
    };
    const response = await dynamoClient.update(params).promise().then((resp) => {
      const body = {
        UpdatedAttributes: resp
      };
      return body;
    });
    return response;
  }

  /**
     * @description search the table using the secondary index
     * @param {Object} payload - payload
     * @returns {Object} returns response
     */
  static async SearchAndQuery(payload) {
    const {
      searchQuery
    } = payload;
    const params = {
      TableName: TABLE_NAME,
      IndexName: 'genre-timestamp-index',
      KeyConditionExpression: 'genre= :genre',
      ExpressionAttributeValues: {
        ':genre': searchQuery
      }
    };
    const response = await dynamoClient.query(params).promise();
    return response;
  }
}
