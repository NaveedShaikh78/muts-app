import React, { Component } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, ReferenceLine, Brush, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default class MUTSBarChart extends Component {
    render() {
        return (
            <ResponsiveContainer height='100%' width='100%' >
            <BarChart width={700} height={500} data={this.props.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"  />
                <YAxis ticks={[100, 200, 300, 400]}  domain={[100, 400]} allowDataOverflow={true} />
                <Tooltip />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                <ReferenceLine y={0} stroke='#000' />
                <Brush dataKey='name' height={30} stroke="#8884d8" />
                <Bar dataKey="cycletimesec" fill="#52c41a" background={{ fill: '#eee' }} />
                <Bar dataKey="idletimesec" fill="#f97070" />
            </BarChart>
                  </ResponsiveContainer>
        );
    }
}