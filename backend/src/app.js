import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import errorhandler from 'errorhandler';
import expressValidator from 'express-validator';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import constructSwagger from './swagger';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

// Create global app Objects
const app = express();
// Set app to use cors
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,x-auth,Accept,content-type,application/json'
  );
  next();
});

// Normal express config defaults
app.use(logger('dev'));
app.use(helmet());
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use swagger-Ui-express for your app documentation endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(constructSwagger));

if (!isProduction) {
  app.use(errorhandler());
}

// fire routes
app.use(routes);

// catch every invalid route
app.use((req, res, next) => {
  const err = new Error('Not Found! Invalid Route');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace

if (!isProduction) {
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        status: err.status
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

export default app;
