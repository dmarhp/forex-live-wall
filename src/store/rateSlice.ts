import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APIData, RateData, StoreType } from '../utils/types';
import { createInitialRateArray, createNewRate } from '../utils/utils';

export const initialState: StoreType = {
  timeFrame: 5,
  currentRate: { ticker: '' } as APIData,
  chartData: [] as RateData[],
};

export const rateSlice = createSlice({
  name: 'rateSlice',
  initialState,
  reducers: {
    setNewRateArray: (state:StoreType, { payload }:PayloadAction<APIData>) => {
      state.currentRate = payload;
      state.chartData = createInitialRateArray(payload);
    },

    addNewRate: (state:StoreType, { payload }: PayloadAction<APIData>) => {
      const { data } = state.chartData[0];
      data.shift();
      data.push(createNewRate(payload));

      state.currentRate = payload;
      state.chartData = [{ name: payload.date, data }];
    },

    setTimeFrame: (state: StoreType, { payload }: PayloadAction<number>) => {
      state.timeFrame = payload;
    },
  },
});

export const { setNewRateArray, addNewRate, setTimeFrame } = rateSlice.actions;
export default rateSlice.reducer;
