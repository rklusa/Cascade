import React from 'react';
import RiverDataComp from '../components/RiverDataComponent';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { populateRiverData, GetStationDetails } from '../components/ApiController';

const unmockedFetch = global.fetch;

describe("river data component", () => {

    it("renders to the screen", () => {
        render(<RiverDataComp _stationId="NotAStationId" />);
        expect(screen.getByTestId('ChartObjContainer')).toBeInTheDocument(); // whole component
       
    })
    it('displays invalid station id if fetch is non sucsessful', async () => {
        render(<RiverDataComp _stationId="NotAStationId" />);
       
        await waitFor(() => { screen.findByText(/Invalid Station Name/i) }, { timeout: 5000 });
        expect(screen.getByTestId('DeleteButton')).toBeInTheDocument();
        expect(screen.getByTestId('Chart')).toBeInTheDocument();
        expect(screen.findByText(/Invalid Station Name/i)).not.toBeNull();
    });
});