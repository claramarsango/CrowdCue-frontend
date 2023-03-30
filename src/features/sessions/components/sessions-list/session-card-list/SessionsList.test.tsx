import { PreloadedState } from '@reduxjs/toolkit';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { RootState } from '../../../../../app/store';
import { errorHandlers } from '../../../../../mocks/handlers';
import { mockedSessions } from '../../../../../mocks/preloaded-state';
import { server } from '../../../../../mocks/server';
import { renderWithProviders } from '../../../../../mocks/test-utils';
import SessionsList from './SessionsList';

describe('Given a session list component,', () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('when the user is not logged in, the page should show an error message', async () => {
    server.use(...errorHandlers);

    renderWithProviders(
      <MemoryRouter>
        <SessionsList />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Unauthorized')).toBeInTheDocument();
    });
  });

  test('when the page loads, it should show a list of sessions', async () => {
    renderWithProviders(
      <MemoryRouter>
        <SessionsList />
      </MemoryRouter>,
    );

    await waitFor(() => {
      const listItem = screen.getAllByRole('listitem');
      expect(listItem.length).toBe(1);
    });
  });

  test('when a user clicks on a session without already being part of another one, they should be redirected to its detail', async () => {
    sessionStorage.setItem('Current Session', '');
    sessionStorage.setItem('User ID', 'participantId');
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SessionsList />} />
          <Route path="/sessions/1234" element={<h1>Session detail</h1>} />
        </Routes>
      </MemoryRouter>,
    );

    const session = await screen.findByText('mockSession');
    userEvent.click(session);

    await waitFor(async () => {
      const title = screen.getByRole('heading');
      await expect(title).toHaveTextContent('Session detail');
    });
  });

  test('when a user clicks on a session already being part of it, they should be redirected to its detail', async () => {
    sessionStorage.setItem('Current Session', '1234');
    sessionStorage.setItem('User ID', '');

    const preloadedState = {
      sessionComponent: mockedSessions[2],
    } as unknown as PreloadedState<RootState>;

    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SessionsList />} />
          <Route path="/sessions/1234" element={<h1>Session detail</h1>} />
        </Routes>
      </MemoryRouter>,
      { preloadedState },
    );

    const session = await screen.findByText('mockSession');
    userEvent.click(session);

    await waitFor(async () => {
      const title = screen.getByRole('heading');
      await expect(title).toHaveTextContent('Session detail');
    });
  });

  test('when a user tries to join but they are already in another session, an error should appear', async () => {
    server.use(...errorHandlers);

    sessionStorage.setItem('Current Session', '12345');
    sessionStorage.setItem('User ID', 'participantId');

    renderWithProviders(
      <MemoryRouter>
        <SessionsList />
      </MemoryRouter>,
    );

    const session = await screen.findByText('mockSession');
    userEvent.click(session);

    await waitFor(async () => {
      const errorMessage = await screen.findByText(
        'You are already participating in a session',
      );
      await expect(errorMessage).toBeInTheDocument();
    });
  });
});
