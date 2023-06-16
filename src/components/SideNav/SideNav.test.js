import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SideNav from "../SideNav/SideNav.tsx";

describe('<SideNav />', () => {
  test('it should mount', () => {
    render(<SideNav />);
    
    const sideNav = screen.getByTestId('SideNav');

    expect(sideNav).toBeInTheDocument();
  });
});