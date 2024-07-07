import { useEffect, useState } from 'react';
import './App.css';
import Chart from './Chart';


function App() {
    const [data, setData] = useState();
    const [stationId, setStationId] = useState();

    useEffect(() => {
        //populateRiverData(stationId);
    }, []);

    return (
        <div>
            <label id="riverNameLabel"> River Name.</label>
            <label>Enter station Id: </label>
            <input type="text" value={stationId} onChange={e => setStationId(e.target.value)} />
            <button onClick={refreshStation(stationId)}> Refresh</button>
            <Chart _data={data} />
            
        </div>
    );
    //

    function refreshStation(station) {
        populateRiverData(station)
        GetStationDetails(station)
    }
    async function populateRiverData(station) {
        
        const response = await fetch(`GetRiverData?station=${station}`);
            const data = await response.text();
            setData(data);
    }

    async function GetStationDetails(station) {

        const response = await fetch(`GetStationName?station=${station}`);
        const data = await response.text();
        SetStationDetails(data);

        
        //console.log(stationName);
    }

    function SetStationDetails(stationName) {
        let labelElement = document.getElementById("riverNameLabel");
        labelElement.innerText = `River Name: ${stationName}`;
    }
}

export default App;


