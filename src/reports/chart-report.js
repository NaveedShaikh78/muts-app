import React, { Component } from 'react';
import MUTSBarChart from './../charts/bar-chart'
var app;

export default class ChartReport extends Component {
    constructor() {
        super();
        app = window.application;
        app.chartReport = this;
        this.state = {
            data: []
        }
    }
    render() {
        return (
            <MUTSBarChart data={this.state.data} />
        );
    }
}