import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DataPage from './DataPage';

describe('<DataPage />', () => {
  test('it should mount', () => {
    render(<DataPage />);
    
    const dataPage = screen.getByTestId('DataPage');

    expect(dataPage).toBeInTheDocument();
  });
});