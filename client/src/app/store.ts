import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import orderSlice from './orderSlice';
import counterSlice from '../features/counter/counterSlice';

export const store = configureStore({
    reducer: {
      orders: orderSlice,
      counter: counterSlice,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;