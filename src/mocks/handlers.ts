import { rest } from 'msw';

export const handlers = [
  rest.post(
    'https://clara-marsango-final-project-back-202301.onrender.com/auth/login',
    (_req, res, ctx) => {
      return res(ctx.status(201), ctx.json({ accessToken: 'token' }));
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
];
