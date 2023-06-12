import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Last24HourChart from './Last24HourChart';

describe('<Last24HourChart />', () => {
  test('it should mount', () => {
    render(<Last24HourChart />);
    
    const chart = screen.getByTestId('Last24HourChart');

    expect(chart).toBeInTheDocument();
  });
});