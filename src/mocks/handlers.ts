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
    async (req, res, ctx) => {
      return res.once(
        ctx.status(400),
        ctx.json({ msg: '"email" must be valid email' }),
      );
    },
  ),
];
