import React, { Component } from 'react';
import MUTSBarChart from './charts/bar-chart'
var app;

export default class ChartReport extends Component {
    constructor() {
        super();
        app = window.application;
        app.chartReort = this;
        this.state = {
            data: []
        }
    }
    render() {
        return (
            <div></div>
            // <MUTSBarChart data={this.state.data} />
        );
    }
}