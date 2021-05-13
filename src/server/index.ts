import Koa from 'koa';
import http, {Server} from 'http';
import bodyParser from 'koa-bodyparser';
import pino from 'koa-pino-logger';
import Boom from 'boom';
import errorHandler from './middleware/errorHandler';
import health from './health';
import authenticationMiddleware from './middleware/authentication';
import {logger} from '../logger';

export default function createServer(): Server {
  const app = new Koa();

  // disable logging of health endpoint by registering it before logger
  app.use(health.routes()).use(health.allowedMethods());

  // setup logging
  app.use(pino({logger: logger}));

  // handle errors
  app.use(errorHandler);

  // verify user's identity and set the id in the context
  app.use(authenticationMiddleware);

  // parse application/json
  app.use(
    bodyParser({
      enableTypes: ['json'],
      onerror: (err: Error) => {
        throw Boom.badRequest(err.message);
      },
    })
  );

  return http.createServer(app.callback());
}
