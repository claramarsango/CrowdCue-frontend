import { PreloadedState } from '@reduxjs/toolkit';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { RootState } from '../../../../app/store';
import { errorHandlers } from '../../../../mocks/handlers';
import { mockedSessions } from '../../../../mocks/preloaded-state';
import { server } from '../../../../mocks/server';
import { renderWithProviders } from '../../../../mocks/test-utils';
import SessionDetail from '../../../../pages/SessionDetail/SessionDetail';

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Given a component that shows the detail of a session,', () => {
  const preloadedState = {
    sessionComponent: mockedSessions[0],
  } as unknown as PreloadedState<RootState>;

  const invalidMockId = '123456789123456789123456';

  const preloadedStateInvalid = {
    sessionComponent: mockedSessions[1],
  } as unknown as PreloadedState<RootState>;
  test('when the detail of a session is accessed, it should show its title', async () => {
    sessionStorage.setItem('Current Session', '1234');
    renderWithProviders(
      <MemoryRouter>
        <SessionDetail />
      </MemoryRouter>,
      { preloadedState },
    );

    await waitFor(() => {
      const sessionTitle = screen.getByText('mockSessionById');
      expect(sessionTitle).toBeInTheDocument();
    });
  });
  test('when the session does not exist, it should show an error message', async () => {
    server.use(...errorHandlers);

    sessionStorage.setItem('Current Session', invalidMockId);

    renderWithProviders(
      <MemoryRouter>
        <SessionDetail />
      </MemoryRouter>,
      { preloadedState: preloadedStateInvalid },
    );

    await waitFor(() => {
      const errorMessage = screen.getByText('This session does not exist');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('when an error is shown and the user clicks the go back home button, they should be redirected', async () => {
    server.use(...errorHandlers);
    const invalidMockId = '123456789123456789123456';
    sessionStorage.setItem('Current Session', invalidMockId);

    renderWithProviders(
      <MemoryRouter initialEntries={['/detail']}>
        <Routes>
          <Route path="/detail" element={<SessionDetail />} />
          <Route path="/" element={<h1>Explore</h1>} />
        </Routes>
      </MemoryRouter>,
      { preloadedState: preloadedStateInvalid },
    );

    const redirectBtn = await screen.findByText('Go back home');
    userEvent.click(redirectBtn);

    await waitFor(async () => {
      const title = await screen.findByRole('heading');
      expect(title).toHaveTextContent('Explore');
    });
  });

  test('when the admin of a session tries to delete it, a modal message should pop up', async () => {
    sessionStorage.setItem('Current Session', '1234');
    sessionStorage.setItem('User ID', '');

    renderWithProviders(
      <MemoryRouter>
        <SessionDetail />
      </MemoryRouter>,
      { preloadedState },
    );

    await waitFor(async () => {
      await userEvent.click(screen.getAllByText('End session')[0]);
      await expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
  });

  test('when a participant tries to leave, a modal message should pop up', async () => {
    sessionStorage.setItem('Current Session', '1234');
    sessionStorage.setItem('User ID', 'participantId');

    renderWithProviders(
      <MemoryRouter>
        <SessionDetail />
      </MemoryRouter>,
      { preloadedState },
    );

    await waitFor(async () => {
      await userEvent.click(screen.getAllByText('Leave session')[0]);
      await expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
  });

  test('when a participant clicks on Cancel, the modal message should close', async () => {
    sessionStorage.setItem('Current Session', '1234');

    renderWithProviders(
      <MemoryRouter>
        <SessionDetail />
      </MemoryRouter>,
      { preloadedState },
    );

    await waitFor(async () => {
      await userEvent.click(screen.getAllByText('Leave session')[0]);
      await userEvent.click(screen.getByText('Cancel'));
      await expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    });
  });

  test('when the admin of the session clicks on Cancel, the modal message should close', async () => {
    sessionStorage.setItem('Current Session', '1234');
    sessionStorage.setItem('User ID', '');

    renderWithProviders(
      <MemoryRouter>
        <SessionDetail />
      </MemoryRouter>,
      { preloadedState },
    );

    await waitFor(async () => {
      await userEvent.click(screen.getAllByText('End session')[0]);
      await userEvent.click(screen.getByText('Cancel'));
      await expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    });
  });

  test('when the user leaves as a participant they should be redirected to the explore page', async () => {
    sessionStorage.setItem('User ID', 'participantId');
    sessionStorage.setItem('Current Session', '1234');

    renderWithProviders(
      <MemoryRouter initialEntries={['/detail']}>
        <Routes>
          <Route path="/detail" element={<SessionDetail />}></Route>
          <Route path="/" element={<h1>Navigation OK</h1>}></Route>
        </Routes>
      </MemoryRouter>,
      { preloadedState },
    );

    await waitFor(async () => {
      const title = await screen.findByRole('heading');
      expect(title).toHaveTextContent('mockSessionById');
    });

    const exitBtn = screen.getByText('Leave session');
    userEvent.click(exitBtn);

    const modalExitBtn = await screen.findByTestId('leave-session-button');
    userEvent.click(modalExitBtn);

    await waitFor(async () => {
      const title = await screen.findByRole('heading');
      expect(title).toHaveTextContent('Navigation OK');
    });
  });

  test('when the admin of a session deletes it, they should be redirected', async () => {
    sessionStorage.setItem('User ID', '');
    sessionStorage.setItem('Current Session', '1234');

    renderWithProviders(
      <MemoryRouter initialEntries={['/detail']}>
        <Routes>
          <Route path="/detail" element={<SessionDetail />}></Route>
          <Route path="/" element={<h1>Home</h1>}></Route>
        </Routes>
      </MemoryRouter>,
      { preloadedState },
    );

    await waitFor(async () => {
      const title = await screen.findByRole('heading');
      expect(title).toHaveTextContent('mockSessionById');
    });

    const deletetBtn = screen.getByText('End session');
    userEvent.click(deletetBtn);

    const modalDeleteBtn = await screen.findByTestId('modal-end-button');
    userEvent.click(modalDeleteBtn);

    await waitFor(async () => {
      const title = await screen.findByRole('heading');
      expect(title).toHaveTextContent('Home');
    });
  });
});
