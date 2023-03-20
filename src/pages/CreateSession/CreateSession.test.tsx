import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import CreateSession from './CreateSession';

describe('Given a page to create a session,', () => {
  test('when it loads, it should include a title', () => {
    render(
      <Provider store={store}>
        <CreateSession />
      </Provider>,
    );

    const pageTitle = screen.getByRole('heading');

    expect(pageTitle).toBeInTheDocument();
  });
});
