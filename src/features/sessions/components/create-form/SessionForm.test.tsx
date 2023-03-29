import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { store } from '../../../../app/store';
import { server } from '../../../../mocks/server';
import SessionForm from './SessionForm';

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Given a form to create a session when the user provides an image and a title', () => {
  afterAll(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('then a session should be created', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: jest.fn().mockResolvedValue({
        session: {
          title: 'mockSession',
          coverImageURL: 'img',
          url: 'url',
          currentSong: '',
          queuedSongs: [],
          admin: 'mockUserId',
          participants: [],
          _id: 123,
        },
      }),
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/form']}>
          <Routes>
            <Route path="/form" element={<SessionForm />} />
            <Route path="/sessions/123" element={<h1>Detail</h1>} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const file = new File(['session-cover'], 'session-cover.jpeg');
    const imgInput = screen.getByTestId('img-input');

    userEvent.type(await screen.findByLabelText('Title'), 'session-title');
    userEvent.upload(imgInput, file);

    userEvent.click(await screen.findByRole('button'));

    await waitFor(async () => {
      const heading = await screen.findByRole('heading');
      expect(heading).toHaveTextContent('Detail');
    });
  });
});
describe('Given a form to create a session,', () => {
  afterAll(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  test('when the user does not provide a title, then they should receive an error', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest
        .fn()
        .mockResolvedValue({ msg: 'Your session must have a title' }),
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SessionForm />
        </MemoryRouter>
      </Provider>,
    );

    const button = await screen.findByRole('button');

    userEvent.click(button);

    await waitFor(() => {
      const errorMessage = screen.getByRole('paragraph');
      expect(errorMessage).toHaveTextContent('Your session must have a title');
    });
  });
});
