interface SaleRequest {
  amount: number;
  currency: string;
  processor: string;
  token: string;
  description: string;
  email: string | undefined;
}

export {SaleRequest};
