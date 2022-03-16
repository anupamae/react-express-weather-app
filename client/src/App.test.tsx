import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Weather App/i);
  expect(headerElement).toBeInTheDocument();
  expect(headerElement.className).toBe('header header__h1');
});

test('renders footer', () => {
  render(<App />);
  const footerElement = screen.getByText(/Anupama Ellath/i);
  expect(footerElement).toBeInTheDocument();
  expect(footerElement.className).toBe('footer footer__p');
});
