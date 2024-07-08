import { useEffect, useState } from 'react';
import './App.css';
import Chart from './Chart';
import LoadingSpinner from './Loading';


function App() {
    const [data, setData] = useState();
    const [stationName, setStationName] = useState();
    const [loading, setLoading] = useState();

    const stationId = "02FE015";

    useEffect(() => {
        populateRiverData(stationId);
        GetStationDetails(stationId);
    }, []);

    return (
        <div>
            <text> {stationName} </text>
            {loading ? <LoadingSpinner /> : <Chart _data={data} />}
        </div>
    );
    //<label id="riverNameLabel"> River Name.</label>
    //<input type="text" value={stationId} onChange={e => setStationId(e.target.value)} />
    //<button onClick={refreshStation(stationId)}> Refresh</button>

    async function populateRiverData(station) {

        setLoading(true);
        const response = await fetch(`GetRiverData?station=${station}`)
        const data = await response.json();
        setData(data);
        setLoading(false);
    }

    async function GetStationDetails(station) {

        const response = await fetch(`GetStationName?station=${station}`);
        const stationName = await response.text();

        setStationName(stationName);

    }
}

export default App;


