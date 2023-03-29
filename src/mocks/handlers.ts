import { rest } from 'msw';

export const handlers = [
  rest.post(`${process.env.REACT_APP_API_URL}auth/login`, (_req, res, ctx) => {
    return res.once(ctx.status(201), ctx.json({ accessToken: 'token' }));
  }),
  rest.post(
    `${process.env.REACT_APP_API_URL}auth/register`,
    (_req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json({ msg: 'User registered successfully!' }),
      );
    },
  ),
  rest.get(
    `${process.env.REACT_APP_API_URL}api/v1/sessions/explore`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          sessions: [
            {
              title: 'mockSession',
              coverImageURL: '',
              url: '',
              queuedSongs: [],
              admin: '',
              participants: [],
              _id: 1234,
            },
          ],
        }),
      );
    },
  ),
  rest.get(
    `${process.env.REACT_APP_API_URL}api/v1/sessions/1234`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          session: {
            title: 'mockSessionById',
            coverImageURL: '',
            url: '',
            queuedSongs: [],
            admin: '',
            participants: [],
            _id: 1234,
          },
        }),
      );
    },
  ),
  rest.post(
    `${process.env.REACT_APP_API_URL}api/v1/sessions/1234`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          sessionId: '1234',
          msg: 'A new user has joined the session',
        }),
      );
    },
  ),
  rest.patch(
    `${process.env.REACT_APP_API_URL}api/v1/sessions/1234`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ msg: 'You have left the session' }),
      );
    },
  ),
  rest.delete(
    `${process.env.REACT_APP_API_URL}api/v1/sessions/1234`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ msg: 'The session has been deleted' }),
      );
    },
  ),
];

export const errorHandlers = [
  rest.post(`${process.env.REACT_APP_API_URL}auth/login`, (_req, res, ctx) => {
    return res.once(
      ctx.status(404),
      ctx.json({
        msg: 'There is no registered user with this email and password',
      }),
    );
  }),
  rest.post(
    `${process.env.REACT_APP_API_URL}auth/register`,
    (req, res, ctx) => {
      return res.once(
        ctx.status(400),
        ctx.json({ msg: '"email" must be valid email' }),
      );
    },
  ),
  rest.get(
    `${process.env.REACT_APP_API_URL}api/v1/sessions/explore`,
    (_req, res, ctx) => {
      return res.once(ctx.status(401), ctx.json({ msg: 'Unauthorized' }));
    },
  ),
  rest.get(
    `${process.env.REACT_APP_API_URL}api/v1/sessions/123456789123456789123456`,
    (_req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json({ msg: 'This session does not exist' }),
      );
    },
  ),
  rest.post(
    `${process.env.REACT_APP_API_URL}api/v1/sessions/1234`,
    (_req, res, ctx) => {
      return res(
        ctx.status(400),
        ctx.json({
          msg: 'You are already participating in a session',
        }),
      );
    },
  ),
  rest.patch(
    `${process.env.REACT_APP_API_URL}api/v1/sessions/123456789123456789123456`,
    (_req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json({ msg: 'This session does not exist' }),
      );
    },
  ),
  rest.delete(
    `${process.env.REACT_APP_API_URL}api/v1/sessions/123456789123456789123457`,
    (_req, res, ctx) => {
      return res.once(
        ctx.status(404),
        ctx.json({ msg: 'This session does not exist' }),
      );
    },
  ),
];
