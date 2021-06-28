import {Context} from 'koa';
import {processSale} from '../../sales';
import validate from './validator';
import {ValidationError} from '../error';

export async function handleSaleRequest(ctx: Context): Promise<void> {
  const saleDetails = ctx.request.body;
  const valid = validate(saleDetails);
  if (!valid) {
    throw new ValidationError(validate.errors ?? []);
  }
  ctx.response.body = {status: await processSale(ctx.state.userId, saleDetails)};
}
