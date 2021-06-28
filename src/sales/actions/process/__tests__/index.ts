import gateways from '../../../gateways';
import {Card} from '../../../../cards/entity';
import process from '../index';
import {uuid} from 'uuidv4';
import {nanoid} from 'nanoid';
import Clock from '../../../../common/clock';
import {generateSaleRequest} from '../../../../__functionaltests__/helpers/sale';
import Stripe from '../../processors/stripe';
import {Sale} from '../../../entity';

describe('process sale', () => {
  let userId: string;
  let token: string;
  let fetchCard: jest.SpyInstance;
  let card: Card;

  beforeEach(() => {
    userId = uuid();
    token = nanoid();
    card = aCard();
    fetchCard = mockFetchCard();
    mockProcessor();
    mockCreateCard();
    mockSave();
  });

  it('should fetch the card with the given token', async () => {
    // given
    const saleRequest = generateSaleRequest(token);

    // when
    await process(userId, saleRequest);

    // then
    expect(fetchCard).toBeCalledWith(token);
  });

  it('should execute the sale with the given processor', async () => {
    // given
    const saleRequest = generateSaleRequest(token);
    mockProcessor();
    // when
    await process(userId, saleRequest);

    // then
    expect(Stripe.prototype.createSale).toBeCalledWith({...card, ...saleRequest});
  });

  it('should save a new sale', async () => {
    // given
    const saleRequest = generateSaleRequest(token);
    mockProcessor();
    // when
    await process(userId, saleRequest);

    // then
    expect(Sale.create).toBeCalled();
  });

  function mockFetchCard(): jest.SpyInstance {
    return jest.spyOn(gateways, 'fetchCardByToken').mockResolvedValue(card);
  }

  function mockProcessor(): void {
    Stripe.prototype.createSale = jest.fn().mockResolvedValue({});
  }

  function mockCreateCard(): void {
    Sale.create = jest.fn().mockImplementation((args) => args);
  }

  function mockSave(): void {
    Sale.save = jest.fn().mockImplementation((args) => {
      args.id = uuid();
      return args;
    });
  }

  function aCard(): Card {
    return new Card(uuid(), uuid(), '4242424242424242', 2, 2025, 322, Clock.nowPlusDays(10));
  }
});
