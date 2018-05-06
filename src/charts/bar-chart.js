import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default class MUTSBarChart extends Component {
    render() {
        return (
            <BarChart width={600} height={300} data={this.props.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cycletime" fill="#8884d8" background={{ fill: '#eee' }} />
                <Bar dataKey="idletime" fill="#82ca9d" />
            </BarChart>
        );
    }
}