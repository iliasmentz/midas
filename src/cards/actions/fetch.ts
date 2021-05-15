import {Card} from '../entity';

async function fetchByToken(token: string): Promise<Card | undefined> {
  return await Card.findOne({token: token});
}

export default fetchByToken;
