
function SummariesComp({ _sum, _stationName, _stationId, _currentValue }) {
    return (
      <div className="SummariesComp">
            <p className="text">({_stationId}){_stationName} Level:{_currentValue} m</p>
      </div>
  );
}

export default SummariesComp;