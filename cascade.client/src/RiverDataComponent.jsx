import Chart from './Chart';
import LoadingSpinner from './Loading';
import { useEffect, useState } from 'react';

function RiverDataComp({ _stationId, _stationName, _loading }) {
    const [loading, setLoading] = useState();
    const [data, setData] = useState();
    const [stationName, setStationName] = useState();

    useEffect(() => {
        if (_stationId === null || _stationId === "") {
            return;
        }
        console.log("making api calls");
        populateRiverData(_stationId);
        GetStationDetails(_stationId);
    }, []);

    return (
        <div>
            <text> {stationName} </text>
            {loading ? <LoadingSpinner /> : <Chart _data={data} />}
        </div>
    );

    async function populateRiverData(station) {

        //setLoading(true);
        //const response = await fetch(`GetRiverData?station=${station}`)
        //const data = await response.json();
        //setData(data);
        //setLoading(false);

        setLoading(true);

        try {
            const response = await fetch(`GetRiverData?station=${station}`)

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            setData(data);
        } catch (err) {
            console.log(err);
        }

        setLoading(false);

    }

    async function GetStationDetails(station) {

        const response = await fetch(`GetStationName?station=${station}`);
        const stationName = await response.text();

        setStationName(stationName);

    }
}

export default RiverDataComp;