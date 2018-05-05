import React, { Component } from 'react';
import WrappedNormalLoginForm from './login-form'
import { Modal } from 'antd';
let app;
let server;
let db;
export default class LoginDialog extends Component {
    constructor(props) {
        super(props);
        app = window.application;
        server = window.HTTPService;
        db = window.database;
        app.loginDialog = this;
    }
    state = {
        loading: false,
        visible: false,
    }

    show = show => {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        const remember = localStorage.getItem('remember');
        if (remember === "true") {
            this.login(server, app, { username, password, remember });
        } else {
            this.setState(show);
        }
        //this.loginForm.login();
    }
    logout() {
        localStorage.setItem('username', '');
        localStorage.setItem('password', '');
        localStorage.setItem('remember', false);
        server.SetCUId('');
        this.setState({ visible: true });
    }
    uiLogin = (server, app, apiParam) => {
        app.spinOn();
        return this.login(server, app, apiParam);
    }
    login = (server, app, apiParam) => {
        apiParam.cuid = "";
        return server
            .HTTPserve("login.php", apiParam)
            .then(response => {
                app.spinOff();
                if (response !== "Failed" && response) {
                    localStorage.setItem('username', apiParam.username);
                    localStorage.setItem('password', apiParam.password);
                    localStorage.setItem('remember', apiParam.remember);
                    server.SetCUId(response);
                    apiParam = { "rtype": "getData" };
                    server.HTTPserve("idle.php", apiParam, app, "idleList").then(idleList => {
                        server.HTTPserve("job.php", apiParam, app, "jobList").then(jobList => {
                            server.HTTPserve("operator.php", apiParam, app, "operatorList").then(operatorList => {
                                if (operatorList) {
                                    this.setState({ visible: false });
                                    db.addList(idleList, 'idleList');
                                    db.addList(jobList, 'jobList');
                                    db.addList(operatorList, 'operatorList');
                                    this.updateList({ operatorList, jobList, idleList });
                                }
                            });
                        });
                    });
                    return true;
                } else {
                    if (app.operatorList) {
                        db.getList('operatorList').then(operatorList => {
                            app.operatorList = operatorList;
                            db.getList('jobList').then(jobList => {
                                app.jobList = jobList;
                                db.getList('idleList').then(idleList => {
                                    app.idleList = idleList;
                                    this.updateList({ operatorList, jobList, idleList });
                                });
                            });
                        });
                    }
                }
                return false;
            });
    }
    updateList = ({ operatorList, jobList, idleList }) => {
        app.operators.confs.dataGrid.setState({ data: operatorList });
        app.jobs.confs.dataGrid.setState({ data: jobList });
        app.idles.confs.dataGrid.setState({ data: idleList });
        app.searchPanel.setState({ operatorList, jobList, idleList })
        app.machines.forEach(machine => machine.setMacList({ operatorList, jobList, idleList }));
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }
    handleCancel = () => {
        //this.setState({ visible: false });
    }
    handleChange(prop, e) {
        const props = {};
        props[prop] = e.target.value;
        this.setState(props);
    }
    render() {

        return (
            <div>
                <Modal
                    width={300}
                    closable={false}
                    visible={this.state.visible}
                    title="login"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <WrappedNormalLoginForm login={this.uiLogin} />
                </Modal>
            </div >
        );
    }
}
