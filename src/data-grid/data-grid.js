import React from "react";
import { render } from "react-dom";
import _ from 'lodash'

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class DataGrid extends React.Component {
  constructor(props) {
    super(props);
    const data = [{
      firstName: 'Naveed',
      lastName: 'Shaikh',
      age: 26,

    },{
      firstName: 'Naveed',
      lastName: 'Shaikh',
      age: 20,

    }]
    this.state = {
      data
    };
    var cols = props.columns;
    if (cols) {
      cols.array.forEach(col => {
        col.PivotValue = ({ value }) =>
          <span style={{ color: "darkred" }}>
            {value}
          </span>
      });
    }
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              columns: [
                {
                  Header: "First Name",
                  accessor: "firstName",
                
                }, {
                  Header: "Age",
                  accessor: "age",
                  aggregate: vals => {
                    return _.round(_.sum(vals));
                  },
                  Aggregated: row =>
                    <span>
                      {row.value} (sum)
                      </span>
                }, {
                  Header: "Last Name",
                  accessor: "lastName",

                }

              ]
            },
            {
              expander: true
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          pivotBy={["firstName"]}
          defaultSorted={[
            { id: "firstName", desc: false },
            { id: "lastName", desc: true }
          ]}
          collapseOnSortingChange={false}
          filterable

        />
        <br />
      </div>
    );
  }
}

