import {Context} from 'koa';
import {tokenizeCard} from '../../cards';
import {ValidationError} from '../error';
import validate from './validator';

export async function handleCardTokenization(ctx: Context): Promise<void> {
  const cardDetails = ctx.request.body;
  const valid = validate(cardDetails);
  if (!valid) {
    throw new ValidationError(validate.errors ?? []);
  }
  ctx.response.body = await tokenizeCard(ctx.state.userId, cardDetails);
}
