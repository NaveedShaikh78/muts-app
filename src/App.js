import React, { Component } from 'react';
import LiveStatus from './live-status/live-status';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Menu, Icon, Button, Spin } from 'antd';
import logo from './logo.svg';
import './App.css';
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="fullheight" >
        <Header className="header">
          {/* <div className="logo" >
            {<img src={logo} className="App-logo" alt="logo" />}
          </div> */}
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
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
            <Menu.Item key="3">nav 3</Menu.Item>
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
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <Menu.Item key="1">
                <Icon type="pie-chart" />
                <span>Option 1</span>
              </Menu.Item>
            </Menu>

          </Sider>
          <Layout >

            <Content className ='container'>
              
                <Button type="primary" ghost>Primary</Button>
                <Button ghost>Default</Button>
                <Button type="dashed" ghost>Dashed</Button>
                <Button type="danger" ghost>danger</Button>
              <LiveStatus />
             </Content>
          </Layout>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
              <Spin />
          Haris Automation ©2011
        </Footer>
      </Layout>
    );
  }
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
}

export default App;
