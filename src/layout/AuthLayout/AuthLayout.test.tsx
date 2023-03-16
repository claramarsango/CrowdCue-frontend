import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthLayout from './AuthLayout';

describe('Given an authorization layout,', () => {
  test('when one of its pages is accessed, then return the app title', () => {
    render(
      <MemoryRouter>
        <AuthLayout />
      </MemoryRouter>,
    );

    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
  });
});
