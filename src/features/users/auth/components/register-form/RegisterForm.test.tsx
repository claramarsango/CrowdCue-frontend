import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../../../app/store';
import { errorHandlers } from '../../../../../mocks/handlers';
import { server } from '../../../../../mocks/server';
import RegisterForm from './RegisterForm';

describe('Given a register form,', () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('when the user tries to register with an invalid email, then it should show a related error message', async () => {
    server.use(...errorHandlers);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterForm />
        </MemoryRouter>
      </Provider>,
    );

    await userEvent.type(screen.getByLabelText('Email'), 'exampleemail.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      const errorMessage = screen.getByRole('paragraph');
      expect(errorMessage).toHaveTextContent('"email" must be valid email');
    });
  });

  test('when the user tries to register with a valid email and passwords, it should show a related message', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterForm />
        </MemoryRouter>
      </Provider>,
    );

    await userEvent.type(screen.getByLabelText('Email'), 'example2@email.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password');
    await userEvent.type(screen.getByLabelText('Confirm password'), 'password');
    userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      const successMessage = screen.getByText('User registered successfully!');
      expect(successMessage).toBeInTheDocument();
    });
  });
});
