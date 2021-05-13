import {Card} from '../cards/entity';
import apiClient from './helpers/apiClient';
import {validCardDetails} from './helpers/card';

describe('tokenize api', () => {
  it('should return a token for my card details', async () => {
    // given
    const cardDetails = validCardDetails();

    // when
    const response = await apiClient.post(`/cards/tokenize`, cardDetails);

    // then
    expect(response.data.token).toBeDefined();
    expect(response.data.invalidAt).toBeDefined();

    // cleanup
    await Card.delete({token: response.data.token});
  });

  it('should throw a validation error for invalid card', async () => {
    // given
    const cardDetails = validCardDetails();
    cardDetails.expirationYear = 2000;

    // when
    const response = await apiClient.post(`/cards/tokenize`, cardDetails).catch((e) => {
      return e.response;
    });

    // then
    expect(response.status).toBe(422);
    expect(response.data.statusCode).toBe(422);
    expect(response.data.error).toBe('Unprocessable Entity');
    expect(response.data.message).toBe('Please provide valid card details.');

    // cleanup
    await Card.delete({token: response.data.token});
  });
});
