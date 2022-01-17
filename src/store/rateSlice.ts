import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createEmptyRateArray, createRateArray } from '../utils/dataLocal';

export interface RateData {
  name: string,
  data:{ x:string, y: number[] }[]
}

export interface APIData {
  ticker: string,
  bid: string,
  ask: string,
  open: string,
  low: string,
  high: string,
  changes: number,
  date: string
}

const initialState: RateData[] = [{ name: '1', data: createRateArray() }];

export const rateSlice = createSlice({
  name: 'rateSlice',
  initialState,
  reducers: {
    setNewRateArray: (state:RateData[], { payload }: PayloadAction<APIData>) => {
      const {
        date, open, high, low, changes,
      } = payload;
      const close = Number((+open + +changes).toFixed(5));
      const newRateArray = createEmptyRateArray(payload.date);

      newRateArray[newRateArray.length - 1].y = [+open, +high, +low, close];

      return [{ name: date, data: newRateArray }];
    },
    addNewRate: (state: RateData[], { payload }: PayloadAction<APIData>) => {
      const {
        date, open, high, low, changes,
      } = payload;
      const close = Number((+open + +changes).toFixed(5));
      const newItem = { x: date, y: [+open, +high, +low, close] };

      state[0].data.push(newItem);
      state[0].data.shift();
      state[0].name = date; // toString?
    },
  },
});

export const { addNewRate, setNewRateArray } = rateSlice.actions;
export default rateSlice.reducer;
