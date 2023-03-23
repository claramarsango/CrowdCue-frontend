import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  AllSessionsResponse,
  CreateSessionResponse,
  Session,
  SessionDetailResponse,
  sessionResponse,
} from '../../models/session-model';
import {
  createSession,
  deleteSessionById,
  getAllSessions,
  getSessionById,
} from './sessions-api';

type apiResponseState = 'idle' | 'success' | 'error';
export interface SessionState {
  status: 'idle' | 'loading' | 'failed';
  createSessionState: apiResponseState;
  sessionMsg: string;
  previewSessions: sessionResponse[];
  session: Session;
}

const initialState: SessionState = {
  status: 'idle',
  createSessionState: 'idle',
  sessionMsg: '',
  previewSessions: [],
  session: {
    title: '',
    coverImageURL: '',
    url: '',
    currentSong: '',
    queuedSongs: [],
    admin: { id: 0, email: '', password: '', imageURL: '', inSession: '' },
    participants: [],
    _id: 0,
  },
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

export const getSessionDetailAsync = createAsyncThunk(
  'getSessionDetail/fetch',
  async (id: string) => {
    const response = await getSessionById(id);

    const apiRes: SessionDetailResponse = await response.json();

    if (!response.ok) {
      throw new Error(apiRes.msg);
    }

    return apiRes;
  },
);

export const deleteSessionAsync = createAsyncThunk(
  'deleteSession/fetch',
  async (id: string) => {
    const response = await deleteSessionById(id);

    const apiRes: { msg: string } = await response.json();

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
        state.sessionMsg = action.error.message;
      })

      .addCase(getSessionsAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(getSessionsAsync.fulfilled, (state, action: any) => {
        state.status = 'idle';
        state.previewSessions = action.payload;
      })
      .addCase(getSessionsAsync.rejected, (state, action: any) => {
        state.status = 'failed';
        state.sessionMsg = action.error.message;
      })

      .addCase(getSessionDetailAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(getSessionDetailAsync.fulfilled, (state, action: any) => {
        state.status = 'idle';
        state.session = action.payload;
      })
      .addCase(getSessionDetailAsync.rejected, (state, action: any) => {
        state.status = 'failed';
        state.sessionMsg = action.error.message;
      })

      .addCase(deleteSessionAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteSessionAsync.fulfilled, (state, action: any) => {
        state.status = 'idle';
        state.session = action.payload;
      })
      .addCase(deleteSessionAsync.rejected, (state, action: any) => {
        state.status = 'failed';
        state.sessionMsg = action.error.message;
      });
  },
});

export const selectSessionState = (state: RootState) => state.sessionComponent;

export default sessionComponentSlice.reducer;
