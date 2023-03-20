import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createSessionResponse } from '../../models/session-model';
import { createSession } from './sessions-api';

export interface SessionFormState {
  status: 'idle' | 'loading' | 'failed';
  createSessionState: 'idle' | 'success' | 'error';
  createSessionMsg: string;
}

const initialState: SessionFormState = {
  status: 'idle',
  createSessionState: 'idle',
  createSessionMsg: '',
};

export const createSessionAsync = createAsyncThunk(
  'createSessionForm/fetch',
  async (sessionForm: HTMLFormElement) => {
    const formData = new FormData(sessionForm);

    const response = await createSession(formData);
    const apiRes: createSessionResponse = await response.json();

    if (!response.ok) {
      throw new Error(apiRes.msg);
    }

    return apiRes;
  },
);

export const sessionFormSlice = createSlice({
  name: 'sessionForm',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(createSessionAsync.pending, state => {
        state.status = 'loading';
        state.createSessionState = 'idle';
      })
      .addCase(createSessionAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.createSessionState = 'success';
      })
      .addCase(createSessionAsync.rejected, (state, action: any) => {
        state.status = 'failed';
        state.createSessionState = 'error';
        state.createSessionMsg = action.error.message;
      });
  },
});

export const selectSubmitState = (state: RootState) => state.sessionForm;

export default sessionFormSlice.reducer;
