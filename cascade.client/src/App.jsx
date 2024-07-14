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
    const [tempId, setTempId] = useState();
 
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
            <input value={tempId} onChange={e => setTempId(e.target.value)} />
            <button onClick={HandleClick}> fetch</button> <br/>
            <text> {stationName} </text>
            {loading ? <LoadingSpinner /> : <Chart _data={data} />}
        </div>
    );

    function HandleClick() {
        setStationId(tempId);
    }

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


