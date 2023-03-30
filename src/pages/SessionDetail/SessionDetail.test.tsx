import { render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../app/store';
import SessionDetail from './SessionDetail';

describe('Given a detail page for a session,', () => {
  test('when a session id is given, it should show its title', async () => {
    sessionStorage.setItem('Current Session', '');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SessionDetail />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });
  });
});
