import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders Todo App header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Todo App/i);
  expect(headerElement).toBeInTheDocument();
});

test('adds a new todo', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Add a new task/i);
  const addButton = screen.getByText(/Add/i);
  fireEvent.change(inputElement, { target: { value: 'New Todo' } });
  fireEvent.click(addButton);
  const todoElement = screen.getByText(/New Todo/i);
  expect(todoElement).toBeInTheDocument();
});

test('toggles a todo', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Add a new task/i);
  const addButton = screen.getByText(/Add/i);
  fireEvent.change(inputElement, { target: { value: 'New Todo' } });
  fireEvent.click(addButton);
  const todoElement = screen.getByText(/New Todo/i);
  fireEvent.click(todoElement);
  expect(todoElement).toHaveClass('completed');
});

test('archives a todo', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Add a new task/i);
  const addButton = screen.getByText(/Add/i);
  fireEvent.change(inputElement, { target: { value: 'New Todo' } });
  fireEvent.click(addButton);
  const archiveButton = screen.getByLabelText(/Archive/i);
  fireEvent.click(archiveButton);
  const todoElement = screen.queryByText(/New Todo/i);
  expect(todoElement).not.toBeInTheDocument();
});