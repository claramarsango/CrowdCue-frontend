import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  AllSessionsResponse,
  CreateSessionResponse,
  sessionResponse,
} from '../../models/session-model';
import { createSession, getAllSessions } from './sessions-api';

type apiResponseState = 'idle' | 'success' | 'error';
export interface SessionState {
  status: 'idle' | 'loading' | 'failed';
  createSessionState: apiResponseState;
  createSessionMsg: string;
  previewSessions: sessionResponse[];
}

const initialState: SessionState = {
  status: 'idle',
  createSessionState: 'idle',
  createSessionMsg: '',
  previewSessions: [],
};

export const createSessionAsync = createAsyncThunk(
  'createSessionForm/fetch',
  async (sessionForm: HTMLFormElement) => {
    const formData = new FormData(sessionForm);

    const response = await createSession(formData);
    const apiRes: CreateSessionResponse = await response.json();

    if (!response.ok) {
      throw new Error(apiRes.msg);
    }

    return apiRes;
  },
);

export const getSessionsAsync = createAsyncThunk(
  'getSessionsList/fetch',
  async () => {
    const response = await getAllSessions();

    const apiRes: AllSessionsResponse = await response.json();

    if (!response.ok) {
      throw new Error(apiRes.msg);
    }

    return apiRes;
  },
);

export const sessionComponentSlice = createSlice({
  name: 'sessionComponent',
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
      })

      .addCase(getSessionsAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(getSessionsAsync.fulfilled, (state, action: any) => {
        state.status = 'idle';
        state.previewSessions = action.payload;
      })
      .addCase(getSessionsAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const selectSessionState = (state: RootState) => state.sessionComponent;

export default sessionComponentSlice.reducer;
