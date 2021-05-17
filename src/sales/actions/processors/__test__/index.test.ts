import get from '../index';
import {Processors} from '../model';
import {AppError} from '../../../../common/error';

describe('get processor', () => {
  it(`should return stripe when it's requested`, () => {
    // when
    const result = get('stripe');

    // then
    expect(result.name).toBe(Processors.STRIPE);
  });

  it(`should throw error for unknown processors`, () => {
    // when
    const unknownProcessor = () => {
      return get('paypal');
    };

    // then
    expect(unknownProcessor).toThrow(AppError);
  });
});
