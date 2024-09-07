import React from 'react';
import RiverDataComp from '../components/RiverDataComponent';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'

describe("river data component", () => {



    it("renders to the screen", () => {
        render(<RiverDataComp />);
        expect(screen.getByTestId('ChartContainer')).toBeInTheDocument(); // whole component
       
    })
    it('changes after fetching data', async () => {
        render(<RiverDataComp _stationId="02ED027" />);
        expect(screen.getByTestId('Loading')).toBeInTheDocument();
        await waitFor(() => screen.getByTestId('Chart'));
        expect(screen.getByTestId('DeleteButton')).toBeInTheDocument();
        expect(screen.getByTestId('Chart')).toBeInTheDocument();
    });
    it('displays invalid station id if fetch is non sucsessful', async () => {
        render(<RiverDataComp _stationId="NotAStationId" />);
        await waitFor(() => screen.getByText(/Invalid Station Name/i));
        expect(screen.getByTestId('DeleteButton')).toBeInTheDocument();
        expect(screen.getByTestId('Chart')).toBeInTheDocument();
        //expect(screen.getByText(/Invalid Station Name/i)).toBeInTheDocument()
    });
    

    

});