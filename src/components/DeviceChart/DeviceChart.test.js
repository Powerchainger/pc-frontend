import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DeviceChart from './DeviceChart';

describe('<DeviceChart />', () => {
  test('it should mount', () => {
    render(<DeviceChart />);
    
    const deviceChart = screen.getByTestId('DeviceChart');

    expect(deviceChart).toBeInTheDocument();
  });
});