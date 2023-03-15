import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Given a log in page,', () => {
  test('when the page is acccessed, it should show a page title', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const titles = screen.getAllByRole('heading');
    expect(titles[1]).toHaveTextContent('LOG IN');
  });
});
