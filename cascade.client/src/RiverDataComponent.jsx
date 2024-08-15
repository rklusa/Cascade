import Chart from './Chart';
import LoadingSpinner from './Loading';
import { useEffect, useState } from 'react';


function RiverDataComp({_chart, _stationId, _DeleteChart, _AddSummary }) {
    const [loading, setLoading] = useState();
    const [data, setData] = useState();
    const [stationName, setStationName] = useState();
    const [lastEntry, setLastEntry] = useState();
    const [stationId, setStationId] = useState();

    useEffect(() => {
        if (_stationId === null || _stationId === "") {
            return;
        }
        console.log("making api calls");
        populateRiverData(_stationId);
        GetStationDetails(_stationId);
        setStationId(_stationId);
    }, []);

    useEffect(() => {
        if (data === undefined || data.length == 0) {
            return;
        }
        else if (stationName === undefined || stationName == "") {
            return;
        }
        else {
            console.log(`adding summary, ${stationName} ${stationId} ${lastEntry}`);
            _AddSummary(_chart.id, stationName, stationId, lastEntry);
        }
        
        
    }, [data, stationName]);

    return (
        <div className="ChartObj">
            <label> {stationName} </label>
            {loading ? <label></label> : <button onClick={() => _DeleteChart(_chart.id)} > X </button>}
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
                setLastEntry(data[data.length - 1].value);
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