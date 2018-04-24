import React, { Component } from 'react';
import LoginDialog from './login/login'
import LiveStatus from './live-status/live-status';
import DataReport from './reports/data-report';
import Jobs from './settings/jobs';
import Operators from './settings/operators';
import Idles from './settings/idles';
import SearchPanel from './reports/search-panel';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Menu, Icon, Spin } from 'antd';
// import logo from './logo.svg';
import './App.css';
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
let app;
class App extends Component {
  constructor() {
    super();
    this.state.collapsed = true;
    app = window.application;
    app.appmain = this;
  }
  render() {
    return (
      <Layout className="fullheight" >
        <LoginDialog />
        <Header className="header">
          {/* <div className="logo" >
            {<img src={logo} className="App-logo" alt="logo" />}
          </div> */}
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Menu.Item>
            <Menu.Item key="2">nav 1</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <Menu
              theme="dark"
              mode="inline"
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="3" >
                <div onClick={(e) => this.setMenue({ currentOpt: "live" }, e)}>
                  <Icon type="dashboard" /> Live
                </div>
              </Menu.Item>
              <SubMenu key="sub1" title={<span><Icon type="user" /> User</span>}>
                <Menu.Item key="4">
                  <div onClick={(e) =>app.loginDialog.logout()} >
                    <Icon type="logout"  />Logout
                </div>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="pie-chart" /> Reports</span>}>
                <Menu.Item key="5" >
                  <div onClick={(e) => this.setMenue({ currentOpt: "datareport" }, e)}>
                    <Icon type="info-circle-o" /> Data reports
                  </div>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="setting" /> Settings</span>}>
                <Menu.Item key="7" >
                  <div onClick={(e) => this.setMenue({ currentOpt: "operators" }, e)}>
                    <Icon type="solution" />Operators
                    </div>
                </Menu.Item>
                <Menu.Item key="8">
                  <div onClick={(e) => this.setMenue({ currentOpt: "jobs" }, e)}>
                    <Icon type="api" />Jobs
                  </div>
                </Menu.Item>
                <Menu.Item key="9">
                  <div onClick={(e) => this.setMenue({ currentOpt: "idles" }, e)}>
                    <Icon type="exception" />Idle List
                </div>
                </Menu.Item>
                <Menu.Item key="10"><Icon type="file-markdown" />Machines</Menu.Item>
              </SubMenu>
            </Menu>

          </Sider>
          <Layout >

            <Content className='container'>
              {/* <Button type="primary" ghost>Primary</Button>
                <Button ghost>Default</Button>
                <Button type="dashed" ghost>Dashed</Button>
                <Button type="danger" ghost>danger</Button> */}
              <div className={this.state.currentOpt === "live" ? "show" : "hide"} > <LiveStatus /></div>
              <div className={this.state.currentOpt === "datareport" ? "show" : "hide"} > <DataReport /></div>
              <div className={this.state.currentOpt === "jobs" ? "show" : "hide"} > <Jobs /></div>
              <div className={this.state.currentOpt === "operators" ? "show" : "hide"} > <Operators /></div>
              <div className={this.state.currentOpt === "idles" ? "show" : "hide"} > <Idles /></div>
            </Content>
          </Layout>
          <Sider className ="rigthsliderwidth" width ="250"><SearchPanel /></Sider>
        </Layout>
        {/* <Footer style={{ textAlign: 'center' }}>
          Haris Automation ©2011
        </Footer> */}
        {
          this.state.showSpin ?
            <div className="loader">
              <div className="spin">
                <Spin />
                <span>Please wait ...</span>
              </div>
            </div> : null
        }
      </Layout>
    );
  }
  state = {
    collapsed: false,
    showSpin: true,
    currentOpt: "live"
  };
  setMenue = stateObj => {
    stateObj.collapsed = true;
    this.setState(stateObj);
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
}

export default App;
