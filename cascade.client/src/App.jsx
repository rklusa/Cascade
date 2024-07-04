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
        <label>Enter station Id: </label>
            <input type="text" value={stationId} onChange={e => setStationId(e.target.value)} />
            <button onClick={refreshStation(stationId)}> Click Me!</button>
            <Chart _data={data} />
        </div>
    );


    function refreshStation(station) {
        console.log(station)
        populateRiverData(station)
    }
    async function populateRiverData(station) {
        
            const response = await fetch(`riverdata?station=${station}`);
            const data = await response.json();
            setData(data);
    }
}

export default App;


