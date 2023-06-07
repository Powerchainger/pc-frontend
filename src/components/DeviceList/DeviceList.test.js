import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DeviceList from './DeviceList';

describe('<DeviceList />', () => {
  test('it should mount', () => {
    render(<DeviceList />);
    
    const deviceList = screen.getByTestId('DeviceList');

    expect(deviceList).toBeInTheDocument();
  });
});