// import React from "react";
// import { Table } from "antd";

// export default function DataTable({ itemValue }) {
//   const columns = [
//     {
//       title: "Number",
//       dataIndex: "nr",
//     },
//     {
//       title: "Item",
//       dataIndex: "item",
//     },
//     {
//       title: "Quantity",
//       dataIndex: "quantity",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//     },
//     {
//       title: "Notes",
//       dataIndex: "notes",
//     },
//   ];
//   const data = [
//     {
//       key: "1",
//       nr: "1",
//       item: itemValue,
//       quantity: 40,
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//       notes: "",
//     },
//   ];
//   return (
//     <Table
//       columns={columns}
//       dataSource={itemValue.length != 0 ? data : null}
//       pagination={false}
//       size="middle"
//     />
//   );
// }

import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { message, Button } from "antd";

export default function DataTable({ itemValue }) {
  const [rowData, setRowData] = useState([
    // {
    //   nr: "Toyota",
    //   item: itemValue,
    //   quantity: 35000,
    //   descriptionn: "description",
    //   notes: "toyota notes",
    // },
    // {
    //   nr: "Benz",
    //   item: itemValue,
    //   quantity: 20000,
    //   descriptionn: "description",
    //   notes: "benz notes",
    // },
    // {
    //   nr: "Ford",
    //   item: itemValue,
    //   quantity: 40000,
    //   descriptionn: "description",
    //   notes: "ford notes",
    // },
  ]);

  // const getRowNodeId = (data) => {
  //   return data.id;
  // };

  const addRowData = () => {
    if (itemValue.length == 0) {
      return;
    }
    let newRowData = [...rowData];
    let newId = rowData.length;
    let newRow = { item: itemValue, id: newId, quantity: 35000 };
    newRowData.push(newRow);
    console.log(newRowData)
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
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact rowData={rowData}>
          {/* <AgGridColumn field="nr"></AgGridColumn> */}
          <AgGridColumn field="id" sortable={true}></AgGridColumn>
          <AgGridColumn field="item" filter={true}></AgGridColumn>
          <AgGridColumn field="quantity"></AgGridColumn>

          {/* <AgGridColumn field="description"></AgGridColumn>
        <AgGridColumn field="notes"></AgGridColumn> */}
        </AgGridReact>
      </div>
    </>
  );
}
