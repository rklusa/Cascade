
function SummariesComp({ _sum, _stationName, _stationId, _currentValue }) {
    const formattedValue = Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short", }).format(_currentValue);

    return (
      <div className="SummariesComp">
            <p>({_stationId}){_stationName} Level: <b>{formattedValue}</b> m</p>
      </div>
  );
}

export default SummariesComp;