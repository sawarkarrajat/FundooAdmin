import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Navbar, Button, Tab, Tabs, Card } from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import flogo from "../assets/favicon.ico";
import adminService from "../services/adminServices";
const aServe = new adminService();
// const [key, setKey] = useState("advance");
function ControlledTabs(props) {
  console.log("value in props", props.data);
  const [key, setKey] = useState("advance");
  const products = [...props.data.advanceUserData];
  const products1 = [...props.data.basicUserData];
  // var count = 1;
  const rowStyle = (row, rowIndex) => {
    return {
      backgroundColor: "#343a40",
      color:"white"
     };
  };
  const columns = [
    {
      dataField: "firstName",
      text: "First Name"
    },
    {
      dataField: "lastName",
      text: "Last Name"
    },
    {
      dataField: "email",
      text: "Email"
    }
  ];

  return (
    <Tabs
      fill
      id="controlled-tab-example"
      activeKey={key}
      onSelect={k => setKey(k)}
      style={{ padding: "8px" }}
      className="bg-secondary"
    >
      <Tab eventKey="advance" title="Advance" style={{ padding: "8px" }}>
        <BootstrapTable responsive striped bordered={false} hover condensed variant="dark" className="mt-sm-2" bootstrap4 keyField='id' data={products} columns={columns} pagination={paginationFactory()} rowStyle={ rowStyle } />
      </Tab>
      <Tab eventKey="basic" title="Basic" style={{ padding: "8px" }}>
      <BootstrapTable responsive striped bordered={false} hover condensed variant="dark" className="mt-sm-2"  bootstrap4 keyField='id' data={ products1 } columns={ columns } pagination={ paginationFactory() } rowStyle={ rowStyle } />
      </Tab>
    </Tabs>
  );
}

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUserData: [],
      basicCount: "",
      advanceCount: "",
      basicUserData: [],
      advanceUserData: []
    };
  }

  getDataFromDB = async () => {
    await aServe
      .getAllUserData()
      .then(response => {
        var userData = response.data.data.data;
        this.setState({
          allUserData: userData,
          basicUserData: userData.filter(
            userData => userData.service === "basic"
          ),
          advanceUserData: userData.filter(
            userData => userData.service === "advance"
          )
        });

        console.log("data in getdatafromdb", userData, this.state);
      })
      .catch(err => {
        console.log("error occured while fetching data", err);
      });
    await aServe
      .getAllStatics()
      .then(response => {
        var staticsData = response.data.data.details;
        this.setState({
          basicCount: response.data.data.details[0].count,
          advanceCount: response.data.data.details[1].count
        });

        console.log("data in statics", staticsData);
      })
      .catch(err => {
        console.log("error occured while fetching data statics", err);
      });
  };

  handleLogout = () => {
    localStorage.clear();
    const path = "/";
    this.props.history.push(path);
  }

  componentDidMount() {
    this.getDataFromDB();
  }

  render() {
    console.log("data is state", this.state);
    return (
      <Container fluid style={{padding:"0"}}>
        <Navbar bg="dark" variant="dark" className="justify-content-sm-between">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={flogo}
              width="30"
              height="30"
              className="d-inline-block align-middle"
            />
            <Navbar.Text className="m-2 font-weight-bold align-middle text-light">
              Fundoo Admin
            </Navbar.Text>
          </Navbar.Brand>
          <Button variant="outline-light align-" onClick={this.handleLogout}>Logout</Button>
        </Navbar>
        <Container fluid className="d-flex flex-row justify-content-center" >
          <Card
            style={{ width: "50%" }}
            className="m-sm-2 d-flex flex-row  justify-content-around bg-dark text-light"
          >
            <Card.Body className="text-sm-center">
              <Card.Title>Advance Users</Card.Title>

              <Button variant="primary">{this.state.advanceCount}</Button>
            </Card.Body>

            <Card.Body className="text-sm-center">
              <Card.Title>Basic Users</Card.Title>

              <Button variant="primary">{this.state.basicCount}</Button>
            </Card.Body>
          </Card>
        </Container>
        <ControlledTabs data={this.state}  />
      </Container>
    );
  }
}
