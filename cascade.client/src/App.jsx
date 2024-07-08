import { useEffect, useState } from 'react';
import './App.css';
import Chart from './Chart';


function App() {
    const [data, setData] = useState();
    const [stationName, setStationName] = useState();

    const stationId = "02FE015";

    useEffect(() => {
        populateRiverData(stationId);
        GetStationDetails(stationId);
    }, []);

    return (
        <div>
            <text> {stationName} </text>
            <Chart _data={data} />
        </div>
    );
    //<label id="riverNameLabel"> River Name.</label>
    //<input type="text" value={stationId} onChange={e => setStationId(e.target.value)} />
    //<button onClick={refreshStation(stationId)}> Refresh</button>

    async function populateRiverData(station) {
        
        const response = await fetch(`GetRiverData?station=${station}`);
            const data = await response.json();
            setData(data);
    }

    async function GetStationDetails(station) {

        const response = await fetch(`GetStationName?station=${station}`);
        const stationName = await response.text();
        setStationName(stationName);
    }
}

export default App;


