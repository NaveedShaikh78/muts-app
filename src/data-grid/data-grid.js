import React from "react";
import _ from 'lodash'

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class DataGrid extends React.Component {
  constructor(props) {
    super(props);
    if (props.confs) {
      const { cols, data, pageSize } = props.confs;
      this.state = {
        data,
        cols,
      };

      this.state.pageSize = pageSize ? pageSize : 8
      props.confs.dataGrid = this;
      this.state.pivotBy = [];
      const colsGrouped = [
        { Header: "srno", accessor: "srno", show: false },
        { Header: "Machine", accessor: "macname", pivoted: true, },
        { Header: "Operator", accessor: "opname", pivoted: true },
        { Header: "Job count", accessor: "jobcount", aggrigateSum: true },

      ];
      //this.setColumns( colsGrouped);

    }
  }
  setColumns(cols) {
    if (cols) {
      cols.forEach(col => {
        //col.pivoted && this.state.pivotBy.push(col.accessor);
        if (col.aggrigateSum) {
          col.aggregate = vals => {
            return _.round(_.sum(vals));
          },
            col.Aggregated = row =>
              <span>
                {row.value} (sum)
            </span>
        }
      });
      this.setState({ cols });
    }
  }
  render() {
    return (
      <div>{
        this.state ?
          <ReactTable
            data={[{macname: "Mac 1", opname: "Nitin bambal", jobname: "377 VCT Blow by core", jobcount: 746},
            
            {macname: "Mac 1", opname: "Nitin bambal", jobname: "377 VCT Inlet/Ex core", jobcount: 644},
            
            {macname: "Mac 1", opname: "champak", jobname: "377 VCT Blow by core", jobcount: 2521}]}
            columns={[
              {
                columns: [
                  { Header: "srno", accessor: "srno", show: false },
                  { Header: "Machine", accessor: "macname" },
                  { Header: "Operator", accessor: "opname"},
                  { Header: "Job count", accessor: "jobcount"},

                ]
              }
            ]}
            className="-striped -highlight"
            pivotBy={["macname", "opname"]}
            filterable


          /> : null
      }</div>
    );
  }
}

