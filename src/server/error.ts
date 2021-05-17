import {AppError} from '../common/error';
import {ErrorObject} from 'ajv';

export class ValidationError extends AppError {
  constructor(errors: Array<ErrorObject>) {
    const message = errors.map((error) => error.message).join(',');
    super('validation_error', message, 422);
  }
}
