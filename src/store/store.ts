import { configureStore } from '@reduxjs/toolkit';
import settingReducer from './settingSlice';
import rateReducer from './rateSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    settings: settingReducer,
    rates: rateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
