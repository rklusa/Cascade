function SummariesComp({_stationName, _stationId, _currentValue }) {
  return (
      <p>({_stationId}){_stationName} Level:{_currentValue} m</p>
  );
}

export default SummariesComp;