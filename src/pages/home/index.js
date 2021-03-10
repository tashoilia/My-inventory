import React, { useContext, useState } from "react";
import "./index.css";
import { Button, Space, Table, message } from "antd";
import { AuthContext } from "../../context/index";
import DataTable from "../../components/dataTable/index";

export default function Home({ history }) {
  const Auth = useContext(AuthContext);
  const [itemValue, setItemValue] = useState("");

  // console.log(Auth.categories);

  // const selectedCategory = (category) => {
  //   Auth.categories &&
  //     Auth.categories.map((statecategory) => {
  //       console.log(statecategory);
  //       if (statecategory == category) {
  //         setItemValue(category);
  //       }
  //     });
  // };

  // const renderedTable = (item) => {
  //   switch (item) {
  //     case item == "Scaffold":
  //       return <ScaffoldTable />;
  //     case item == "Shed":
  //       return <ShedTable />;
  //     case item == "Shoring":
  //       return <ShoringTable />;
  //     default:
  //       return <div>No datagrid selected</div>;
  //   }
  // };

  return (
    <div className="home-wrapper">
      <h1>Inventory</h1>
      <Space className="home-container">
        <Space className="inventory-section" direction="vertical">
          <h2>{Auth.name ? Auth.name : "No title yet"}</h2>
          <Space direction="vertical">
            <h3>CATEGORIES</h3>
            <Space direction="vertical">
              {Auth.categories.length > 0
                ? Auth.categories.map((category) => {
                    return (
                      <h4
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setItemValue(category);
                        }}
                      >
                        {category}
                      </h4>
                    );
                  })
                : "No category choosen yet"}
            </Space>
          </Space>
        </Space>
        <Space direction="vertical">
          <h3>DATA GRID</h3>
          {/* {renderedTable(itemValue)} */}
          <DataTable itemValue={itemValue} />
        </Space>
      </Space>
      <Button
        type="primary"
        style={{ position: "fixed", bottom: "8%", right: "4%" }}
        onClick={() => {
          history.push("/inventory");
        }}
      >
        Go to inventory
      </Button>
    </div>
  );
}
