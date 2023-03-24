import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../../../app/store';
import { errorHandlers } from '../../../../../mocks/handlers';
import { server } from '../../../../../mocks/server';
import LoginForm from './LoginForm';

describe('Given a log in form,', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test('when the user logs in with an existing account, its loginState state should become success', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    );

    const submitButton = screen.getByRole('button');

    fireEvent.click(submitButton);

    await waitFor(async () => {
      const token = await sessionStorage.getItem('Access Token');
      expect(token).toBe('token');
    });
  });

  test('When the user logs in with an unregistered account, it should show an error message', async () => {
    server.use(...errorHandlers);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    );

    const submitButton = screen.getByRole('button');

    fireEvent.click(submitButton);

    const loading = screen.getByTestId('loading-spinner');
    expect(loading).toBeInTheDocument();

    await waitFor(async () => {
      const errorMessage = await screen.findByRole('paragraph');
      expect(errorMessage).toHaveTextContent(
        'There is no registered user with this email and password',
      );
    });
  });
});
