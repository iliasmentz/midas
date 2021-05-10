import {Context} from 'koa';

/**
 * here we should assert that everything
 * inside the app is work as expected.
 *
 * @param ctx
 */
export default async function handle(ctx: Context): Promise<void> {
  const {response} = ctx;
  response.status = 200;
  response.body = 'OK';
}
