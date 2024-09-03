import React from 'react';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import SummariesComp from '../components/SummariesComponent';

// *PROPS* _stationName, _stationId, _currentValue
describe("summary component", () => {
    it("renders correctly with props", () => {
        const { getByText } = render(<SummariesComp _stationName="StationName" _stationId="12345" _currentValue="1.2345" />);
        const name = getByText(/StationName/i);
        const id = getByText(/12345/i);
        const val = getByText(/1.2/i); // this also ensures that the number formatter is working correctly

        expect(name).toBeInTheDocument();
        expect(id).toBeInTheDocument();
        expect(val).toBeInTheDocument();
    });
});


