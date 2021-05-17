import Stripe from './stripe';
import {PaymentProcessor} from './model';
import {AppError} from '../../../common/error';

const PAYMENT_PROCESSORS = [new Stripe()];

function get(name: string): PaymentProcessor {
  const processor = PAYMENT_PROCESSORS.find((processor) => processor.name == name);

  if (!processor) {
    throw new AppError('unknown_processor', 'Please provide a valid processor', 422, {
      processor: name,
    });
  }
  return processor;
}

export default get;
