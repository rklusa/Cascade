import { useState } from 'react';
import './styles/App.css';
import RiverDataComp from './RiverDataComponent';
import SummariesComp from './SummariesComponent';


function App() {
    const [stationId, setStationId] = useState();
    const [charts, setCharts] = useState([]);
    const [summaries, setSummaries] = useState([]);

 
    //const stationId = "02ED027";
    //const stations = ["02ED027", "02FF007", "02FE015"];

    return (
        <div>
            <nav className="nav">
                <label>
                    Station #:
                    <input value={stationId || ""} onChange={e => setStationId(e.target.value)} />
                </label>
                <button onClick={AddChart}> Add Chart</button> <br />
            </nav>
            <div className="MainContainer">
                <div className="ChartContainer">
                    {charts.map(chart => (<RiverDataComp key={chart.id} _chart={chart} _stationId={stationId} _DeleteChart={DeleteChart} _AddSummary={AddSummary} />))}
                </div>
                <div className="SummaryContainer">
                    {summaries.map(sum => (<SummariesComp key={sum.id} _sum={sum} _stationName={sum._stationName} _stationId={sum._stationId} _currentValue={sum._currentValue} />))}
                </div>
            </div>
            
        </div>

    );

    function AddChart() {
        const newChart = {id: Date.now(), _stationId: stationId}
        setCharts([...charts, newChart]);
    }

    function DeleteChart(id) {
        setCharts(charts.filter(chart => chart.id !== id));
        setSummaries(summaries.filter(sum => sum.id !== id));
    }

    function AddSummary(id, stationName, stationNumber, currentValue) {
        const newSummary = { id: id, _stationName: stationName, _stationId: stationNumber, _currentValue: currentValue }
        setSummaries([...summaries, newSummary]);
    }

}

export default App;


