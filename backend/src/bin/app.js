import dotenv from 'dotenv';
import app from '../app';
import logger from '../utils/logger';

dotenv.config();

// get the host and port name
const hostName = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 4000;

// finally, let's start our server...
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  logger.info(`Listening on ${hostName}: ${server.address().port}`);
});

// shutting down the app completely
process.on('SIGINT', () => {
  logger.info('Server shutting down');
  logger.info('Server shut down success');
  process.exit(0);
});
