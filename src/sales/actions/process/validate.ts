import {Card} from '../../../cards/entity';
import clock from '../../../common/clock';
import {AppError} from '../../../common/error';

export default function validate(card?: Card): void {
  if (!card) {
    throw new AppError('invalid_token', 'Please provide a valid token.', 401);
  }

  if (cardExpired(card)) {
    throw new AppError('expired_card', 'Card expired, please create a new token', 401);
  }
}

function cardExpired(card: Card): boolean {
  return card.invalidAt <= clock.now();
}
