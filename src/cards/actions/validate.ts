import {CardDetails} from '../model';
import {AppError} from '../../common/error';
import validator from 'card-validator';

function validate(cardDetails: CardDetails): void {
  if (!valid(cardDetails)) {
    throw new AppError('invalid_card', 'Please provide valid card details.', 422);
  }
}

function valid(cardDetails: CardDetails): boolean {
  return (
    validNumber(cardDetails) &&
    validCvc(cardDetails) &&
    validateMonth(cardDetails) &&
    validateYear(cardDetails)
  );
}

function validNumber(cardDetails: CardDetails): boolean {
  return validator.number(cardDetails.number).isPotentiallyValid;
}

function validCvc(cardDetails: CardDetails): boolean {
  return validator.cvv(cardDetails.cvc.toString()).isPotentiallyValid;
}

function validateMonth(cardDetails: CardDetails): boolean {
  return validator.expirationMonth(cardDetails.expirationMonth.toString()).isPotentiallyValid;
}

function validateYear(cardDetails: CardDetails): boolean {
  return validator.expirationYear(cardDetails.expirationYear.toString()).isPotentiallyValid;
}

export default validate;
