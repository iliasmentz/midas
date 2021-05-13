import connection from '../../db/connection';

beforeAll(async () => {
  // pre test setup
  await connection;
});

afterEach(() => {
  // post test cleanup
});

afterAll(async () => {
  // await (await connection).close();
});
