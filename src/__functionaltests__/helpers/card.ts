import {CardDetails} from '../../cards/model';

export function validCardDetails(): CardDetails {
  return {
    expirationMonth: 2,
    expirationYear: 2025,
    number: '4242424242424242',
    cvc: 322,
  };
}
