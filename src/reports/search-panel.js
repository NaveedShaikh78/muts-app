import React, { Component } from 'react';
import { Select, Button, Menu, DatePicker, Input } from 'antd';
import moment from 'moment';
import './report.css';
const RangePicker = DatePicker.RangePicker;
const dateFormat = "YYYY-MM-DDTHH:mm";
const Option = Select.Option;
const InputGroup = Input.Group;
let app;
export default class SearchPanel extends Component {
    constructor() {
        super();
        app = window.application
        app.searchPanel = this;
        this.state = {
            spanDuration: "detailed",
            ioport: "allmac",
            opid: "0",
            jobno: "0",
            idle: "0",
            start_time: moment().format(dateFormat),
            end_time: moment().format(dateFormat),
            jobList: [],
            operatorList: [],
            jobList: [],
        }

    }

    handleChange = (prop, val) => {
        const props = {};
        props[prop] = val;
        this.setState(props);
    }
    handleDateChange = (prop, e) => {
        const props = {};
        const val = e.target.value;
        props[prop] = val;
        this.setState(props);
    }
    search = () => {
        var people = [
            { mc: '1', op: 'Alice', age: 1 },
            { mc: '1', op: 'Alice', age: 2 },
            { mc: '1', op: 'Naveed', age: 3 },
            { mc: '1', op: 'Naveed', age: 4 },
            { mc: '2', op: 'Naveed', age: 5 },
            { mc: '2', op: 'Alice', age: 5 },
            { mc: '3', op: 'Naveed', age: 5 },
            { mc: '3', op: 'Alice', age: 5 },
            { mc: '3', op: 'Naveed', age: 5 },
        ];
        function groupBy(objectArray, property) {
            const temp = [];
            return objectArray.reduce(function (acc, obj) {
                var mc = obj['mc'];
                var op = obj['op'];
                if (!acc[mc]) {                 
                    acc[mc] = [];
                }
                
                if (!acc[mc][op]) {
                    acc[mc][op] = [];
                    acc[mc][op].sum =0 ;
                }

                acc[mc][op].sum +=1;
                return acc;
            }, {});
        }
        console.log(groupBy(people, 'op'));
        const { ioport, start_time, end_time } = this.state;
        app.spinOn();
        window.database.getLogData({
            ioport,
            start_time: moment(start_time, dateFormat).toDate(),
            end_time: moment(end_time, dateFormat).toDate(),
        }).then(data => {
            app.spinOff();
            app.appmain.setMenu("datareport");
            app.dataReportConf.dataGrid.setState({ data: data });
        });
    }
    render() {
        return (
            <div className="fullheight search-pannel ">
                <Select
                    defaultValue="detailed"
                    className="fullwidth"
                    onChange={(e) => this.handleChange("spanDuration", e)}>
                    <Option value="detailed">Detailed</Option>
                    <Option value="dsc">Daily Shift count</Option>
                    <Option value="msc" >Monthly shift count</Option>
                </Select>
                <Select
                    defaultValue="26"
                    className="fullwidth"
                    onChange={(v) => this.handleChange("ioport", v)}>
                    <Option value="allmac">All Machines</Option>
                    <Option value="26">Machines 1</Option>
                    <Option value="13">Machines 2</Option>
                    <Option value="6">Machines 3</Option>
                    <Option value="5">Machines 4</Option>
                    <Option value="22">Machines 5</Option>
                    <Option value="27">Machines 6</Option>
                    <Option value="17">Machines 7</Option>
                </Select>
                <Select
                    defaultValue="allop"
                    className="fullwidth"
                    value={this.state.opid}
                    onChange={(v) => this.handleChange("opid", v)}>
                    <Option value="0">All Operators</Option>
                    {this.state.operatorList.map((obj, i) =>
                        <Option key={obj.id} >{obj.opname}</Option>
                    )}
                </Select>
                <Select
                    defaultValue="0"
                    className="fullwidth"
                    value={this.state.jobno}
                    onChange={(v) => this.handleChange("jobno", v)}>
                    <Option key={"0"}>All Jobs</Option>
                    {this.state.jobList.map((obj, i) =>
                        <Option key={obj.id} >{obj.jobname}</Option>
                    )}
                </Select>

                <div className="flex-container">
                    <p> Start </p>
                    <input type="datetime-local"
                        className="datestyle"
                        value={this.state.start_time}
                        onChange={(e) => this.handleDateChange("start_time", e)} />
                </div>
                <div className="flex-container">
                    <p> End </p>
                    <input type="datetime-local"
                        className="datestyle"
                        value={this.state.end_time}
                        onChange={(e) => this.handleDateChange("end_time", e)} />

                </div>

                <Button className="fullwidth" onClick={this.search} icon="search" type="primary" ghost>Search</Button>
                <Button className="fullwidth" icon="pie-chart" type="primary" ghost>Chart</Button>

            </div>
        );
    }

}
