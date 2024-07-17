import { useEffect, useState } from 'react';
import './App.css';
import RiverDataComp from './RiverDataComponent';


function App() {

    const [stationId, setStationId] = useState();
    const [tempId, setTempId] = useState();
    const [charts, setCharts] = useState([]);
 
    //const stationId = "02ED027";

    return (
        <div>
            <input value={stationId} onChange={e => setStationId(e.target.value)} />
            <button onClick={AddChart}> Add Chart</button> <br />
            {charts}
        </div>

    );

    function AddChart() {
        setCharts([...charts, <RiverDataComp _stationId={stationId} />])
    }
}

export default App;


