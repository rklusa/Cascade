import React from 'react';
import RiverDataComp from '../components/RiverDataComponent';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'

describe("river data component", () => {
    it(" renders to the screen", () => {
        render(<RiverDataComp />);
        expect(screen.getByTestId('ChartContainer')).toBeInTheDocument(); // whole component
    })

});