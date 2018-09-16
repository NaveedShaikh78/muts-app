import React, { Component } from 'react';
import LoginDialog from './login/login'
import LiveStatus from './live-status/live-status';
import DataReport from './reports/data-report';
import Jobs from './settings/jobs';
import Operators from './settings/operators';
import Idles from './settings/idles';
import SearchPanel from './reports/search-panel';
import ChartReport from './reports/chart-report';
import 'antd/dist/antd.css';
import './App.css';
import { Button, Layout, Menu, Icon, Spin } from 'antd';
import logo from './logo.png';
import './App.css';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;
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

        <div className="header-container" theme="light">
          <div className="flex-container">
            <Button
              icon={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle} ghost></Button>
            <Button onClick={(e) => this.setMenu("live", e)}
              icon="dashboard" ghost>Live</Button>
            <Button onClick={(e) => this.setMenu("datareport", e)}
              icon="info-circle-o" ghost>Data Report</Button>
            <div className="flex-item-auto">hello</div>
            <Button
              style={{ position:'absolute', right:0,top:0}}
              className="flex-item-auto app-logo"
              icon={this.state.collapsedRight ? 'menu-fold' : 'menu-unfold'}
              onClick={this.toggleRight} ghost></Button>
              <div className="logo" >
            {/* {<img src={logo} width={40} alt="logo" />} */}
          </div> 
          </div>
         
          
        </div>

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
                <div onClick={(e) => this.setMenu("live", e)}>
                  <Icon type="dashboard" /> Live
                </div>
              </Menu.Item>
              <SubMenu key="sub1" title={<span><Icon type="user" /> User</span>}>
                <Menu.Item key="4">
                  <div onClick={(e) => app.loginDialog.logout()} >
                    <Icon type="logout" />Logout
                </div>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="pie-chart" /> Reports</span>}>
                <Menu.Item key="5" >
                  <div onClick={(e) => this.setMenu("datareport", e)}>
                    <Icon type="info-circle-o" /> Data reports
                  </div>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="setting" /> Settings</span>}>
                <Menu.Item key="7" >
                  <div onClick={(e) => this.setMenu("operators", e)}>
                    <Icon type="solution" />Operators
                    </div>
                </Menu.Item>
                <Menu.Item key="8">
                  <div onClick={(e) => this.setMenu("jobs", e)}>
                    <Icon type="api" />Jobs
                  </div>
                </Menu.Item>
                <Menu.Item key="9">
                  <div onClick={(e) => this.setMenu("idles", e)}>
                    <Icon type="exception" />Idle List
                </div>
                </Menu.Item>
                <Menu.Item key="10"><Icon type="file-markdown" />Machines</Menu.Item>
              </SubMenu>
            </Menu>

          </Sider>
          <Layout >
            <Content className='container fullheight'>
              
              <div className={this.state.currentOpt === "live" ? "show" : "hide"} > <LiveStatus /></div>
              <div className={this.state.currentOpt === "datareport" ? "show" : "hide"} > <DataReport /></div>
              <div className={this.state.currentOpt === "jobs" ? "show" : "hide"} > <Jobs /></div>
              <div className={this.state.currentOpt === "operators" ? "show" : "hide"} > <Operators /></div>
              <div className={this.state.currentOpt === "idles" ? "show" : "hide"} > <Idles /></div>
              <div className={this.state.currentOpt === "chartreport" ? "show fullheight" : "hide"} ><ChartReport /></div>
            </Content>
          </Layout>
          <Sider collapsible trigger={null}
            collapsed={this.state.collapsedRight}
            className="rigthsliderwidth" width="250"><SearchPanel /></Sider>
        </Layout>
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
    showSpin: false,
    downloadPercent:100,
    currentOpt: "live"
  };
  setMenu = state => {
    this.setState({ currentOpt: state, collapsed: true });
  }
  toggle = () => {
    this.setState({
      collapsedRight: this.state.collapsed && !this.state.collapsedRight ? true : this.state.collapsedRight,
      collapsed: !this.state.collapsed,
    });
  }
  toggleRight = () => {
    this.setState({
      collapsed: !this.state.collapsed && this.state.collapsedRight ? true : this.state.collapsed,
      collapsedRight: !this.state.collapsedRight,
    });
  }
}

export default App;
