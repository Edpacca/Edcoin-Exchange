import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import orderSlice from '../features/orders/orderSlice';
import tradeSlice from '../features/trades/tradeSlice';
import userSlice from '../features/users/userSlice';
import filterSlice from '../features/filters/filterSlice';
import initialisationSlice from './initialisationSlice';

export const store = configureStore({
    reducer: {
      orders: orderSlice,
      trades: tradeSlice,
      users: userSlice,
      filters: filterSlice,
      initialisation: initialisationSlice
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