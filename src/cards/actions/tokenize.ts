import {Card} from '../entity';
import Clock from '../../common/clock';
import {CardDetails, CardToken} from '../model';
import validate from './validate';

const CARD_TOKEN_DURATION_IN_DAYS = parseInt(process.env.CARD_TOKEN_DURATION_IN_DAYS || '90');

export default async function tokenizeCard(
  userId: string,
  cardDetails: CardDetails
): Promise<CardToken> {
  validate(cardDetails);
  const card = createCard(userId, cardDetails);
  await card.save();
  return {
    token: card.token,
    invalidAt: card.invalidAt,
  };
}

function createCard(userId: string, cardDetails: CardDetails): Card {
  return Card.create({
    userId,
    invalidAt: Clock.nowPlusDays(CARD_TOKEN_DURATION_IN_DAYS),
    ...cardDetails,
  });
}
