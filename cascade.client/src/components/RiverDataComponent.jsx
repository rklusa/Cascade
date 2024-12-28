import ChartComp from './ChartComponent';
import LoadingSpinner from './Loading';
import { useEffect, useState } from 'react';
import { populateRiverData, GetStationDetails } from './ApiController';


function RiverDataComp({_chart, _stationId, _DeleteChart, _AddSummary }) {
    const [loading, setLoading] = useState();
    const [data, setData] = useState();
    const [stationName, setStationName] = useState();
    const [lastEntry, setLastEntry] = useState();
    const [stationId, setStationId] = useState();

    // api call hook
    useEffect(() => {
        if (_stationId === null || _stationId === "") {
            return;
        }
        else {
            fetchCaller(_stationId);
            setStationId(_stationId);
        }

    }, []);

    // summary hook
    useEffect(() => {
        if (data === undefined || data.length == 0) {
            return;
        }
        else {
            console.log(`adding summary, ${stationName} ${stationId} ${lastEntry}`);
            _AddSummary(_chart.id, stationName, stationId, lastEntry);
        }
        
        
    }, [data]);

    return (
        <div className="ChartObj" data-testid="ChartObjContainer">
            {loading ? <div className="LoadingSpinner" data-testid="LoadingContainer"> <LoadingSpinner /> <label>Loading</label> </div> :
                <div data-testid="Chart"> <label>{stationName}</label> <button className="DeleteButton" data-testid="DeleteButton" onClick={() => _DeleteChart(_chart.id)} > X </button> <ChartComp _data={data} /> </div>}
            
        </div>
    );

    async function fetchCaller(_stationId) {
        setLoading(true);

        let [dataResult, nameResult] = await Promise.all([populateRiverData(_stationId), GetStationDetails(_stationId)]);

        setData(dataResult);
        setStationName(nameResult);

        if (dataResult != undefined) {
            const lastEntry = dataResult[dataResult.length - 1].level;
            setLastEntry(lastEntry);
        }
        

        setLoading(false);
    }
}

export default RiverDataComp;