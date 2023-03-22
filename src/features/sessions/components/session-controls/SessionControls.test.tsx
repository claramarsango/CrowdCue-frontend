import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../../app/store';
import { errorHandlers } from '../../../../mocks/handlers';
import { server } from '../../../../mocks/server';
import SessionControls from './SessionControls';

describe('Given a component that shows the detail of a session,', () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());

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
});
