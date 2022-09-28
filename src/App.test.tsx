import { screen } from '@testing-library/react';

import App from './App';
import { render } from './utils/test';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/contacts/i);
  expect(linkElement).toBeInTheDocument();
});
