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



export default function Chart({_data}) {
    return (
        <LineChart width={500} height={300} data={_data} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
            <YAxis type="number" domain={['dataMin - 0.2', 'dataMax + 0.2']} />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 2 }}
            />
            
        </LineChart>
    );
}