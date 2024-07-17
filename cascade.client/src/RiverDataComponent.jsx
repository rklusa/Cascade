import Chart from './Chart';
import LoadingSpinner from './Loading';
import { useEffect, useState } from 'react';

function RiverDataComp({_chart, _stationId, _DeleteChart }) {
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
            <button onClick={() => _DeleteChart(_chart.id)} > X </button>
            {loading ? <LoadingSpinner /> : <Chart _data={data} />}
        </div>
    );

    async function populateRiverData(station) {

        setLoading(true);

        try {
            const response = await fetch(`GetRiverData?station=${station}`)

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();

            if (data.length == 0) {
                console.log("invalid station id");
            }
            else {
                setData(data);
            }

        } catch (e) {
            console.log(e);
        }

        setLoading(false);

    }

    async function GetStationDetails(station) {

        try {
            const response = await fetch(`GetStationName?station=${station}`);

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const stationName = await response.text();
            let name = "";

            if (stationName == "") {
                name = "Invalid Station Name";
            } else {
                name = stationName;
            }

            setStationName(name);

        } catch (e) {
            console.log(e);
        }

    }
}

export default RiverDataComp;