import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  AllSessionsResponse,
  CreateSessionResponse,
  Session,
  SessionDetailResponse,
  sessionResponse,
} from '../../models/session-model';
import { User } from '../../models/user-model';
import {
  createSession,
  deleteSessionById,
  getAllSessions,
  getSessionById,
  joinSessionById,
  leaveSessionById,
} from './sessions-api';

type apiResponseState = 'idle' | 'success' | 'error';
export interface SessionState {
  status: 'idle' | 'loading' | 'failed';
  createSessionState: apiResponseState;
  getSessionDetailState: apiResponseState;
  sessionMsg: string;
  previewSessions: sessionResponse[];
  session: Session;
  exitStatus: apiResponseState;
  joinStatus: apiResponseState;
  user: User;
}

const initialState: SessionState = {
  status: 'idle',
  createSessionState: 'idle',
  getSessionDetailState: 'idle',
  sessionMsg: '',
  previewSessions: [],
  session: {
    title: '',
    coverImageURL: '',
    url: '',
    currentSong: '',
    queuedSongs: [],
    admin: '',
    participants: [],
    _id: '0',
  },
  exitStatus: 'idle',
  joinStatus: 'idle',
  user: {
    id: 0,
    email: '',
    password: '',
    imageURL: '',
    inSession: '',
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

export const joinSessionAsync = createAsyncThunk(
  'joinSession/fetch',
  async (id: string) => {
    const response = await joinSessionById(id);

    const apiRes: { msg: string; sessionId: string } = await response.json();

    if (!response.ok) {
      throw new Error(apiRes.msg);
    }

    return apiRes;
  },
);
export const leaveSessionAsync = createAsyncThunk(
  'leaveSession/fetch',
  async (id: string) => {
    const response = await leaveSessionById(id);

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
  reducers: {
    restoreAllStatus: state => {
      state.status = 'idle';
      state.exitStatus = 'idle';
      state.joinStatus = 'idle';
      state.getSessionDetailState = 'idle';
    },
  },

  extraReducers: builder => {
    builder
      .addCase(createSessionAsync.pending, state => {
        state.status = 'loading';
        state.createSessionState = 'idle';
      })
      .addCase(
        createSessionAsync.fulfilled,
        (state, action: PayloadAction<CreateSessionResponse>) => {
          state.status = 'idle';
          state.createSessionState = 'success';
          state.user.inSession = action.payload.session._id.toString();
          state.session = action.payload.session;
          state.session.queuedSongs = [...action.payload.session.queuedSongs];
        },
      )
      .addCase(createSessionAsync.rejected, (state, action: any) => {
        state.status = 'failed';
        state.createSessionState = 'error';
        state.sessionMsg = action.error.message;
      })

      .addCase(getSessionsAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        getSessionsAsync.fulfilled,
        (state, action: PayloadAction<AllSessionsResponse>) => {
          state.status = 'idle';
          state.previewSessions = action.payload.sessions;
        },
      )
      .addCase(getSessionsAsync.rejected, (state, action: any) => {
        state.status = 'failed';
        state.sessionMsg = action.error.message;
      })

      .addCase(getSessionDetailAsync.pending, state => {
        state.status = 'loading';
        state.getSessionDetailState = 'idle';
      })
      .addCase(
        getSessionDetailAsync.fulfilled,
        (state, action: PayloadAction<SessionDetailResponse>) => {
          state.status = 'idle';
          state.session = action.payload.session;
          state.joinStatus = 'idle';
          state.getSessionDetailState = 'success';
        },
      )
      .addCase(getSessionDetailAsync.rejected, (state, action: any) => {
        state.status = 'failed';
        state.getSessionDetailState = 'error';
        state.sessionMsg = action.error.message;
      })

      .addCase(deleteSessionAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        deleteSessionAsync.fulfilled,
        (state, action: PayloadAction<{ msg: string }>) => {
          state.status = 'idle';
          state.sessionMsg = action.payload.msg;
          sessionStorage.removeItem('Current Session');
          state.exitStatus = 'success';
          state.createSessionState = 'idle';
          state.user.inSession = '';
          state.session = {
            title: '',
            coverImageURL: '',
            url: '',
            currentSong: '',
            queuedSongs: [],
            admin: '',
            participants: [],
            _id: '0',
          };
        },
      )
      .addCase(deleteSessionAsync.rejected, (state, action: any) => {
        state.status = 'failed';
        state.sessionMsg = action.error.message;
      })

      .addCase(joinSessionAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        joinSessionAsync.fulfilled,
        (state, action: PayloadAction<{ msg: string; sessionId: string }>) => {
          state.status = 'idle';
          state.joinStatus = 'success';
          state.user.inSession = action.payload.sessionId;
          state.session._id = action.payload.sessionId;
          sessionStorage.setItem('Current Session', action.payload.sessionId);
        },
      )
      .addCase(joinSessionAsync.rejected, (state, action: any) => {
        state.status = 'failed';
        state.joinStatus = 'error';
        state.sessionMsg = action.error.message;
      })

      .addCase(leaveSessionAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(leaveSessionAsync.fulfilled, state => {
        state.status = 'idle';
        state.joinStatus = 'idle';
        state.exitStatus = 'success';
        state.user.inSession = '';
        sessionStorage.removeItem('Current Session');
      })
      .addCase(leaveSessionAsync.rejected, (state, action: any) => {
        state.status = 'failed';
        state.exitStatus = 'error';
        state.sessionMsg = action.error.message;
        sessionStorage.removeItem('Current Session');
      });
  },
});

export const selectSessionState = (state: RootState) => state.sessionComponent;
export const { restoreAllStatus } = sessionComponentSlice.actions;

export default sessionComponentSlice.reducer;
