export async function populateRiverData(station) {

    try {
        const response = await fetch(`GetRiverData?station=${station}`)

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();

        if (data.length == 0) {
            console.log("invalid station id");
            return;
        }
        else {

            return data;
        }

    } catch (e) {
        console.log(e);
    }
}

export async function GetStationDetails(station) {

    try {
        const response = await fetch(`GetStationName?station=${station}`);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const stationName = await response.text();
        let name = stationName;
        if (stationName == "") {
            name = 'Invalid Station Name';
        } else {
            name = stationName;
        }

        return name;

    } catch (e) {
        console.log(e);
    }

}