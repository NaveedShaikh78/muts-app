import React, { Component } from 'react';
import { Select, Checkbox, Button, Progress } from 'antd';
import moment from 'moment';
import './report.css';
const CheckboxGroup = Checkbox.Group;
const dateTimeFormat = "YYYY-MM-DDTHH:mm";
const dateFormat = "YYYY-MM-DD";
const Option = Select.Option;
let app;
export default class SearchPanel extends Component {
    constructor() {
        super();
        app = window.application
        app.searchPanel = this;
        const date = moment().format(dateFormat);
        var morningStart = moment(date + "T08:00:00", dateTimeFormat).format(dateTimeFormat);
        var morningEnd = moment(date + "T20:00:00", dateTimeFormat).format(dateTimeFormat);
        this.options = [
            { label: 'Machine  ', value: 'macname', id: "ioport" },
            { label: 'Job', value: 'jobname', id: "jobno" },
            { label: 'Date', value: 'date', id: "date" },
            { label: 'Operator', value: 'opname', id: "opid" },
            { label: 'Shift1', value: 'shift1Count', id: "shift1Count" },
            { label: 'Shift2', value: 'shift2Count', id: "shift2Count" }
        ];
        this.state = {
            spanDuration: "dsc",
            ioport: "0",
            opid: "0",
            jobno: "0",
            idle: "0",
            start_time: morningStart,
            end_time: morningEnd,
            jobList: [],
            operatorList: [],
            options: this.options
        }
        this.colsMap = {
            ioport: "macname",
            opid: "opname",
            jobno: "jobname"
        }
    }
    handleCheckGroupChange = (checkedList) => {
        this.checkedList = checkedList;
        app.dataReport.filterReportCols(checkedList);
    }
    handleChange = (prop, val) => {
        const props = { jobno: "0", opid: "0", ioport: "0" };
        props[prop] = val;
        this.selProp = prop;

        if (val !== "0") {
            props.options = this.options.filter(x => x.id !== prop);
        } else {
            props.options = this.options;
        }
        if (prop === "spanDuration" && val === "detailed") {
            props.ioport = "26";
            props.options = this.options.filter(x => x.id !== "shift1Count" && x.id !== "shift2Count" && x.id !== "total");
        }
        this.setState(props);
    }
    handleDateChange = (prop, e) => {
        const props = {};
        const val = e.target.value;
        props[prop] = val;
        this.setState(props);
    }
    search = () => {
        const { ioport, jobno, opid, start_time, end_time } = this.state;
        let reportData;
        app.spinOn();
        const filter = {
            ioport, jobno, opid,
            start_time: moment(start_time, dateTimeFormat).toDate(),
            end_time: moment(end_time, dateTimeFormat).toDate(),
        }
        app.dataReport.setReportColumn(this.selProp, this.state.spanDuration);
        app.dataReport.filterReportCols(this.checkedList);

        switch (this.state.spanDuration) {
            case "detailed":
                reportData = window.database.getLogData(filter);
                break;
            case "dsc":
                reportData = window.database.jobCountList(this.selProp, filter);
                break;
            case "msc":
                reportData = window.database.jobCountList(this.selProp, filter);
                break;
            default:
                break;
        }
        reportData.then(data => {
            app.spinOff();
            app.appmain.setMenu("datareport");
            app.dataReport.confs.dataGrid.setState({ data });
        });
    }
    render() {
        return (
            <div className="fullheight search-pannel ">
                <Progress
                    percent={this.state.downloadPercent}
                    status="active"
                    size="small"
                    showInfo={false} />

                <Select
                    defaultValue="dsc"
                    className="fullwidth"
                    onChange={(e) => this.handleChange("spanDuration", e)}>
                    <Option value="detailed">Detailed</Option>
                    <Option value="dsc">Daily Shift count</Option>
                    <Option value="msc" >Monthly shift count</Option>
                </Select>
                <Select
                    defaultValue="0"
                    className="fullwidth"
                    value={this.state.ioport}
                    onChange={(v) => this.handleChange("ioport", v)}>
                    <Option key="0">All Machines</Option>
                    <Option key="26">Machines 1</Option>
                    <Option key="13">Machines 2</Option>
                    <Option key="6">Machines 3</Option>
                    <Option key="5">Machines 4</Option>
                    <Option key="22">Machines 5</Option>
                    <Option key="27">Machines 6</Option>
                    <Option key="17">Machines 7</Option>
                </Select>
                <Select
                    defaultValue="0"
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
                <CheckboxGroup options={this.state.options} defaultValue={['macname', 'date', 'jobname', 'opname', 'shift1Count', 'shift2Count']}
                    onChange={this.handleCheckGroupChange} />

            </div>
        );
    }

}
