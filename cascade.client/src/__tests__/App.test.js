import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';
import { populateRiverData, GetStationDetails } from '../components/ApiController';

jest.mock('../components/ApiController', () => ({
    populateRiverData: jest.fn(() => [{ date: "day1", value: 1 }, { date: "day2", value: 2 }, { date: "day3", value: 3 }, { date: "day4", value: 4 }]),
    GetStationDetails: jest.fn(() => 'A Valid Station Name')
}));

afterEach(() => {
    jest.clearAllMocks();
});

describe('App', () => {
    beforeEach(() => {

    });

    it('mocks api', () => {
        expect(populateRiverData()).toStrictEqual([{ date: "day1", value: 1 }, { date: "day2", value: 2 }, { date: "day3", value: 3 }, { date: "day4", value: 4 }]);
        expect(GetStationDetails()).toBe('A Valid Station Name');
    });

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
        const lookupButton = screen.getByTestId('LookupButton');
        const addButton = screen.getByTestId('AddChartButton');
        const input = screen.getByTestId('StationIdInput');
        fireEvent.click(lookupButton);
        fireEvent.change(input, { target: { value: '02FE015' } });
        fireEvent.click(addButton);
        expect(screen.queryByTestId('LookupContainer')).not.toBeInTheDocument();
    });
    it('adds chart when button is clicked with station id from input', () => {
        render(<App />);
        const button = screen.getByTestId('AddChartButton');
        const input = screen.getByTestId('StationIdInput');
        fireEvent.change(input, { target: { value: '02FE015' } });
        fireEvent.click(button);
        expect(screen.getByTestId('ChartObjContainer')).toBeInTheDocument();
    });
    it('deletes a chart when button is pushed', async () => {
        render(<App />);
        const button = screen.getByTestId('AddChartButton');
        const input = screen.getByTestId('StationIdInput');
        fireEvent.change(input, { target: { value: '02FE015' } });
        fireEvent.click(button);
        await waitFor(() => { screen.findByTestId('DeleteButton') }, { timeout: 5000 });
        const delButton = screen.getByTestId('DeleteButton');
        fireEvent.click(delButton);
        expect(screen.queryByTestId('ChartObjContainer')).not.toBeInTheDocument();
    });
    it('adds a summary to the container', async () => {
        render(<App />);
        const button = screen.getByTestId('AddChartButton');
        const input = screen.getByTestId('StationIdInput');
        fireEvent.change(input, { target: { value: '02FE015' } });
        fireEvent.click(button);
        await waitFor(() => { screen.getByTestId('SummaryComponent') }, { timeout: 5000 });
        expect(screen.getByTestId('SummaryComponent')).toBeInTheDocument();
    });
    it('will not add the same chart twice', () => {
        const { getAllByTestId, getByTestId } = render(<App />);
        const container = getByTestId('AppContainer')
        const button = screen.getByTestId('AddChartButton');
        const input = screen.getByTestId('StationIdInput');
        fireEvent.change(input, { target: { value: '02FE015' } });
        fireEvent.click(button);
        fireEvent.click(button);
        const chartsInContainer = within(container).getAllByTestId('ChartObjContainer')
        expect(chartsInContainer.length).toBe(1);
    });
    it('will not add a chart if Add Chart is pressed with an empty station id input', () => {
        render(<App />);
        const button = screen.getByTestId('AddChartButton');
        //const input = screen.getByTestId('StationIdInput');
        //fireEvent.change(input, { target: { value: '02FE015' } });
        fireEvent.click(button);
        expect(screen.queryByTestId('ChartObjContainer')).not.toBeInTheDocument();
    })
});