import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../app/store';
import Login from './Login';

describe('Given a log in page,', () => {
  test('when the page is acccessed, it should show a page title', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
        ,
      </Provider>,
    );

    const titles = screen.getByTestId('heading');
    expect(titles).toHaveTextContent('LOG IN');
  });
});
