import React, { Component } from 'react';
import DataGrid from './../data-grid/data-grid';
let colsDetailed;
let colsGrouped;
export default class DataReport extends Component {
  constructor() {
    super();
    colsDetailed = [
      { Header: "srno", accessor: "srno", show: false },
      { Header: "Machine", accessor: "macname" },
      { Header: "Operator", accessor: "opname" },
      { Header: "Job", accessor: "jobname" },
      { Header: "Start Time", accessor: "start_time", width: 130 },
      { Header: "End Time", accessor: "end_time", width: 130 },
      { Header: "Cycle Time", accessor: "cycletime", width: 80 },
      { Header: "Idle Time", accessor: "idletime", width: 80 }
    ];
    colsGrouped = [
      { Header: "srno", accessor: "srno", show: false },
      { Header: "Machine", accessor: "macname", pivoted: true, },
      { Header: "Date", accessor: "date", pivoted: true, },
      { Header: "Operator", accessor: "opname", pivoted: true },
      { Header: "Job", accessor: "jobname", pivoted: true },
      { Header: "Shift1", accessor: "shift1Count", aggrigateSum: true },
      { Header: "Shift2", accessor: "shift2Count", aggrigateSum: true },

    ];
    this.confs = {
      data: [],
      cols: colsGrouped,
      pageSize: 7
    };
    window.application.dataReport = this;
    this.colsMap = {
      ioport: "macname",
      opid: "opname",
      jobno: "jobname"
    }
  }
  setReportColumn(prop, spanDuration) {
    switch (spanDuration) {
      case "detailed":
        this.confs.dataGrid.setState({ cols: colsDetailed });
        this.appliedCols = colsDetailed;
        break;
      case "dsc":
        const filtCols = colsGrouped.filter(x => x.accessor !== this.colsMap[prop]);
        this.confs.dataGrid.setColumns(filtCols);
        this.appliedCols = filtCols;
        break;
      case "msc":
        break;
      default:
        this.confs.dataGrid.setState({ cols: colsDetailed });
        this.appliedCols = colsDetailed;
        break;
    }
  }
  filter = (colName, filterList) => {
    let retval = false
    filterList.forEach(item => {
      if (item === colName) {
        retval = true;
      }
    });
    return retval;
  }
  filterReportCols(filterList) {
    if (this.appliedCols && filterList) {
      const cloneFilterList = filterList.slice(0);
      cloneFilterList.push("srno");
      const filtCols = this.appliedCols.filter(x => this.filter(x.accessor, cloneFilterList));
      this.confs.dataGrid.setColumns(filtCols);

    }
  }
  render() {
    return (
      <DataGrid confs={this.confs} />
    );
  }

}
