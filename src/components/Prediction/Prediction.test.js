import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Prediction from './Prediction';

describe('<Prediction />', () => {
  test('it should mount', () => {
    render(<Prediction />);
    
    const prediction = screen.getByTestId('Prediction');

    expect(prediction).toBeInTheDocument();
  });
});