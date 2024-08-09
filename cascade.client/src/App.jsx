import { useState } from 'react';
import './App.css';
import RiverDataComp from './RiverDataComponent';


function App() {
    const [stationId, setStationId] = useState();
    const [charts, setCharts] = useState([]);
 
    //const stationId = "02ED027";
    //const stations = ["02ED027", "02FF007", "02FE015"];

    return (
        <div>
            <label>
                Station #:
                <input value={stationId || ""} onChange={e => setStationId(e.target.value)} />
            </label>
            <button onClick={AddChart}> Add Chart</button> <br />
            {charts.map(chart => (<RiverDataComp key={chart.id} _chart={chart} _stationId={stationId} _DeleteChart={DeleteChart} />))}
        </div>

    );

    function AddChart() {
        const newChart = {id: Date.now(), _stationId: stationId}
        setCharts([...charts, newChart]);
    }

    function DeleteChart(id) {
        setCharts(charts.filter(chart => chart.id !== id));
    }
}

export default App;


