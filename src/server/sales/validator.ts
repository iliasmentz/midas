import Schema from 'fluent-json-schema';
import Ajv from 'ajv';

import {Processors} from '../../sales/actions/processors/model';
import {Currency} from '../../common/currency';

const schema = Schema.object()
  .prop('amount', Schema.number().minimum(0.01))
  .prop('currency', Schema.string().enum(Object.values(Currency)))
  .prop('processor', Schema.string().enum(Object.values(Processors)))
  .prop('token', Schema.string())
  .prop('description', Schema.string())
  .prop('email', Schema.string())
  .required(['amount', 'currency', 'processor', 'token', 'description']);

const validator = new Ajv().compile(schema.valueOf());

export default validator;
