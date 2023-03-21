import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../app/store';
import ExploreSessions from './ExploreSessions';

describe('Given an explore page,', () => {
  test('when the page loads, the user should see a page title', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ExploreSessions />
        </MemoryRouter>
      </Provider>,
    );

    const pageTitle = screen.getAllByRole('heading');
    expect(pageTitle[0]).toBeInTheDocument();
  });
});
