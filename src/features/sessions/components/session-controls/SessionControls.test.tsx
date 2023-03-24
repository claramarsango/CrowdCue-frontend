import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../../app/store';
import { errorHandlers } from '../../../../mocks/handlers';
import { server } from '../../../../mocks/server';
import SessionControls from './SessionControls';

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Given a component that shows the detail of a session,', () => {
  test('when the detail of a session is accessed, it should show its title', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SessionControls sessionId="1234" />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      const sessionTitle = screen.getByText('mockSessionById');
      expect(sessionTitle).toBeInTheDocument();
    });
  });
  test('when the session does not exist, it should show an error message', async () => {
    server.use(...errorHandlers);

    const invalidMockId = '123456789123456789123456';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SessionControls sessionId={invalidMockId} />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      const errorMessage = screen.getByText('This session does not exist');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('when the admin of a session tries to delete it, a modal message should pop up', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SessionControls sessionId="1234" />
        </MemoryRouter>
      </Provider>,
    );

    await act(() => {
      sessionStorage.setItem('User ID', '');
    });

    await waitFor(async () => {
      await userEvent.click(screen.getAllByText('End session')[0]);
      await expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
  });

  test('when the user clicks on Cancel, the modal message should close', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SessionControls sessionId="1234" />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(async () => {
      await userEvent.click(screen.getAllByText('End session')[0]);
      await userEvent.click(screen.getByText('Cancel'));
      await expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    });
  });

  test('when the user clicks on a button they should be redirected to the explore page', async () => {
    sessionStorage.setItem('User ID', '');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SessionControls sessionId="1234" />
        </MemoryRouter>
      </Provider>,
    );
    await expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(async () => {
      await userEvent.click(screen.getByText('End session'));
      await userEvent.click(screen.getByTestId('modal-end-button'));
    });

    await waitFor(async () => {
      await expect(screen.getByText(/mockSession/i)).toBeInTheDocument();
    });
  });

  /* test('when the session does not exist, the page should show an error', async () => {
    server.use(...errorHandlers);

    const invalidMockId = '123456789123456789123456';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Modal setIsOpen={() => {}} sessionId={invalidMockId} />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(async () => {
      await userEvent.click(screen.getByTestId('modal-end-button'));
    });

    await waitFor(() => {
      expect(
        screen.getByText('This session does not exist'),
      ).toBeInTheDocument();
    });
  }); */
});
