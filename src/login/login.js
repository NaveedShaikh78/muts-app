import React, { Component } from 'react';
import WrappedNormalLoginForm from './login-form'
import { Form, Input, Button, Modal } from 'antd';
let app;
let server;
export default class LoginDialog extends Component {
    constructor(props) {
        super(props);
        app = window.application;
        server = window.HTTPService;
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
        this.setState({visible:true});
    }
    login = (server, app, apiParam) => {
        apiParam.cuid = "";
        app.spinOn();
        return server
            .HTTPserve("login.php", apiParam)
            .then(response => {
                app.spinOff();
                if (response !== "Failed" && response) {
                    localStorage.setItem('username', apiParam.username);
                    localStorage.setItem('password', apiParam.password);
                    localStorage.setItem('remember', apiParam.remember);
                    server.SetCUId(response);
                    this.setState({ visible: false });
                    return true;
                }
                return false;
            });
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
                    <WrappedNormalLoginForm login={this.login} />
                </Modal>
            </div>
        );
    }
}
