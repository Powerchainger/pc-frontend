import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Chart from './Chart';

describe('<Chart />', () => {
  test('it should mount', () => {
    render(<Chart />);
    
    const chart = screen.getByTestId('Chart');

    expect(chart).toBeInTheDocument();
  });
});