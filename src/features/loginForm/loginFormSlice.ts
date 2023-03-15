import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserLogin } from '../../models/user-model';
import { RootState } from '../../app/store';
import logInUser from './loginAPI';

export interface loginFormState {
  isLoggedIn: 'idle' | 'success' | 'error';
  status: 'idle' | 'loading' | 'failed';
}

const initialState: loginFormState = {
  isLoggedIn: 'idle',
  status: 'idle',
};

export const checkForExistingUser = createAsyncThunk(
  'loginForm/fetchToken',
  async (loginForm: HTMLFormElement) => {
    const userToLog: UserLogin = {
      email: loginForm.email.value,
      password: loginForm.password.value,
    };

    const response = await logInUser(userToLog);

    if (!response.accessToken) {
      return 'error';
    }

    sessionStorage.setItem('Bearer', response.accessToken);
    return 'success';
  },
);

export const loginFormSlice = createSlice({
  name: 'loginForm',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(checkForExistingUser.pending, state => {
        state.status = 'loading';
        state.isLoggedIn = 'idle';
      })
      .addCase(checkForExistingUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isLoggedIn = action.payload;
      })
      .addCase(checkForExistingUser.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const selectSubmitState = (state: RootState) =>
  state.loginForm.isLoggedIn;
export const selectResponseState = (state: RootState) => state.loginForm.status;

export default loginFormSlice.reducer;
