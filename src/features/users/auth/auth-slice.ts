import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AuthResponse,
  UserLoginCredentials,
  UserRegisterCredentials,
} from '../../../models/user-model';
import { RootState } from '../../../app/store';
import { logInUser, registerUser } from './auth-api';

export type AuthStatus = 'idle' | 'success' | 'error';

export interface AuthFormState {
  registerState: AuthStatus;
  loginState: AuthStatus;
  status: 'idle' | 'loading' | 'failed';
  registerMsg: string;
  loginMsg: string;
}

const initialState: AuthFormState = {
  registerState: 'idle',
  loginState: 'idle',
  status: 'idle',
  registerMsg: '',
  loginMsg: '',
};

export const checkForRegisteredUser = createAsyncThunk(
  'registerForm/fetch',

  async (registerForm: HTMLFormElement) => {
    const formData = new FormData(registerForm);

    const userToRegister = Object.fromEntries(formData.entries());

    const response = await registerUser(
      userToRegister as UserRegisterCredentials,
    );
    const apiRes: AuthResponse = await response.json();

    if (!response.ok) {
      throw new Error(apiRes.msg);
    }

    return apiRes;
  },
);

export const checkForExistingUser = createAsyncThunk(
  'loginForm/fetchToken',
  async (loginForm: HTMLFormElement) => {
    const formData = new FormData(loginForm);

    const userToLog = Object.fromEntries(formData.entries());

    const response = await logInUser(userToLog as UserLoginCredentials);
    const apiResUserData: AuthResponse = await response.json();

    if (!response.ok) {
      throw new Error(apiResUserData.msg);
    }

    return apiResUserData;
  },
);

export const authFormSlice = createSlice({
  name: 'authForm',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(checkForRegisteredUser.pending, state => {
        state.status = 'loading';
        state.registerState = 'idle';
      })
      .addCase(checkForRegisteredUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.registerState = 'success';
      })
      .addCase(checkForRegisteredUser.rejected, (state, action: any) => {
        state.status = 'failed';
        state.registerState = 'error';
        state.registerMsg = action.error.message;
      })

      .addCase(checkForExistingUser.pending, state => {
        state.status = 'loading';
        state.loginState = 'idle';
      })
      .addCase(
        checkForExistingUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = 'idle';
          state.loginState = 'success';
          sessionStorage.setItem('User ID', action.payload.userId);
          sessionStorage.setItem('Access Token', action.payload.accessToken);
        },
      )
      .addCase(checkForExistingUser.rejected, (state, action: any) => {
        state.status = 'failed';
        state.loginState = 'error';
        state.loginMsg = action.error.message;
      });
  },
});

export const selectResponseState = (state: RootState) => state.authForm;

export default authFormSlice.reducer;
