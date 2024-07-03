import { useEffect, useState } from 'react';
import './App.css';
import Chart from './Chart';


function App() {
    const [data, setData] = useState();

    useEffect(() => {
        populateRiverData();
    }, []);

    return (
        <div>
            <Chart _data={data} />
        </div>
    );

    async function populateRiverData() {
        const response = await fetch('riverdata');
        const data = await response.json();
        setData(data);
    }
}

export default App;


