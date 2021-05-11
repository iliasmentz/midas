import {logger} from './logger';
import {handleError, handleTerminationSignal} from './support/processHandlers';
import createServer from './server';
import connection from '../db/connection';
import 'reflect-metadata';

const port = process.env.API_PORT || 3000;

// HTTP server
connection
  .then(async (connection) => {
    const server = createServer();
    server.listen(port);

    server.on('error', handleError);
    server.on('listening', () => {
      logger.info(`Server listening at http://127.0.0.1:${port}`);
    });

    // Process termination
    const signalsArray: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
    signalsArray.forEach((signal) => {
      process.once(signal, handleTerminationSignal);
    });

    process.on('exit', () => {
      connection.close();
      logger.info('Process terminated');
    });
  })
  .catch((error) => {
    logger.error(`DB connection error: ${error}`);
  });
