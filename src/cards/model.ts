interface CardDetails {
  expirationMonth: number;
  expirationYear: number;
  number: string;
  cvc: number;
}

interface CardToken {
  token: string;
  invalidAt: Date;
}

export {CardDetails, CardToken};
