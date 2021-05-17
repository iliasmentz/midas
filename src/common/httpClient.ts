import axios from 'axios';

type Method = 'get' | 'post' | 'put' | 'patch';

export interface HTTPRequest {
  method: Method;
  headers?: {[x: string]: string};
  data?: unknown;
}

interface HTTPResponse {
  statusCode: number;
  data: any;
}

interface IHttpClient {
  request(url: string, options: HTTPRequest): Promise<HTTPResponse>;
}

const HTTPClient: IHttpClient = {
  async request(url, options) {
    const response = await axios.request({url, ...options});

    return {
      statusCode: response.status,
      data: response.data,
    };
  },
};

export {Method};
export default HTTPClient;
