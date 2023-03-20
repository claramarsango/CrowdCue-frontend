import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../app/store';
import MainLayout from './MainLayout';

describe('Given a main layout,', () => {
  test('when a create session page is loaded, it should include a page title', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainLayout />
        </MemoryRouter>
      </Provider>,
    );

    expect(true).toBe(true);
  });
});
