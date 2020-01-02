import React from "react";
import "../sass/Login.sass";
import Container from "react-bootstrap/Container";
import { Button, Card } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import adminService from "../services/adminServices";
import background from "../assets/bgg.jpg";
const aServe = new adminService();
var bgimg = {
	// padding: "0",
	// height: "100vh",
	width: "98%",
	borderRadius: "15px",
	backgroundImage: `url(${background})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
	boxShadow:
		"4px 4px 7px 1px rgba(0, 0, 0, 0.19), 3px 3px 13px 5px rgba(0, 0, 0, 0.5)"
};
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		};
	}
	hitApi = () => {
		let data = {
			email: this.state.email,
			password: this.state.password
		};
		aServe.login(data).then(response => {
			console.log("login successful", response);
			if (response.status === 200) {
				localStorage.setItem("token", response.data.id);
				this.props.history.push("/admin/dashboard");
			}
		}).catch(err => {
			console.log("unsuccessful",err);
		})
	};
	handleChange = event => {
		event.preventDefault();
		console.log("target has value", event.target.value);
		this.setState({ [event.target.name]: event.target.value });
	};
	render() {
		return (
			<Container
				fluid
				style={{ padding: "0", height: "100vh", backgroundColor: "#fff" }}
				className="d-flex flex-column justify-content-center align-items-center"
			>
				<div style={bgimg}>
					<div id="bgcard">
						<Card
							id="login"
							style={{
								width: "275px",
								backgroundColor: "#1b1b1bb8",
								borderRadius: "8px"
							}}
							className="m-sm-2 d-flex flex-column justify-content-center text-white"
						>
							<Card.Body className="text-sm-center" id="cBody">
								<Card.Title style={{ padding: "8px 0", marginBottom: "0" }}>
									Login
								</Card.Title>
							</Card.Body>
							<Card.Body id="cBody">
								<Card.Text>Email</Card.Text>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text id="basic-addon1">@</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										placeholder="Username"
										value={this.state.email}
										name="email"
										aria-label="Username"
										aria-describedby="basic-addon1"
										onChange={e => this.handleChange(e)}
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
										name="password"
										value={this.state.password}
										aria-label="password"
										aria-describedby="basic-addon1"
										onChange={e => this.handleChange(e)}
									/>
								</InputGroup>

							</Card.Body>
							<Card.Body id="cBody2">

								<Button variant="primary" size="sm" onClick={this.hitApi} >sign in</Button>
							</Card.Body>
						</Card>
					</div>
				</div>
			</Container>
		);
	}
}

export default Login;
