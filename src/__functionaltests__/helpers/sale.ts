import {SaleRequest} from '../../sales';

function generateSaleRequest(token: string): SaleRequest {
  return {
    token: token,
    processor: 'stripe',
    amount: 10.0,
    currency: 'usd',
    description: 'This is a test sales, thanks for choosing us',
    email: 'iliasmentz@gmail.com',
  };
}

export {generateSaleRequest};
