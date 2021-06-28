import HTTPClient, {Method} from '../../../../common/httpClient';

const STRIPE_BASE_URL = process.env.STRIPE_BASE_URL || 'https://api.stripe.com/';
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || 'test-api-key';

interface StripeRequest {}
interface StripeResponse {
  data: any;
}

class StripeHttpClient {
  private static apiKey: string = STRIPE_API_KEY;
  private static baseUrl: string = STRIPE_BASE_URL;

  async post(path: string, body: StripeRequest): Promise<StripeResponse> {
    return await HTTPClient.request(StripeHttpClient.getUrl(path), {
      method: 'post' as Method,
      headers: StripeHttpClient.getHeaders(),
      data: StripeHttpClient.formEncoded(body),
    });
  }

  private static getUrl(path: string): string {
    return StripeHttpClient.baseUrl + path;
  }

  private static getHeaders(): {[x: string]: string} {
    return {
      Authorization: StripeHttpClient.authorization(),
      ContentType: StripeHttpClient.getContentType(),
    };
  }

  private static authorization(): string {
    return `Bearer ${StripeHttpClient.apiKey}`;
  }

  private static getContentType(): string {
    return 'application/x-www-form-urlencoded';
  }

  private static formEncoded(tokenRequest: any): string {
    return Object.entries(tokenRequest)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }
}

export {StripeRequest, StripeResponse, StripeHttpClient};
