import React, { Component } from 'react';
import DataGrid from './../data-grid/data-grid';
import { Input, Icon, Button, Popconfirm } from 'antd';
import './settings.css'
var server;
var app;
export default class Operators extends Component {
    constructor(props) {
        super(props);
        server = window.HTTPService;
        app = window.application;
        app.operators = this;
        const data = [];
        const apiParam = { "rtype": "getData" };
        const cols = [{
            Header: "id",
            accessor: "id",
            show: false
        }, {
            Header: "Operator ID",
            accessor: "opid",
        }, {
            Header: "Operator Name",
            accessor: "opname",

        }];
        const confs = {
            data,
            cols,
            pageSize: 7
        };
        this.state = {
            opid: '',
            opname: '',
        }
        this.confs = confs;
        this.confs.onRowClick = this.onRowClick;
    }
    onRowClick = selectedRow => {
        this.setState(selectedRow);
    }
    dbServeOperation = (opType) => {
        const confs = this.confs;
        const apiParam = this.state;
        apiParam.rtype = opType;
        app.spinOn();
        server.HTTPserve("operator.php", apiParam)
            .then(response => {
                if (response) {
                    if (opType === "insertData") {
                        apiParam.id = response[0];
                        confs.data.push(apiParam);
                    } else if (opType === "deleteData") {
                        confs.data.splice(confs.data.findIndex(obj => obj.id == apiParam.id), 1);
                    } else {
                        const obj = confs.data.find(obj => obj.id == apiParam.id)
                        for (var prop in obj) {
                            obj[prop] = apiParam[prop];
                        }
                    }
                    confs.dataGrid.setState({
                        data: confs.data
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
                    <div className="flex-label"> Operator ID</div>
                    <Input
                        value={this.state.opid}
                        onChange={(e) => this.handleChange("opid", e)}
                        className="flex-item"
                        placeholder="Enter operator ID"
                    />
                </div>
                <div className="flex-container">
                    <div className="flex-label"> Operator Name</div>
                    <Input
                        value={this.state.opname}
                        onChange={(e) => this.handleChange("opname", e)}
                        className="flex-item"
                        placeholder="Enter operator name"
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
