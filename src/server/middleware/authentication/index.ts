import {Context, Next} from 'koa';

/**
 * Responsible for verifying the user's identity.
 * In a production system this would be a complex logic
 * like OAuth or an API key. For now, as this is a PoC
 * the user id is just a random uuid generated from an
 * online generator.
 */
export default async function execute(ctx: Context, next: Next): Promise<void> {
  const RANDOM_USER_ID = '9eb03f6b-4174-41d8-bea7-753952822e95';
  ctx.state.userId = RANDOM_USER_ID;
  return next();
}
