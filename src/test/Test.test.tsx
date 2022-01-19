import { createInitialRateArray, createNewRate, formatDate } from '../utils/utils';

const dataFromAPI = {
  ticker: 'EUR/USD',
  bid: '1.13421',
  ask: '1.13421',
  open: '1.13235',
  low: '1.13188',
  high: '1.13483',
  changes: 0.0016426016690952205,
  date: '2022-01-19 04:33:12',
};

const formattedData = { x: 1642559592000, y: [1.13235, 1.13483, 1.13188, 1.13399] };

describe('formatDate()', () => {
  it('should return positive Number', () => {
    const result = formatDate('2020-09-06 20:41:57');

    expect(result > 0).toBeTruthy();
  });

  it('should format date as string to number', () => {
    const result = formatDate('2020-09-06 20:41:57');

    expect(result).toEqual(1599414117000);
  });
});

describe('createNewRate()', () => {
  it('should return Rate type object', () => {
    const result = createNewRate(dataFromAPI);

    expect(JSON.stringify(result) === JSON.stringify(formattedData)).toBe(true);
    expect(result.y.length).toBe(4);
    expect(result.x).toBe(1642559592000);
    expect(!result.y.some(isNaN)).toBeTruthy();
  });
});

describe('createInitialRateArray()', () => {
  const result = createInitialRateArray(dataFromAPI);

  it('should return RateData array', () => {
    expect(result.length).toBe(1);
    expect(result[0].name).toBe(dataFromAPI.date);
  });

  it('result.data last element "y" should be filled with numbers', () => {
    const { data } = result[0];
    const [rate1, rate2, rate3, rate4] = data[data.length - 1].y;

    expect(rate1).toBe(1.13235);
    expect(rate2).toBe(1.13483);
    expect(rate3).toBe(1.13188);
    expect(rate4).toBe(1.13399);
  });

  it('result.data all elements "y" except last one should be empty', () => {
    const { data } = result[0];
    const isArrayEmpty = true;

    data.slice(-1).forEach(({ y }) => (!y[0] && !y[1] && !y[2] && !y[3]));

    expect(isArrayEmpty).toBeTruthy();
  });
});
