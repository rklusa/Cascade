import { useEffect, useState } from 'react';
import './App.css';
import Chart from './Chart';
import LoadingSpinner from './Loading';
import RiverDataComp from './RiverDataComponent';


function App() {
    const [data, setData] = useState();
    const [stationName, setStationName] = useState();
    const [loading, setLoading] = useState();
    const [stationId, setStationId] = useState();
 

    //const stations = ["02ED027","02FE015"];// this is to be filled from the users profile?
    //const stationId = "02ED027";


    useEffect(() => {
        if (stationId === null || stationId === "") {
            return;
        }
        console.log("making api calls");
        populateRiverData(stationId);
        GetStationDetails(stationId);
    }, [stationId]);

    return (
        <div>
            <input value={stationId} onChange={e => setStationId(e.target.value)} /> <br/>
            <text> {stationName} </text>
            {loading ? <LoadingSpinner /> : <Chart _data={data} />}
        </div>
    );
    //<text> {stationName} </text>
    //{loading ? <LoadingSpinner /> : <Chart _data={data} />}

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


