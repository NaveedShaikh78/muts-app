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
                <Col key={'livekey' + i} xs={12} sm={12} md={8} lg={8} xl={6}>< MachineView key={i} machine={obj} /></Col>
            )}
        </Row>
        );
    }
    constructor() {
        super();
        var server = window.HTTPService;
        var app = window.application;
        const machines = [
            new Machine(26, "Mac 1"),
            new Machine(13, "Mac 2"),
            new Machine(6, "Mac 3"),
            new Machine(5, "Mac 4"),
            new Machine(22, "Mac 6"),
            new Machine(27, "Mac 7"),
            new Machine(17, "Mac 8"),
        ];
        this.machines = machines;
        app.machines = machines;
        // Login to Server
        this.statusInterval = setInterval(() => { this.getCurrentStatus(server, app, machines) }, 9000);
        app.showLoginDialog({ visible: true });

    }
    
    getCurrentStatus = (server, app, machines) => {
        var db = window.database;
        
        if (db.lastRec && !this.wait) {
            this.wait = true;
            server
                .HTTPserve("getLogs.php", { start: db.lastRec, end: db.lastRec + 999 }, false)
                .then(response => {
                    db.addLogs(response).then(() => {
                        this.wait = false;
                    });
                });
        }
        server
            .HTTPserve("machinestatus.php", {}, false)
            .then(response => {
                if (response && response !== "Failed") {
                    machines.forEach(function (machine) {

                        var machineData = response[machine.id];
                        if (machine & machineData) {
                            // ctrl.MachineController.setSelIdle(sdata[ioports[i]].idleid, ioports[i]);
                            var mactime = new Date(machineData.statetime);
                            var tmsec = Date.now() - mactime;
                            var HHmmss = utility.miliSecToHms(tmsec);
                            machine.cycleTimer = HHmmss;
                            machine.jobCount = machineData.count;
                            machine.selOperator = { id: machineData.opid };
                            machine.selJob = { id: machineData.jobid };
                            machine.selIdle = { id: machineData.idleid };
                            machine.state = machineData.status === '1' ? 'state-on' : 'state-off';
                            machine.progress = utility.percentage(tmsec / 1000, machineData.cycletime);
                            machine.progress = machineData.status === '1' ? machine.progress : 0;
                            machine.setMacViewValues();
                        }

                    });
                } else {
                }
            });
    }

}
