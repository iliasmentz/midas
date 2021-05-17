import {Payment, PaymentProcessor, PaymentRequest, PaymentStatus, Processors} from '../model';
import {logger} from '../../../../logger';
import {StripeHttpClient, StripeRequest, StripeResponse} from './httpClient';
import {ProcessorError} from '../error';
import {AppError} from '../../../../common/error';

interface TokenRequest extends StripeRequest {
  'card[number]': string;
  'card[exp_month]': number;
  'card[exp_year]': number;
  'card[cvc]': number;
}

interface ChargeRequest extends StripeRequest {
  amount: number;
  currency: string;
  source: string;
  description: string;
  receipt_email: string | undefined;
}

class Stripe implements PaymentProcessor {
  name = Processors.STRIPE;

  async createSale(request: PaymentRequest): Promise<Payment> {
    let response;

    try {
      logger.debug(`Generating one-off token on stripe`);
      const token = await Stripe.createToken(request);

      logger.debug(`One-off token generated on stripe, initiating charge`);
      response = await Stripe.createCharge(token, request);

      logger.info(`Stripe charge completed with id=${response.data.id}`);
    } catch (e) {
      Stripe.handleError(e);
    }

    return {
      id: response?.data.id,
      status: Stripe.mapStatus(response),
    };
  }

  private static handleError(e: any): never {
    if (this.isServer(e)) {
      throw new ProcessorError('service_unavailable', 'Stripe unavailable.', 503);
    }

    const error = e.response.data.error;
    logger.warn(e, `Stripe charge request failed with type e=${error.type}`);
    throw new ProcessorError(error.type, error.message, e.response.status);
  }

  private static isServer(e: any): boolean {
    return e.response.status >= 500;
  }

  private static mapStatus(response: StripeResponse | undefined): PaymentStatus {
    switch (response?.data.status) {
      case 'succeeded':
        return 'SUCCEEDED';
      case 'pending':
        return 'PENDING';
      case 'failed':
        return 'FAILED';
    }
    throw new AppError(
      'unknown_processor_value',
      'Stripe integration error, our apologies',
      500,
      {value: response?.data.status},
      false
    );
  }

  private static async createToken(request: PaymentRequest): Promise<string> {
    const client = new StripeHttpClient();
    const response = await client.post('v1/tokens', Stripe.tokenRequest(request));
    return response.data.id;
  }

  private static tokenRequest(request: PaymentRequest): TokenRequest {
    return {
      'card[number]': request.number,
      'card[exp_month]': request.expirationMonth,
      'card[exp_year]': request.expirationYear,
      'card[cvc]': request.cvc,
    };
  }

  private static async createCharge(
    token: string,
    request: PaymentRequest
  ): Promise<StripeResponse> {
    const client = new StripeHttpClient();
    return await client.post('v1/charges', Stripe.chargeRequest(token, request));
  }

  private static chargeRequest(token: string, request: PaymentRequest): ChargeRequest {
    return {
      amount: this.amountInCents(request),
      currency: request.currency,
      source: token,
      description: request.description,
      receipt_email: request.email,
    };
  }

  private static amountInCents(request: PaymentRequest): number {
    return request.amount * 100;
  }
}

export default Stripe;
