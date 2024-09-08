export async function populateRiverData(station, _setData, _setLastEntry, _setLoading) {

    _setLoading(true);

    try {
        const response = await fetch(`GetRiverData?station=${station}`)

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();

        if (data.length == 0) {
            console.log("invalid station id");
        }
        else {
            _setData(data);
            const lastEntry = data[data.length - 1].value;
            _setLastEntry(lastEntry);
        }

    } catch (e) {
        console.log(e);
    }

    _setLoading(false);

}

export async function GetStationDetails(station, _setStationName) {

    try {
        const response = await fetch(`GetStationName?station=${station}`);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const stationName = await response.text();
        let name = stationName;
        if (stationName == "") {
            _setStationName("Invalid Station Name");
        } else {
            _setStationName(stationName);
        }

    } catch (e) {
        console.log(e);
    }

}