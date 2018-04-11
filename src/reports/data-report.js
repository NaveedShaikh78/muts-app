import React, { Component } from 'react';
import { render } from "react-dom";
import DataGrid from './../data-grid/data-grid';
export default class DataReport extends Component {
    constructor() {
      super();
    }
    render() {
      return (
          <DataGrid />
      );
    }
   
  }
