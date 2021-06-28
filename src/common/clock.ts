import {addDays} from 'date-fns/fp';

function now(): Date {
  return new Date();
}

function nowPlusDays(days: number): Date {
  return addDays(days, now());
}

export = {
  now,
  nowPlusDays,
};
