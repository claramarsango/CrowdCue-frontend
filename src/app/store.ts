import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authFormReducer from '../features/users/auth/auth-slice';
import sessionFormReducer from '../features/sessions/sessions-slice';

export const store = configureStore({
  reducer: {
    authForm: authFormReducer,
    sessionForm: sessionFormReducer,
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
