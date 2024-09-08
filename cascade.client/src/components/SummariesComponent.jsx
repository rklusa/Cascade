
function SummariesComp({ _sum, _stationName, _stationId, _currentValue }) {

    const formattedValue = FormatValue(_currentValue);

    return (
        <div className="SummariesComp" data-testid="SummaryComponent">
            <p>({_stationId}){_stationName} Level: <b>{formattedValue}</b> m</p>
      </div>
    );

    function FormatValue(val) {
        // return number to one decimal place for easier reading
        return Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short", }).format(val);
    }
}

export default SummariesComp;