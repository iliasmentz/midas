import {AppError} from '../../../common/error';

export class ProcessorError extends AppError {
  constructor(name: string, description: string, statusCode: number) {
    super(name, description, statusCode, {}, true);
  }
}
