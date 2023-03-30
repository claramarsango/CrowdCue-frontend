const baseMockSession = {
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
    admin: '',
    participants: [],
    _id: '1234',
  },
  exitStatus: 'idle',
  joinStatus: 'idle',
  getSessionDetailState: 'idle',
  user: {
    id: 0,
    email: '',
    password: '',
    imageURL: '',
    inSession: '',
  },
};

export const mockedSessions = [
  { ...baseMockSession },
  {
    ...baseMockSession,
    session: { ...baseMockSession.session, _id: '123456789123456789123456' },
  },
  {
    ...baseMockSession,
    user: { ...baseMockSession.user, inSession: '1234' },
  },
];
