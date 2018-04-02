import React, { Component } from 'react';
import './machine-view.css';
import { Tabs, Icon, Badge, Input } from 'antd';
const TabPane = Tabs.TabPane;

export default class MachineView extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="2" className="card">
        <TabPane tab={<span><Badge status="processing" />{this.props.machine.name}</span>} key="1">
          <div className="mac-container" layout="row" layout-wrap>
            <div>Count</div>
            <div>{this.props.machine.jobCount}</div>
            <div>
              Timer
            </div>
            <div>
              <md-progress-circular className="led {this.props.machine.state}" md-mode="determinate" value="{this.props.machine.progress}" md-diameter="20px"></md-progress-circular>
              <div>
                <div >{this.props.machine.cycleTimer}</div>
                <md-progress-linear value="{this.props.machine.progress}" ng-class="{'md-warn':$ctrl.machine.state !== 'on'}"></md-progress-linear>
              </div>
            </div>
            <div>Operator</div>
            <select ng-options="op.opname for op in $ctrl.machine.app.operatorList track by op.id" ng-change="$ctrl.operatorChange()"
              ng-model="$ctrl.machine.selOperator" >
              <option selected="selected" value="" hidden="">Select</option></select>
            <div>Job</div>
            <select ng-options="job.jobname for job in $ctrl.machine.app.jobList track by job.id" ng-change="$ctrl.jobChange()" ng-model="$ctrl.machine.selJob">
              <option selected="selected" value="" hidden=""> Select</option></select>
            <div>Idle</div>
            <select ng-options="idle.idledesc for idle in $ctrl.machine.app.idleList track by idle.id" ng-change="$ctrl.idleChange()"
              ng-model="$ctrl.machine.selIdle" >
              <option selected="selected" value="" hidden="">Select</option></select>
          </div>
        </TabPane>
        <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">
          Tab 2
         </TabPane>
      </Tabs>);
  }
}