import handle from '../handle';
let ctx: any;

describe('handle', () => {
  beforeEach(() => {
    ctx = {
      response: {
        status: '',
        body: '',
      },
    };
  });

  it('responds a 200 status OK message', async () => {
    // when
    await handle(ctx);

    // then
    expect(ctx.response.status).toEqual(200);
    expect(ctx.response.body).toEqual('OK');
  });
});
