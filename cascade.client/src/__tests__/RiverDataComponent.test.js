import React from 'react';
import RiverDataComp from '../components/RiverDataComponent';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { populateRiverData, GetStationDetails } from '../components/ApiController';

const unmockedFetch = global.fetch

beforeAll(() => {
    global.fetch = () =>
        Promise.resolve({
            json: () => Promise.resolve([]),
        })
})

afterAll(() => {
    global.fetch = unmockedFetch
})

describe("river data component", () => {

    

    it("renders to the screen", () => {
        render(<RiverDataComp _stationId="NotAStationId" />);
        expect(screen.getByTestId('ChartObjContainer')).toBeInTheDocument(); // whole component
       
    })
    it('changes after fetching data', async () => {
        render(<RiverDataComp _stationId="02ED027" />);
        await waitFor(() => { screen.findByTestId('Chart') }, { timeout: 5000 });
        expect(screen.getByTestId('DeleteButton')).toBeInTheDocument();
        expect(screen.getByTestId('Chart')).toBeInTheDocument();
    });
    it('displays invalid station id if fetch is non sucsessful', async () => {
        render(<RiverDataComp _stationId="NotAStationId" />);
       
        await waitFor(() => { screen.findByText(/Invalid Station Name/i) }, { timeout: 5000 });
        expect(screen.getByTestId('DeleteButton')).toBeInTheDocument();
        expect(screen.getByTestId('Chart')).toBeInTheDocument();
        expect(screen.findByText(/Invalid Station Name/i)).not.toBeNull();
    });
    it('Shows loading while fetching', async () => {
        render(<RiverDataComp _stationId="NotAStationId" />);
        expect(screen.queryByTestId('LoadingContainer')).toBeInTheDocument();
        await waitFor(() => { screen.findByTestId('Chart') }, { timeout: 5000 });
        expect(screen.queryByTestId('LoadingContainer')).not.toBeInTheDocument();
    });

    

    

});