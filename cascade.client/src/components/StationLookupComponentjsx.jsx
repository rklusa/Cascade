import { useState } from 'react';
import data from '../data/StationsData.json';

function StationLookupComp({ _SetStationIdFromLookup }) {
    const [searchInput, setSearchInput] = useState("");


    return (
        <div className="StationLookupDropDown">
            <div>
                <label> Station Lookup </label> <br />
                <input type="text" placeholder="Search" value={searchInput} onChange={e => setSearchInput(e.target.value)}></input>
            </div>
            <div>
                <ul>
                    {data.filter((obj) => {
                        if (searchInput === "") {
                            return;
                        } else if (obj.name.toLowerCase().includes(searchInput.toLowerCase())) {
                            return obj;
                        }
                    }).map((obj) => (<li className="ListItem" onClick={() => _SetStationIdFromLookup(obj.id)} key={obj.id}>{obj.name} <b>{obj.id}</b></li>)) }

                    
                </ul>
            </div>
        </div>
    );
}

export default StationLookupComp;

// {data.map((obj) => (<li key={obj.id}>{obj.name}</li>))}