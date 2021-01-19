import '@testing-library/jest-dom';
import * as React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchBySymptom from './KatsuSymptoms';

test('Autocomplete should display a single item', () => {
  const symptoms = [{ name: 'cough' }, { name: 'diarrhea' }];
  render(<SearchBySymptom fetchedSuggestions={symptoms} />);
  userEvent.type(screen.getByRole('textbox'), 'c');
  expect(screen.getByText(/cough/)).toBeInTheDocument();
  expect(screen.getByText(/diarrhea/)).not.toBeInTheDocument();
});

test('Autocomplete should display two items', () => {
  const symptoms = [{ name: 'cough' }, { name: 'colitis' }];
  render(<SearchBySymptom fetchedSuggestions={symptoms} />);
  userEvent.type(screen.getByRole('textbox'), 'c');
  expect(screen.getByText(/cough/)).toBeInTheDocument();
  expect(screen.getByText(/colitis/)).toBeInTheDocument();
});

test('Autocomplete should display no items', () => {
  const symptoms = [{ name: 'cough' }, { name: 'colitis' }];
  render(<SearchBySymptom fetchedSuggestions={symptoms} />);
  userEvent.type(screen.getByRole('textbox'), 'd');
  expect(screen.getByText(/cough/)).not.toBeInTheDocument();
  expect(screen.getByText(/colitis/)).not.toBeInTheDocument();
});
