import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../../../app/store';
import { errorHandlers } from '../../../../../mocks/handlers';
import { server } from '../../../../../mocks/server';
import SessionsList from './SessionsList';

describe('Given a session list component,', () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('when the user is not logged in, the page should show an error message', async () => {
    server.use(...errorHandlers);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SessionsList />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Unauthorized')).toBeInTheDocument();
    });
  });
  test('when the page loads, it should show a list of sessions', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SessionsList />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      const listItem = screen.getAllByRole('listitem');
      expect(listItem.length).toBe(1);
    });
  });
});
