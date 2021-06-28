import {SaleRequest} from '../../model';
import gateways from '../../gateways';
import get from '../processors';
import {Card} from '../../../cards/entity';
import {Sale} from '../../entity';
import clock from '../../../common/clock';
import {Payment} from '../processors/model';
import validate from './validate';

async function process(userId: string, saleRequest: SaleRequest): Promise<string> {
  const card = await getCard(saleRequest.token);
  const processor = get(saleRequest.processor);
  const payment = await processor.createSale({...card, ...saleRequest});
  await createSale(userId, payment, saleRequest);
  return payment.status;
}

async function getCard(token: string): Promise<Card> {
  const card = await gateways.fetchCardByToken(token);

  validate(card);

  return card!;
}

async function createSale(
  userId: string,
  payment: Payment,
  saleRequest: SaleRequest
): Promise<void> {
  const sale = Sale.create({
    userId,
    externalId: payment.id,
    status: payment.status,
    executedAt: clock.now(),
    ...saleRequest,
  });
  await Sale.save(sale);
}

export default process;
