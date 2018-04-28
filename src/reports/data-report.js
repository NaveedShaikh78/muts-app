import React, { Component } from 'react';
import DataGrid from './../data-grid/data-grid';
import moment from 'moment';
export default class DataReport extends Component {

  constructor() {
    super();
    const app = window.application;
    const cols = [
      { Header: "srno", accessor: "srno", show: false },
      { Header: "Machine", accessor: "ioport" },
      {
        Header: "Job", accessor: "jobno", pivoted: true,
        Cell: props => {
          const jobs = app.jobList;
          if (jobs.length > 0 && props.value) {
            props.value = jobs.filter(x => x.id === props.value)[0].jobname;
          }
          return <span className='number'>{props.value}</span>;
        }
      },
      {
        Header: "Operator", accessor: "opid", pivoted: true,
        Cell: props => {
          const ops = app.operatorList;
          if (ops.length > 0 && props.value) {
            props.value = ops.filter(x => x.id === props.value)[0].opname;
          }
          return <span className='number'>{props.value}</span>;
        }
      },
      {
        Header: "Cycle Time", accessor: "cycletime",
        Cell: props => {
          props.value = moment.utc(parseInt(props.value, 10) * 1000).format('HH:mm:ss')
          return <span className='number'>{props.value}</span>;
        }
      },
      {
        Header: "Idle Time", accessor: "idletime", Cell: props => {
          props.value = moment.utc(parseInt(props.value, 10) * 1000).format('HH:mm:ss')
          return <span className='number'>{props.value}</span>;
        }
      }
    ];
    this.confs = {
      data: [],
      cols,
      pageSize: 7
    };
    window.application.dataReportConf = this.confs;
  }
  render() {
    return (
      <DataGrid confs={this.confs} />
    );
  }

}
