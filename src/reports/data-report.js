import React, { Component } from 'react';
import DataGrid from './../data-grid/data-grid';
import moment from 'moment';
let colsDetailed;
let colsGrouped;
export default class DataReport extends Component {
constructor() {
  super();
  const app = window.application;
  colsDetailed = [
    { Header: "srno", accessor: "srno", show: false },
    { Header: "Machine", accessor: "ioport" },
    { Header: "Operator", accessor: "opname" },
    { Header: "Job", accessor: "jobname" },
    { Header: "Job count", accessor: "jobcount", aggrigateSum: true },
    {
      Header: "Start Time", accessor: "start_time",
      Cell: props => {
        props.value = moment(props.value).format('DD/MM/YY HH:mm:ss')
        return <span className='number'>{props.value}</span>;
      }
    },
    {
      Header: "End Time", accessor: "end_time",
      Cell: props => {
        props.value = moment.utc(parseInt(props.value, 10) * 1000).format('HH:mm:ss')
        return <span className='number'>{props.value}</span>;
      }
    },
    {
      Header: "Cycle Time", accessor: "cycletime",
      Cell: props => {
        props.value = moment.utc(parseInt(props.value, 10) * 1000).format('HH:mm:ss')
        return <span className='number'>{props.value}</span>;
      }
    }, {
      Header: "Idle Time", accessor: "idletime",
      Cell: props => {
        props.value = moment.utc(parseInt(props.value, 10) * 1000).format('HH:mm:ss')
        return <span className='number'>{props.value}</span>;
      }
    }
  ];
  colsGrouped = [
    { Header: "srno", accessor: "srno", show: false },
    { Header: "Machine", accessor: "macname", pivoted: true, },
    { Header: "Operator", accessor: "opname", pivoted: true },
    { Header: "Job", accessor: "jobname", pivoted: true },
    { Header: "Job count", accessor: "jobcount", aggrigateSum: true },
    {
      Header: "Cycle Time", accessor: "cycletime",
      Cell: props => {
        props.value = moment.utc(parseInt(props.value, 10) * 1000).format('HH:mm:ss')
        return <span className='number'>{props.value}</span>;
      }
    }, {
      Header: "Idle Time", accessor: "idletime", Cell: props => {
        props.value = moment.utc(parseInt(props.value, 10) * 1000).format('HH:mm:ss')
        return <span className='number'>{props.value}</span>;
      }
    }
  ];
  this.confs = {
    data: [],
    cols: colsDetailed,
    pageSize: 7
  };
  window.application.dataReport = this;
}
setReportColumn(spanDuration){
  switch(spanDuration ){
    case "detailed":
    this.confs.dataGrid.setState({ cols: colsDetailed });
    break;
    case "dsc":
    this.confs.dataGrid.setState({ cols: colsGrouped });
    break;
    case "msc":
    break;
}
}
render() {
  return (
    <DataGrid confs={this.confs} />
  );
}

}
