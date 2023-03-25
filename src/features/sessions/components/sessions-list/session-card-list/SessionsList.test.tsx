import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { errorHandlers } from '../../../../../mocks/handlers';
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
});
