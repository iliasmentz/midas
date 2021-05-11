import {SnakeNamingStrategy} from 'typeorm-naming-strategies';

const POSTGRES_HOST = process.env.MIDAS_DATABASE_HOST || 'localhost';
const POSTGRES_PORT = process.env.MIDAS_DATABASE_PORT || 5432;
const POSTGRES_USER = process.env.MIDAS_DATABASE_USER || 'midas';
const POSTGRES_PASS = process.env.MIDAS_DATABASE_PASS || 'test';
const POSTGRES_DB = process.env.MIDAS_DATABASE_NAME || 'midas';

export = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASS,
  database: POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: ['build/src/**/*entity.{ts,js}'],
  migrations: ['build/db/migrations/*.{ts,js}'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'db/migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
};
