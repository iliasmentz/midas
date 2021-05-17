import Boom from 'boom';
import {logger} from '../../logger';
import {Context, Next} from 'koa';

export default async function errorHandler(ctx: Context, next: Next): Promise<void> {
  try {
    await next();
  } catch (err) {
    // convert err to boom instance
    const statusCode = err.statusCode || err.status;
    const boom = Boom.boomify(err, {statusCode, override: false});

    ctx.response.status = boom.output.statusCode;
    ctx.response.set(boom.output.headers);
    ctx.response.body = boom.output.payload;

    // print unknown error stack to stderr
    if (boom.isServer) {
      logger.error(boom.stack ? (boom.stack as string) : boom.message);
    }
  }
}
