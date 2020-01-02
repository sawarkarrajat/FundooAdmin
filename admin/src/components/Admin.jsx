import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sass/Admin.sass";
import { Navbar, Button, DropdownButton, Dropdown } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import flogo from "../assets/favicon.ico";

function DropDownButtons(props) {
  
	return (
		<ButtonGroup id="ddbutton" size="sm">
			<DropdownButton as={ButtonGroup} title="Goto" id="bg-nested-dropdown">
				<Dropdown.Item onClick={()=>props.call("1")}>Dashboard</Dropdown.Item>
				<Dropdown.Item onClick={()=>props.call("2")}>Unapproved answers</Dropdown.Item>
			</DropdownButton>
		</ButtonGroup>
	);
}

export default class Admin extends React.Component {
	handleLogout = () => {
		localStorage.clear();
		const path = "/";
		this.props.history.push(path);
	};
  handlePush = (choice) => {
    console.log("choice is ",choice);
    switch (choice) {
      case "1":
        console.log("in case 1");
        this.props.history.push("/admin/dashboard")
        break;
    
      case "2":
        this.props.history.push("/admin/unapproved")
        break;
  
      default:
        break;
    }
  }
	render() {
		return (
			<Fragment>
				<Navbar className="justify-content-sm-between bg-dark text-white">
          <Navbar.Brand onClick={()=>this.handlePush("1")}>
						<img
							alt=""
							src={flogo}
							width="30"
							height="30"
							className="d-inline-block align-middle"
						/>
						<Navbar.Text id="banerText" className="m-2 font-weight-bold align-middle text-light">
							Fundoo Admin
						</Navbar.Text>
					</Navbar.Brand>
					<div
						id="ddbutton"
					>
            <DropDownButtons call={this.handlePush}/>
						<Button variant="outline-light " onClick={this.handleLogout}>
							Logout
						</Button>
					</div>
				</Navbar>
			</Fragment>
		);
	}
}
