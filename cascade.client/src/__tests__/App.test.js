import React from 'react';
import RiverDataComp from '../components/RiverDataComponent';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';

describe('App', () => {
    it('renders correctly', () => {
        render(<App />);
        expect(screen.getByTestId('AppContainer')).toBeInTheDocument(); // whole component
        expect(screen.getByTestId('NavContainer')).toBeInTheDocument();
        expect(screen.getByTestId('LookupButton')).toBeInTheDocument();
        expect(screen.getByTestId('AddChartButton')).toBeInTheDocument();
        expect(screen.getByTestId('StationIdInput')).toBeInTheDocument();
    });
    it('opens lookup menu when clicked', () => {
        render(<App />);
        const button = screen.getByTestId('LookupButton');
        fireEvent.click(button);
        expect(screen.getByTestId('LookupContainer')).toBeInTheDocument();
    });
    it('adds chart when button is clicked with station id from input', () => {
        render(<App />);
        const button = screen.getByTestId('AddChartButton');
        const input = screen.getByTestId('StationIdInput');
        fireEvent.change(input, { target: { value: '02ED027' } });
        fireEvent.click(button);
        expect(screen.getByTestId('ChartContainer')).toBeInTheDocument();
    });
});