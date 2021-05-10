import './env';
import {logger} from '../logger';

const port = process.env.API_PORT || 3000;

/**
 * Releases the system resources that have been allocated by midas
 *
 * @name support/releaseResources
 * @return promise that resolves after resources have been released
 */
export async function releaseResources(): Promise<void> {
  logger.info('Closing application...');
  process.exit(1);
}

async function handlePortPrivilegesError(error: NodeJS.ErrnoException): Promise<void> {
  logger.fatal(`Port ${port} requires elevated privileges`, error);
  await releaseResources();
}

async function handlePortInUseError(error: NodeJS.ErrnoException): Promise<void> {
  logger.fatal(`Port ${port} is already in use`, error);
  await releaseResources();
}

/**
 * Handles an error that has been thrown either by the app or the operating system
 *
 * @name support/handleError
 * @param error - the exception that has been thrown
 * @return promise that resolves after the error has been handled
 */
export async function handleError(error: NodeJS.ErrnoException): Promise<void> {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      await handlePortPrivilegesError(error);
      break;
    case 'EADDRINUSE':
      await handlePortInUseError(error);
      break;
    default:
      throw error;
  }
}

/**
 * Handles a termination signal send by the operating system
 * The application releases resources and exits
 *
 * @name support/handleTerminationSignal
 * @param signal - the signal that has been send by the OS
 * @return promise that resolves after the signal has been handled
 */
export async function handleTerminationSignal(signal: NodeJS.Signals): Promise<void> {
  logger.info('Received %s - terminating process...', signal);
  await releaseResources();
}
