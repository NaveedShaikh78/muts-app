import React, { Component } from 'react';
import './machine-view.css';
import { Tabs, Icon, Badge, Progress } from 'antd';
const TabPane = Tabs.TabPane;

export default class MachineView extends Component {
  constructor(props) {
    super(props);
    props.machine.macView = this;
    this.state = {
      state: 'on',
      jobCount: 0,
      cycleTimer: "00:00",
      selOperator: 0,
      selJob: 0,
      selIdle: 0,
      progress: {},
      operatorList: [],
      jobList: [],
      idleList: []
    }
  }
  handleChange(type, e) {
    window.application.spinOn();
    const val = e.target.value;
    var apiParam = { type, tval: val, ip: this.props.machine.id }
    window.HTTPService.HTTPserveGet("updatemachinestatus.php", apiParam)
      .then(result => {
        window.application.spinOff();
        if (result && result[0] === "success") {
          if (type === "op") {
            this.setState({
              selOperator: val
            });
          }
          if (type === "idle") {
            this.setState({
              selIdle: val
            });
          }
          if (type === "job") {
            this.setState({
              selJob: val
            });
          }
        }
      });
    return true;
  }
  render() {
    return (
      <Tabs defaultActiveKey="1" className="card">
        <TabPane tab={<span>{this.props.machine.name}</span>} key="1">
          <div className="mac-container">
            <div className="mitem">Count</div>
            <div className="mitem">{this.state.jobCount}</div>
            <div className="flex-container">
              <div style={{ width: 50 }}>
                <Badge status="processing" className={this.state.state} />
              </div>
              <Progress percent={100} className="flex-item-auto"
                status={this.state.state === "state-on" ? "active" : "exception"}
                showInfo={false}
                style={{ opacity: 50 }}
                successPercent={this.state.progress} />
              <div style={{ width: 90, textAlign: 'right' }}>{this.state.cycleTimer}</div>
            </div>
            <div className="mitem"> Operator</div>
            <select value={this.state.selOperator} onChange={(e) => this.handleChange("op", e)}>
              {this.state.operatorList.map((obj, i) =>
                <option value={obj.id} key={i}>{obj.opname}</option>
              )}
            </select>
            <div className="mitem"> Job </div>
            <select value={this.state.selJob} onChange={(e) => this.handleChange("job", e)}>
              {this.state.jobList.map((obj, i) =>
                <option value={obj.id} key={i}>{obj.jobname}</option>
              )}
            </select>
            <div className="mitem"> Idle </div>
            <select value={this.state.selIdle} onChange={(e) => this.handleChange("idle", e)}>
              {this.state.idleList.map((obj, i) =>
                <option value={obj.id} key={i}>{obj.idledesc}</option>
              )}
            </select>

          </div>
        </TabPane>
        <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">
          Tab 2
         </TabPane>
      </Tabs>);
  }
}