import React from 'react';
import StationLookupComp from '../components/StationLookupComponent';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'

describe("station lookup component", () => {
    it("renders to the screen", () => {
        render(<StationLookupComp />);
        expect(screen.getByTestId('LookupContainer')).toBeInTheDocument(); // whole component
        expect(screen.getByTestId('SearchInput')).toBeInTheDocument(); // the search bar input field
        expect(screen.getByTestId('ResultsContainer')).toBeInTheDocument();// the list box with results

    });
    it("updates the text box text", () => {
        render(<StationLookupComp />);
        const input = screen.getByTestId('SearchInput');
        fireEvent.change(input, { target: { value: 'mait' } });
        expect(screen.getByTestId('SearchInput')).toHaveValue('mait')
    });
    it("updates the results", () => {
        render(<StationLookupComp />);
        const input = screen.getByTestId('SearchInput');
        fireEvent.change(input, { target: { value: 'mait' } });
        expect(screen.getByTestId('ResultsContainer')).toHaveTextContent(/Maitland/i)
    });
})