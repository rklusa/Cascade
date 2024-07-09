import Chart from './Chart';
import LoadingSpinner from './Loading';

function RiverDataComp({_data, _stationName, _loading }) {
    return (
        <div>
            <text> {_stationName} </text>
            {_loading ? <LoadingSpinner /> : <Chart _data={_data} />}
        </div>
    );
}

export default RiverDataComp;