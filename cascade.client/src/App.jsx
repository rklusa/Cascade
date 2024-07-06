import { useEffect, useState } from 'react';
import './App.css';
import Chart from './Chart';


function App() {
    const [data, setData] = useState();
    const [stationId, setStationId] = useState();
    var stationName = "";

 

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


    function refreshStation(station) {
        console.log(station)
        populateRiverData(station)
        GetStationDetails(station)
    }
    async function populateRiverData(station) {
        
            const response = await fetch(`riverdata?station=${station}`);
            const data = await response.json();
            setData(data);
    }

    async function GetStationDetails(station) {

        const response = await fetch(`stationname?station=${station}`);
        const data = await response.json();
        stationName = data;

        let labelElement = document.getElementById("riverNameLabel");
        labelElement.innerText = `River Name: ${stationName}`;
    }
}

export default App;


