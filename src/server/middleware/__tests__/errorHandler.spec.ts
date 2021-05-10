import errorHandler from '../errorHandler';

let ctx: any;

describe('errorHandler', () => {
  beforeEach(() => {
    ctx = {
      response: {
        status: '',
        body: '',
        set: (headers: any) => {
          return headers;
        },
      },
    };
  });

  it('does not catch any error if procedure runs fluently', async () => {
    ctx.response.body = 'This will change if an error occurred';
    await errorHandler(ctx, async () => {
      return 'No error captured';
    });
    expect(ctx.response.body).toEqual('This will change if an error occurred');
  });

  it('catches an unknown error and boomifies it to an internal server error', async () => {
    await errorHandler(ctx, () => {
      throw new Error();
    });
    expect(ctx.response.body.message).toEqual('An internal server error occurred');
    expect(ctx.response.status).toEqual(500);
  });
});
