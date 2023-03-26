import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  PreloadedState,
} from '@reduxjs/toolkit';
import authFormReducer from '../features/users/auth/auth-slice';
import sessionComponentReducer from '../features/sessions/sessions-slice';

export const store = configureStore({
  reducer: {
    authForm: authFormReducer,
    sessionComponent: sessionComponentReducer,
  },
});

export const rootReducer = combineReducers({
  authForm: authFormReducer,
  sessionComponent: sessionComponentReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
