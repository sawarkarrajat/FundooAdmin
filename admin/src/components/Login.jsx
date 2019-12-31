import React, { useState } from "react";
import "../sass/Login.sass";
import Container from "react-bootstrap/Container";
import { Navbar, Button, Tab, Tabs, Card } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
// import adminService from "../services/adminServices";

// const aServe = new adminService();
import background from "../assets/bgg.jpg";
var bgimg = {
	// padding: "0",
	// height: "100vh",
	width: "96%",
	borderRadius:"15px",
	backgroundImage: `url(${background})`,
	backgroundRepeat: "no-repeat" /* Do not repeat the image */,
	backgroundSize:
		"cover" /* Resize the background image to cover the entire container */
};
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		};
	}
	render() {
		return (
			<Container
				fluid
				style={{ padding: "0", height: "100vh",backgroundColor: "#1b1b1b" }}
				className="d-flex flex-column justify-content-center align-items-center"
			>
				<div style={bgimg}>
					<div id="bgcard">
						<Card
							id="login"
							style={{ width: "25%", backgroundColor: "#1b1b1bb8",borderRadius:"15px" }}
							className="m-sm-2 d-flex flex-column justify-content-center text-white"
						>
							<Card.Body className="text-sm-center" id="cBody">
								<Card.Title style={{padding: "8px 0",marginBottom:"0"}}>Login</Card.Title>
							</Card.Body>
							<Card.Body id="cBody">
								<Card.Text>Email</Card.Text>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text id="basic-addon1">@</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Username"
										aria-label="Username"
										aria-describedby="basic-addon1"
									/>
								</InputGroup>
								<Card.Text>Password</Card.Text>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text id="basic-addon1">#</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										type="password"
										placeholder="password"
										aria-label="password"
										aria-describedby="basic-addon1"
									/>
								</InputGroup>
							</Card.Body>
						</Card>
					</div>
				</div>
			</Container>
		);
	}
}

export default Login;
