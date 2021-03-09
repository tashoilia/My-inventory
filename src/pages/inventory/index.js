import React, { useState, useContext } from "react";
import "./index.css";
import { Button, Modal, Table, Space, Input, AutoComplete, Select } from "antd";
import { AuthContext } from "../../context/index";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import { MenuOutlined } from "@ant-design/icons";
import arrayMove from "array-move";

const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />
));

const SortableItem = sortableElement((props) => <tr {...props} />);
const SortableContainer = sortableContainer((props) => <tbody {...props} />);

const Option = Select.Option;

export default class Inventory extends React.Component {
  state = {
    isModalVisible: false,
    name: "",
    inventoryData: [],
    categories: [],
    inventoryColumns: [
      {
        title: "Sort",
        dataIndex: "sort",
        width: 30,
        className: "drag-visible",
        render: () => <DragHandle />,
      },
      {
        title: "JOB SITE NAME",
        dataIndex: "name",
      },
      {
        title: "Status",
        dataIndex: "status",
      },
    ],
    options: [{ value: "Shed" }, { value: "Scaffold" }, { value: "Shoring" }],
  };
  static contextType = AuthContext;

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { inventoryData } = this.state;
    if (oldIndex !== newIndex) {
      const newData = arrayMove(
        [].concat(inventoryData),
        oldIndex,
        newIndex
      ).filter((el) => !!el);
      console.log("Sorted items: ", newData);
      this.setState({ inventoryData: newData });
    }
  };

  DraggableContainer = (props) => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={this.onSortEnd}
      {...props}
    />
  );

  DraggableBodyRow = ({ className, style, ...restProps }) => {
    const { inventoryData } = this.state;
    // function findIndex base on Table rowKey props and should always be a right array index
    const key = inventoryData.findIndex(
      (x) => x.key === restProps["data-row-key"]
    );
    console.log(key, restProps["data-row-key"]);
    return <SortableItem key={key} {...restProps} />;
  };

  addToInventory = () => {
    let newInventoryData = [...this.state.inventoryData];
    if (this.state.name.length == 0) {
      return;
    }
    newInventoryData.push({
      key: this.state.inventoryData.length,
      name: this.state.name,
      status: "pending",
    });
    this.setState({ inventoryData: [...newInventoryData] });
    console.log(newInventoryData);
  };

  onSelect = (data) => {
    let newCategory = [...this.state.categories];
    newCategory.push(data);
    this.setState({ categories: [...newCategory] });
  };

  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  handleOk = () => {
    this.setState({ isModalVisible: false });
    this.addToInventory();
    this.setState({ name: "" });
    this.context.getName(this.state.name);
    this.context.getCategories(this.state.categories);
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
    this.setState({ name: "" });
  };

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  handleName = (e) => {
    this.setState({ name: e.target.value });
  };

  render() {
    return (
      <div className="inventory-wrapper">
        <div className="inventory-child">
          <h1>Inventory</h1>
          <div className="table-wrapper">
            <Table
              columns={this.state.inventoryColumns}
              dataSource={this.state.inventoryData}
              size="small"
              pagination={false}
              rowKey="index"
              components={{
                body: {
                  wrapper: this.DraggableContainer,
                  row: this.DraggableBodyRow,
                },
              }}
            />{" "}
            <Button type="primary" onClick={this.showModal}>
              Create
            </Button>
          </div>

          <Modal
            title="ADD NEW JOBSITE"
            visible={this.state.isModalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            closable={false}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Space direction="vertical" size={2}>
                <h3>Name</h3>
                <Input
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleName}
                />
              </Space>
              <Space
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Space direction="vertical" size={2}>
                  <h3>Category Included</h3>
                  <AutoComplete
                    options={this.state.options}
                    onSelect={this.onSelect}
                    placeholder="Type a category"
                  />
                </Space>
                <Space direction="vertical" size={2}>
                  <h3>PM</h3>
                  <Select defaultValue="Mike" onChange={this.handleChange}>
                    <Option value="mike">Mike</Option>
                  </Select>
                </Space>
              </Space>
              <Space>
                {this.state.categories.map((category) => {
                  return <h4>{category}</h4>;
                })}
              </Space>
            </Space>
          </Modal>
          <Button
            type="primary"
            style={{ position: "fixed", bottom: "8%", right: "4%" }}
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            Go datagrid
          </Button>
        </div>
      </div>
    );
  }
}
