import swaggerJSDoc from 'swagger-jsdoc';

// Swagger definition
const swaggerDefinition = {
  info: {
    title: 'REST API for Anime',
    version: '1.0.0',
    description: 'This is the REST API for Anime',
  },
  // host: 'valentine-training-api-dev.us-west-2.elasticbeanstalk.com',
  // basePath: '/api',
};

const options = {
  swaggerDefinition,
  apis: [`${__dirname}/utils/swagger.yaml`],
};

const constructSwagger = swaggerJSDoc(options);

export default constructSwagger;
