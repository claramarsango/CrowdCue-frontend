import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, UserCredentials } from '../../../models/user-model';
import { RootState } from '../../../app/store';
import logInUser from './auth-api';

export interface AuthFormState {
  authState: 'idle' | 'success' | 'error';
  status: 'idle' | 'loading' | 'failed';
  authMsg: string;
}

const initialState: AuthFormState = {
  authState: 'idle',
  status: 'idle',
  authMsg: '',
};

export const checkForExistingUser = createAsyncThunk(
  'loginForm/fetchToken',
  async (loginForm: HTMLFormElement) => {
    const formData = new FormData(loginForm);

    const userToLog = Object.fromEntries(formData.entries());

    const response = await logInUser(userToLog as UserCredentials);
    const apiResUserData: AuthResponse = await response.json();

    if (!response.ok) {
      throw new Error(apiResUserData.message);
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
      .addCase(checkForExistingUser.pending, state => {
        state.status = 'loading';
        state.authState = 'idle';
      })
      .addCase(
        checkForExistingUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = 'idle';
          state.authState = 'success';
          sessionStorage.setItem('Bearer', action.payload.accessToken);
        },
      )
      .addCase(checkForExistingUser.rejected, (state, action: any) => {
        state.status = 'failed';
        state.authState = 'error';
        state.authMsg = action.error.message;
      });
  },
});

export const selectResponseState = (state: RootState) => state.authForm;

export default authFormSlice.reducer;
