import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authFormReducer from '../features/users/auth/auth-slice';
import sessionComponentReducer from '../features/sessions/sessions-slice';

export const store = configureStore({
  reducer: {
    authForm: authFormReducer,
    sessionComponent: sessionComponentReducer,
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
