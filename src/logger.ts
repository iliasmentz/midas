import pino from 'pino';

const level = process.env.LOG_LEVEL || 'info';

export const logger = pino({
  name: 'app',
  level: level,
  prettyPrint: process.env.NODE_ENV != 'production',
});
