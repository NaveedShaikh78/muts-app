import React, { Component } from 'react';
import DataGrid from './../data-grid/data-grid';
import { Input, Button, Popconfirm } from 'antd';
import './settings.css'
var server;
var app;
export default class Jobs extends Component {
    constructor(props) {
        super(props);
        server = window.HTTPService;
        app = window.application;
        app.jobs =this;
        const data = [];
        const cols = [{
            Header: "id",
            accessor: "id",
            show:false
        }, {
            Header: "Job ID",
            accessor: "jobid",
        }, {
            Header: "Job Name",
            accessor: "jobname"
        }, {
            Header: "Description",
            accessor: "jobdesc"
        }];
        const confs = {
            data,
            cols,
            pageSize: 7
        };
        this.state = {
            jobid: 0,
            jobname: '',
            jobdesc: '',
            activejob: 1
        }
        this.confs = confs;
        this.confs.onRowClick = this.onRowClick;
        
    }
    onRowClick = selectedRow => {
        this.setState(selectedRow);
    }
    dbServeOperation = (opType) => {
        const data = this.confs.dataGrid.state.data;
        const apiParam = this.state;
        apiParam.rtype = opType;
        apiParam.activejob = 1
        app.spinOn();
        server.HTTPserve("job.php", apiParam)
            .then(response => {
                if (response) {
                    if (opType === "insertData") {
                        apiParam.id = response[0];
                        data.push(apiParam);
                    } else if (opType === "deleteData") {
                        data.splice(data.findIndex(obj => obj.id === apiParam.id), 1);
                    } else {
                        const obj = data.find(obj => obj.id === apiParam.id)
                        for (var prop in obj) {
                            obj[prop] = apiParam[prop];
                        }
                    }
                    this.confs.dataGrid.setState({
                        data
                    });
                }
                app.spinOff();
            });
    }
    handleChange(prop, e) {
        const props = {};
        props[prop] = e.target.value;
        this.setState(props);
    }
    render() {
        return (
            <div>
                <div className="flex-container">
                    <div className="flex-label"> Job ID</div>
                    <Input
                        value={this.state.jobid}
                        onChange={(e) => this.handleChange("jobid", e)}
                        className="flex-item"
                        placeholder="Enter job ID"
                    />
                </div>
                <div className="flex-container">
                    <div className="flex-label"> Job Name</div>
                    <Input
                        value={this.state.jobname}
                        onChange={(e) => this.handleChange("jobname", e)}
                        className="flex-item"
                        placeholder="Enter job name"
                    />
                </div>
                <div className="flex-container">
                    <div className="flex-label">Description </div>
                    <Input
                        value={this.state.jobdesc}
                        onChange={(e) => this.handleChange("jobdesc", e)}
                        className="flex-item"
                        placeholder="Enter description"
                    />
                </div>
                <div className="flex-container margin-top">
                    <div className="no-border-label"> </div>
                    <Button
                        type="primary"
                        icon="plus-circle-o"
                        onClick={(e) => this.dbServeOperation("insertData", e)}
                        ghost>Add
                     </Button>
                     <Popconfirm
                        placement="top"
                        title="Are you sure delete this record?"
                        onConfirm={(e) => this.dbServeOperation("deleteData", e)}
                        okText="Yes" cancelText="No">
                        <Button
                            type="primary"
                            className="margin-left"
                            icon="delete"
                            ghost>Delete
                    </Button>
                    </Popconfirm>
                    <Button type="primary"
                        className="margin-left"
                        icon="up-square-o"
                        onClick={(e) => this.dbServeOperation("updateData", e)}
                        ghost>Update
                    </Button>
                    <div className="no-border-label"> </div>
                </div>
                <DataGrid confs={this.confs} />
            </div>
        );
    }
}
