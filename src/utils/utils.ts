import { APIData, Rate } from './types';
import { rateArrayLength } from './constants';

export const formatDate = (str: string) => {
  const date = new Date(str.replace(/-/g, '/'));
  return date.getTime();
};

export const createNewRate = (data: APIData) => {
  const {
    date, open, high, low, changes,
  } = data;
  const close = Number((+open + +changes).toFixed(5));
  const y = [+open, +high, +low, close];

  return { x: formatDate(date), y };
};

export const createInitialRateArray = (data: APIData) => {
  const { date } = data;
  const timeFrame = 10000; // 10sec
  const queryTime = formatDate(date);
  const rates: Rate[] = [createNewRate(data)];

  for (let i = 1; i < rateArrayLength; i++) {
    const x = queryTime - timeFrame * i;
    rates.unshift({ x, y: [] as number[] });
  }

  return [{ name: date, data: rates }];
};
