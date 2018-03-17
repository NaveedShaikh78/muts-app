import React, { Component } from 'react';
import './machine-view.css';
import { Tabs, Icon, Badge } from 'antd';
const TabPane = Tabs.TabPane;

export default class MachineView extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="2" className="card">
        <TabPane tab={<span><Badge status="processing" />{this.props.machine.name}</span>} key="1">
          {this.props.machine.name}
        </TabPane>
        <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">
          Tab 2
         </TabPane>
      </Tabs>);
  }
}