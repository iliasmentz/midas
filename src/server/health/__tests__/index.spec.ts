import router from '../index';
import Router from 'koa-router';

describe('router', () => {
  it('is returns a koa router middleware', async () => {
    expect(router).toBeInstanceOf(Router);
  });
});
