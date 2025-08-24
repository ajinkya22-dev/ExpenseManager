import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import expenseSlice from './slices/expenseSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    expenses: expenseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;