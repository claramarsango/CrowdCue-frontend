import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginFormReducer from '../features/loginForm/loginFormSlice';

export const store = configureStore({
  reducer: {
    loginForm: loginFormReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
