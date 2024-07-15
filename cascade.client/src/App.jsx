import { useEffect, useState } from 'react';
import './App.css';
import RiverDataComp from './RiverDataComponent';


function App() {
    const [data, setData] = useState();
    const [stationName, setStationName] = useState();
    const [loading, setLoading] = useState();
    const [stationId, setStationId] = useState();
    const [tempId, setTempId] = useState();
    const [charts, setCharts] = useState([]);
 
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
            <button onClick={HandleClick}> Set Station</button> <br />
            {charts}
        </div>

    );

    function HandleClick() {
        setStationId(tempId);
        setCharts([...charts, <RiverDataComp _data={data} _stationName={stationName} _loading={loading} />])
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


