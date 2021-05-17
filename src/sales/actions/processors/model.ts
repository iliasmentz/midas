type PaymentRequest = {
  expirationMonth: number;
  expirationYear: number;
  number: string;
  cvc: number;
  amount: number;
  currency: string;
  processor: string;
  description: string;
  email: string | undefined;
};

type PaymentStatus = 'SUCCEEDED' | 'PENDING' | 'FAILED';

type Payment = {
  id: string;
  status: PaymentStatus;
};

interface PaymentProcessor {
  name: string;

  createSale(request: PaymentRequest): Promise<Payment>;
}

enum Processors {
  STRIPE = 'stripe',
}

export {Payment, PaymentProcessor, PaymentRequest, Processors, PaymentStatus};
