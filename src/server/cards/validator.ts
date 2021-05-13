import Schema from 'fluent-json-schema';
import Ajv from 'ajv';

const schema = Schema.object()
  .prop('expirationMonth', Schema.number().minimum(0).maximum(12))
  .prop('expirationYear', Schema.number().minimum(2000))
  .prop('number', Schema.string().maxLength(16).minLength(16))
  .prop('cvc', Schema.number().maximum(999))
  .required(['expirationMonth', 'expirationYear', 'number', 'cvc']);

const validator = new Ajv().compile(schema.valueOf());

export default validator;
