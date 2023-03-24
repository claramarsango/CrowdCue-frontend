import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../../app/store';
import { errorHandlers } from '../../../../mocks/handlers';
import { server } from '../../../../mocks/server';
import Modal from '../modal/Modal';
import SessionControls from '../session-controls/SessionControls';

describe('Given a component that shows the detail of a session,', () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test('when the session does not exist, the page should show an error', async () => {
    server.use(...errorHandlers);

    sessionStorage.setItem('User ID', '');
    const invalidMockId = '123456789123456789123457';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SessionControls sessionId={'1234'} />
        </MemoryRouter>
      </Provider>,
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Modal setIsOpen={() => {}} sessionId={invalidMockId} />
        </MemoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByText('End session'));

    await waitFor(async () => {
      await expect(
        screen.getByText('This session does not exist'),
      ).toBeInTheDocument();
    });
  });
});
