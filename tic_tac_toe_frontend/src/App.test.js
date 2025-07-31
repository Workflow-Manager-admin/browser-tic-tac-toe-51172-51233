import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders tic tac toe header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Tic Tac Toe/i);
  expect(headerElement).toBeInTheDocument();
});

test('allows player X to make a move', () => {
  render(<App />);
  // Find all squares (should be 9)
  const squares = screen.getAllByRole("button", { name: /Cell:|Empty cell/i });
  // Click the first cell
  fireEvent.click(squares[0]);
  expect(squares[0].textContent).toBe('X');
});

test('prevents move on filled square', () => {
  render(<App />);
  const squares = screen.getAllByRole("button", { name: /Cell:|Empty cell/i });
  fireEvent.click(squares[0]); // X
  fireEvent.click(squares[0]); // O tries to override
  expect(squares[0].textContent).toBe('X');
});

test('shows winner when X wins first row', () => {
  render(<App />);
  const squares = screen.getAllByRole("button", { name: /Cell:|Empty cell/i });
  // X O X in first row
  fireEvent.click(squares[0]); // X
  fireEvent.click(squares[3]); // O
  fireEvent.click(squares[1]); // X
  fireEvent.click(squares[4]); // O
  fireEvent.click(squares[2]); // X -> X wins
  const status = screen.getByText(/Winner: X/i);
  expect(status).toBeInTheDocument();
});

test('reset button clears the board', () => {
  render(<App />);
  const squares = screen.getAllByRole("button", { name: /Cell:|Empty cell/i });
  fireEvent.click(squares[0]);
  const resetBtn = screen.getByRole("button", { name: /reset game/i });
  fireEvent.click(resetBtn);
  // All squares should be empty
  const squaresAfter = screen.getAllByRole("button", { name: /Cell:|Empty cell/i });
  squaresAfter.forEach(square => expect(square.textContent).toBe(''));
});
