import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ReferenceDot,
    ReferenceArea,
} from "recharts";



function ChartComp({ _data }) {
    return (
        <LineChart width={500} height={300} data={_data} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" padding={{ left: 10, right: 10 }} />
            <YAxis type="number" tickFormatter={(value) =>
                new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    compactDisplay: "short",
                }).format(value)
            } domain={['dataMin - 0.05', 'dataMax + 0.05']} />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="value"
                stroke="#2693ff"
                activeDot={{ r: 2 }}
            />

        </LineChart>
    );
}

export default ChartComp;
    