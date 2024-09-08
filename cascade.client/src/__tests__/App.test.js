import React from 'react';
import RiverDataComp from '../components/RiverDataComponent';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
        expect(screen.getByTestId('SummariesContainer')).toBeInTheDocument();
    });
    it('opens lookup menu when clicked', () => {
        render(<App />);
        const button = screen.getByTestId('LookupButton');
        fireEvent.click(button);
        expect(screen.getByTestId('LookupContainer')).toBeInTheDocument();
        fireEvent.click(button);
        expect(screen.queryByTestId('LookupContainer')).not.toBeInTheDocument();
    });
    it('adds chart when button is clicked with station id from input', () => {
        render(<App />);
        const button = screen.getByTestId('AddChartButton');
        const input = screen.getByTestId('StationIdInput');
        fireEvent.change(input, { target: { value: '02ED027' } });
        fireEvent.click(button);
        expect(screen.getByTestId('ChartObjContainer')).toBeInTheDocument();
    });
    
    it('removes a chart when the button is pressed', async () => {
        render(<App />);
        const button = screen.getByTestId('AddChartButton');
        const input = screen.getByTestId('StationIdInput');
        fireEvent.change(input, { target: { value: '02ED027' } });
        fireEvent.click(button);
        await waitFor(() => screen.getByTestId('Chart'));
        const delButton = screen.getByTestId('DeleteButton');
        fireEvent.click(delButton);
        expect(delButton).not.toBeInTheDocument();
    })
    it('adds station id to main input when using the station lookup', () => {
        render(<App />);
        const button = screen.getByTestId('LookupButton');
        fireEvent.click(button);
        const input = screen.getByTestId('SearchInput');
        fireEvent.change(input, { target: { value: 'maitland' } });
        fireEvent.click(screen.getByText('LITTLE MAITLAND RIVER AT BLUEVALE'));
        expect(screen.getByTestId('StationIdInput')).toHaveValue('02FE007');
    });
    it('closes lookup when add chart button is pressed', () => {
        render(<App />);
        const button = screen.getByTestId('AddChartButton');
        const input = screen.getByTestId('StationIdInput');
        fireEvent.change(input, { target: { value: '02ED027' } });
        fireEvent.click(button);
        expect(screen.queryByTestId('LookupContainer')).not.toBeInTheDocument();
    });
    
});