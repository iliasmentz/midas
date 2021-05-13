import {uuid} from 'uuidv4';
import {CardDetails} from '../../model';
import tokenizeCard from '../tokenize';
import {Card} from '../../entity';
import validate from '../validate';
import {nanoid} from 'nanoid';

jest.mock('../validate');

describe('tokenize card', () => {
  let userId: string;
  let card: CardDetails;

  beforeEach(() => {
    userId = uuid();
    card = cardDetails();
    mockCreate();
    mockSave();
  });

  it('should validate the card details', async () => {
    // when
    await tokenizeCard(userId, card);

    // then
    expect(validate).toBeCalled();
  });

  it('should save the new card', async () => {
    // when
    await tokenizeCard(userId, card);

    // then
    expect(Card.save).toBeCalled();
  });

  it('should return a new token for the card', async () => {
    // when
    const cardToken = await tokenizeCard(userId, card);

    // then
    expect(cardToken.token).toBeDefined();
    expect(cardToken.invalidAt).toBeDefined();
  });

  function mockCreate(): void {
    Card.create = jest.fn().mockImplementation((args) => {
      args.userId = userId;
      args.token = nanoid();
      args.save = Card.save;
      return args;
    });
  }

  function mockSave(): void {
    Card.save = jest.fn().mockImplementation((args) => {
      return args;
    });
  }

  function cardDetails(): CardDetails {
    return {
      expirationMonth: 2,
      expirationYear: 2025,
      number: '4242424242424242',
      cvc: 322,
    };
  }
});
