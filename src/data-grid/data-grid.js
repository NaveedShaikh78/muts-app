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
      this.state.pivotBy=[];
      if (cols) {
        cols.forEach(col => {
          col.pivoted && this.state.pivotBy.push(col.accessor);
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
      }
    }
  }
  render() {
    return (
      <div>{
        this.state ?
          <ReactTable
            data={this.state.data}
            columns={[
              {
                columns: this.state.cols
              },
              {
                expander: this.state.pivotBy ? true : false
              }
            ]}
            className="-striped -highlight"
            pivotBy={this.state.pivotBy}
            collapseOnSortingChange={false}
            filterable
            
            getTrProps={(state, rowInfo) => {
              return {
                onClick: (e) => {
                  if (this.props.confs && this.props.confs.onRowClick) {
                    this.props.confs.onRowClick(rowInfo.original);
                    this.setState({
                      selected: rowInfo.index
                    })
                  }
                 
                },
                style: {
                  padding:'0px!important',
                  height:'auto',
                  border : rowInfo &&  rowInfo.index === this.state.selected ? '1px solid':'none',
                  borderColor: rowInfo &&  rowInfo.index === this.state.selected ? '#00afec' : 'white'
                }
              }
            }}
          /> : null
      }</div>
    );
  }
}

