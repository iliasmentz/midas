import ServerMock from 'mock-http-server';

const StripeMockServer = new ServerMock({host: 'localhost', port: 9000});

const SuccessTokenResponse = {
  id: 'tok_1IrNSWKq2rSpp9VF3TMRS5dS',
  object: 'token',
  card: {
    id: 'card_1IrNSWKq2rSpp9VFx8xv81qZ',
    object: 'card',
    address_city: null,
    address_country: null,
    address_line1: null,
    address_line1_check: null,
    address_line2: null,
    address_state: null,
    address_zip: null,
    address_zip_check: null,
    brand: 'Visa',
    country: 'US',
    cvc_check: 'unchecked',
    dynamic_last4: null,
    exp_month: 5,
    exp_year: 2022,
    fingerprint: 'GUuCaBiU8uwzXUe0',
    funding: 'credit',
    last4: '4242',
    metadata: {},
    name: null,
    tokenization_method: null,
  },
  client_ip: '94.70.41.128',
  created: 1621084992,
  livemode: false,
  type: 'card',
  used: false,
};

const SuccessChargeResponse = {
  id: 'ch_1IrNTHKq2rSpp9VFL6wHU7v1',
  object: 'charge',
  amount: 2000,
  amount_captured: 2000,
  amount_refunded: 0,
  application: null,
  application_fee: null,
  application_fee_amount: null,
  balance_transaction: 'txn_1IrNTHKq2rSpp9VFFE0vXSAG',
  billing_details: {
    address: {
      city: null,
      country: null,
      line1: null,
      line2: null,
      postal_code: null,
      state: null,
    },
    email: null,
    name: null,
    phone: null,
  },
  calculated_statement_descriptor: 'Stripe',
  captured: true,
  created: 1621085039,
  currency: 'eur',
  customer: null,
  description: null,
  destination: null,
  dispute: null,
  disputed: false,
  failure_code: null,
  failure_message: null,
  fraud_details: {},
  invoice: null,
  livemode: false,
  metadata: {},
  on_behalf_of: null,
  order: null,
  outcome: {
    network_status: 'approved_by_network',
    reason: null,
    risk_level: 'normal',
    risk_score: 25,
    seller_message: 'Payment complete.',
    type: 'authorized',
  },
  paid: true,
  payment_intent: null,
  payment_method: 'card_1IrNSWKq2rSpp9VFx8xv81qZ',
  payment_method_details: {
    card: {
      brand: 'visa',
      checks: {
        address_line1_check: null,
        address_postal_code_check: null,
        cvc_check: 'pass',
      },
      country: 'US',
      exp_month: 5,
      exp_year: 2022,
      fingerprint: 'GUuCaBiU8uwzXUe0',
      funding: 'credit',
      installments: null,
      last4: '4242',
      network: 'visa',
      three_d_secure: null,
      wallet: null,
    },
    type: 'card',
  },
  receipt_email: 'iliasmentz+stripe+test@gmail.com',
  receipt_number: null,
  receipt_url:
    'https://pay.stripe.com/receipts/acct_1IrMbYKq2rSpp9VF/ch_1IrNTHKq2rSpp9VFL6wHU7v1/rcpt_JUMBj3GIOHmCWyvXt2q4U1lK6jsZKqY',
  refunded: false,
  refunds: {
    object: 'list',
    data: [],
    has_more: false,
    total_count: 0,
    url: '/v1/charges/ch_1IrNTHKq2rSpp9VFL6wHU7v1/refunds',
  },
  review: null,
  shipping: null,
  source: {
    id: 'card_1IrNSWKq2rSpp9VFx8xv81qZ',
    object: 'card',
    address_city: null,
    address_country: null,
    address_line1: null,
    address_line1_check: null,
    address_line2: null,
    address_state: null,
    address_zip: null,
    address_zip_check: null,
    brand: 'Visa',
    country: 'US',
    customer: null,
    cvc_check: 'pass',
    dynamic_last4: null,
    exp_month: 5,
    exp_year: 2022,
    fingerprint: 'GUuCaBiU8uwzXUe0',
    funding: 'credit',
    last4: '4242',
    metadata: {},
    name: null,
    tokenization_method: null,
  },
  source_transfer: null,
  statement_descriptor: null,
  statement_descriptor_suffix: null,
  status: 'succeeded',
  transfer_data: null,
  transfer_group: null,
};

export function cardTokenWillSucceed(server: ServerMock): void {
  server.on({
    method: 'POST',
    path: '/v1/tokens',
    reply: {
      status: 200,
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(SuccessTokenResponse),
    },
  });
}

export function chargeWillSucceed(server: ServerMock): void {
  server.on({
    method: 'POST',
    path: '/v1/charges',
    reply: {
      status: 200,
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(SuccessChargeResponse),
    },
  });
}

const INSUFFICIENT_FUNDS = {
  error: {
    charge: 'ch_1IsBEmKq2rSpp9VFqZXczGa2',
    code: 'card_declined',
    decline_code: 'insufficient_funds',
    doc_url: 'https://stripe.com/docs/error-codes/card-declined',
    message: 'Your card has insufficient funds.',
    type: 'card_error',
  },
};

export function chargeWillFail(server: ServerMock, status: number, body: any): void {
  server.on({
    method: 'POST',
    path: '/v1/charges',
    reply: {
      status: status,
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(body),
    },
  });
}

const INCORRECT_NUMBER = {
  error: {
    code: 'incorrect_number',
    doc_url: 'https://stripe.com/docs/error-codes/incorrect-number',
    message: 'Your card number is incorrect.',
    param: 'number',
    type: 'card_error',
  },
};

export const STRIPE_ERRORS = {
  INSUFFICIENT_FUNDS,
  INCORRECT_NUMBER,
};

export default StripeMockServer;
