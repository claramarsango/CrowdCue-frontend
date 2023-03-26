import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../mocks/test-utils';
import MainLayout from './MainLayout';

describe('Given a main layout,', () => {
  test('when the layout loads, it should include a header and a main section', async () => {
    renderWithProviders(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
