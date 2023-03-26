import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../mocks/test-utils';
import CheckAuth from './CheckAuth';

describe('Given a component to check if a user is authenticated', () => {
  test('when the user has an access token, then they should be able to see what is on the page', async () => {
    sessionStorage.setItem('Access Token', 'test');
    sessionStorage.setItem('User ID', '');

    renderWithProviders(
      <MemoryRouter>
        <CheckAuth children={<h1>Test</h1>} />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });
});
