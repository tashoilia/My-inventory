import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { Button, message } from "antd";
import "./index.css";

export default function DataTable({ itemValue }) {
  const [rowData, setRowData] = useState([]);

  const gridOptions = {
    cellClass: (params) => {
      return params.rowIndex % 2 === 0 ? "even-color" : "odd-color";
    },
    rowSelection: multiple,
  };

  const columnDefs = [
    { headerName: "Id", field: "id" },
    { headerName: "Item", field: "item" },
    {
      headerName: "Quantity",
      field: "quantity",
      cellStyle: (params) => console.log(params),
      cellClass: gridOptions.cellClass,
    },
  ];

  const info = () => {
    message.info("You must choose a category first");
  };

  const addRowData = () => {
    if (itemValue.length == 0) {
      info();
      return;
    }
    let newRowData = [...rowData];
    let newId = rowData.length;
    let newRow = { item: itemValue, id: newId, quantity: 35 };
    newRowData.push(newRow);
    setRowData(newRowData);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          addRowData();
        }}
      >
        Add data
      </Button>
      <div className="ag-theme-material" style={{ height: 400, width: "100%" }}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
      </div>
    </>
  );
}
