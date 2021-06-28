import {Card} from '../cards/entity';
import apiClient from './helpers/apiClient';
import {nanoid} from 'nanoid';
import {AxiosResponse} from 'axios';
import {validCardDetails} from './helpers/card';
import StripeMockServer, {
  cardTokenWillSucceed,
  chargeWillFail,
  chargeWillSucceed,
  STRIPE_ERRORS,
} from './helpers/stripe';
import {SaleRequest} from '../sales';
import {generateSaleRequest} from './helpers/sale';
import {Sale} from '../sales/entity';

describe('sales api', () => {
  const server = StripeMockServer;

  beforeAll(async (done) => {
    await server.start(done);
  });

  afterAll(async (done) => {
    await server.stop(done);
  });

  it('should create a sale with a given card token using stripe', async (done) => {
    // given
    const token = await anExistingToken();
    const saleRequest = generateSaleRequest(token);
    cardTokenWillSucceed(server);
    chargeWillSucceed(server);

    // when
    const response = await execute(saleRequest);

    // then
    expect(response.status).toBe(200);
    expect(response.data.status).toBe('SUCCEEDED');

    // cleanup
    await Card.delete({token: token});
    await Sale.delete({token: token});
    done();
  });

  it('should throw a payment required error for insufficient funds', async (done) => {
    // given
    const token = await anExistingToken();
    const saleRequest = generateSaleRequest(token);
    cardTokenWillSucceed(server);
    chargeWillFail(server, 402, STRIPE_ERRORS.INSUFFICIENT_FUNDS);

    // when
    const response = await execute(saleRequest).catch((e) => {
      return e.response;
    });

    // then
    expect(response.status).toBe(402);
    expect(response.data.statusCode).toBe(402);
    expect(response.data.error).toBe('Payment Required');
    expect(response.data.message).toBe('Your card has insufficient funds.');

    // cleanup
    await Card.delete({token: token});
    done();
  });

  it('should throw a payment required error for incorrect card number', async (done) => {
    // given
    const token = await anExistingToken();
    const saleRequest = generateSaleRequest(token);
    cardTokenWillSucceed(server);
    chargeWillFail(server, 402, STRIPE_ERRORS.INCORRECT_NUMBER);

    // when

    const response = await execute(saleRequest).catch((e) => {
      return e.response;
    });

    // then
    expect(response.status).toBe(402);
    expect(response.data.statusCode).toBe(402);
    expect(response.data.error).toBe('Payment Required');
    expect(response.data.message).toBe('Your card number is incorrect.');

    // cleanup
    await Card.delete({token: token});
    done();
  });

  it('should throw a service unavailable error when stripe returns a server error', async (done) => {
    // given
    const token = await anExistingToken();
    const saleRequest = generateSaleRequest(token);
    cardTokenWillSucceed(server);
    chargeWillFail(server, 500, {});

    // whens
    const response = await execute(saleRequest).catch((e) => {
      return e.response;
    });

    // then
    expect(response.status).toBe(503);
    expect(response.data.statusCode).toBe(503);
    expect(response.data.error).toBe('Service Unavailable');
    expect(response.data.message).toBe('Stripe unavailable.');

    // cleanup
    await Card.delete({token: token});
    done();
  });

  it('should throw a not found error for an invalid token', async (done) => {
    // given
    const token = nanoid();
    const saleRequest = generateSaleRequest(token);

    // when
    const response = await execute(saleRequest).catch((e) => {
      return e.response;
    });

    // then
    expect(response.status).toBe(401);
    expect(response.data.statusCode).toBe(401);
    expect(response.data.error).toBe('Unauthorized');
    expect(response.data.message).toBe('Please provide a valid token.');

    // cleanup
    done();
  });

  it('should throw a validation error for a non supported provider', async () => {
    const token = nanoid();
    const saleRequest = generateSaleRequest(token);
    saleRequest.processor = 'paypal';

    // when
    const response = await execute(saleRequest).catch((e) => {
      return e.response;
    });

    // then
    expect(response.status).toBe(422);
    expect(response.data.statusCode).toBe(422);
    expect(response.data.error).toBe('Unprocessable Entity');
    expect(response.data.message).toBe('should be equal to one of the allowed values');
  });

  async function execute(saleDetails: SaleRequest): Promise<AxiosResponse> {
    return await apiClient.post('/sales', saleDetails, {
      headers: {
        'Idempotency-Key': nanoid(),
      },
    });
  }
});

async function anExistingToken(): Promise<string> {
  const response = await apiClient.post(`/cards/tokenize`, validCardDetails());
  return response.data.token;
}
