import React, { Component } from 'react';
import utility from './../common/utility';
import MachineView from './../machine/machine-view'
import Machine from './../machine/machine'
import './live-status.css';
import { Row, Col } from 'antd';

export default class LiveStatus extends Component {
    render() {
        return (<Row>
                  {this.machines.map((obj, i) =>
                    <Col xs={12} sm={12} md={8} lg={8} xl={6}>< MachineView key ={i} machine ={obj} /></Col>
                  )}
                </Row>
        );}
    constructor() {
        super();
        var server = window.HTTPService;
        var Application = window.Application;
        this.machines = [
            new Machine(26, "Mac 1"),
            new Machine(13, "Mac 2"),
            new Machine(6, "Mac 3"),
            new Machine(5, "Mac 4"),
            new Machine(22, "Mac 6"),
            new Machine(27, "Mac 7"),
            new Machine(17, "Mac 8"),
        ];
        // Login to Server
        var apiParam = { 'username': 'global', 'password': 'global@#', 'cuid': "" };

        server
            .HTTPserve("login.php", apiParam)
            .then(response => server.SetCUId(response.data));
        this.statusInterval = setInterval(() => { this.getCurrentStatus(server) }, 3000);

        this.machines.forEach(machine => {
            machine.app = Application;
        })
        // Loading Lists
        apiParam = { "rtype": "getData" };
        server.HTTPserve("idle.php", apiParam, window.application.idleList);
        server.HTTPserve("job.php", apiParam, window.application.jobList);
        server.HTTPserve("operator.php", apiParam, window.application.operatorList);
    }
    getCurrentStatus = (server) => {
        server
            .HTTPserve("machinestatus.php", {}, false)
            .then(response => {
                this.machines.forEach(function (machine) {
                    if (response) {
                        if (response.data[0] === "Failed") {
                            // showLoginDialog();
                            return;
                        }
                        var machineData = response.data[machine.id];
                        if (machine) {
                            // ctrl.MachineController.setSelIdle(sdata[ioports[i]].idleid, ioports[i]);
                            var mactime = new Date(machineData.statetime);
                            var tmsec = Date.now() - mactime;
                            var HHmmss = utility.miliSecToHms(tmsec);
                            machine.cycleTimer = HHmmss;
                            machine.jobCount = machineData.count;
                            machine.selOperator = { id: machineData.opid };
                            machine.selJob = { id: machineData.jobid };
                            machine.selIdle = { id: machineData.idleid };
                            machine.state = machineData.status === '1' ? 'on' : 'md-accent off';
                            machine.progress = utility.percentage(tmsec / 1000, machineData.cycletime);
                        }
                    }
                });
            });
    }

}
