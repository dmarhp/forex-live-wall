import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Settings{
  pair: string,
  timeFrame: number
}

const initialState = {
  pair: '',
  timeFrame: 5, // seconds
};

export const settingSlice = createSlice({
  name: 'settingSlice',
  initialState,
  reducers: {
    setPair: (state: Settings, { payload }: PayloadAction<string>) => {
      state.pair = payload;
    },
    setTimeFrame: (state: Settings, { payload }: PayloadAction<number>) => {
      state.timeFrame = payload;
    },
  },
});

export const { setPair, setTimeFrame } = settingSlice.actions;
export default settingSlice.reducer;
