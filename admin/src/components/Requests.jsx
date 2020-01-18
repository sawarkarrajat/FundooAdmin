import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sass/Unapproved.sass";
import Container from "react-bootstrap/Container";
import { Button, Card } from "react-bootstrap";
import adminService from "../services/adminServices";
import background from "../assets/tile2.jpg";
import update from "immutability-helper";
const aServe = new adminService();

const Mystyle = {
	padding: "0",
	minHeight: "100vh",
	backgroundImage: `url(${background})`,
	backgroundRepeat: "repeat",
	display: "flex",
	flexDirection: "column",
	alignItems: "center"
};
function ApprovalCards(props) {
	function Approved(info) {
		let data = {
			cartId: info
		}
		aServe
			.rapprove(data)
			.then(response => {
				console.log("approved request", response);
				props.update(info);
			})
			.catch(err => {
				console.log("failed to approve request", err);
			});
	}
	function Rejected(info) {
		let data = {
			cartId: info
		}
		aServe
			.rreject(data)
			.then(response => {
				console.log("rejected rejected", response);
				props.update(info);
			})
			.catch(err => {
				console.log("failed to reject request", err);
			});
	}
	const cards = props.data.map(info => (
		<Card key={info.id} id="una">
			<Card.Body className="rcard">
				<p id="tx">Service:</p>
				<div
					id="stext"
					style={{ fontSize: "25px", paddingLeft: "15px" }}
					dangerouslySetInnerHTML={{ __html: info.product.name  }}
				></div>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<p id="tx">User:</p>
				<div
					id="stext"
					style={{ fontSize: "25px", paddingLeft: "15px" }}
					dangerouslySetInnerHTML={{
						__html: info.user && info.user.firstName ? info.user.firstName : "not specified"
					}}
				></div>
				<div
					id="stext"
					style={{ fontSize: "25px", paddingLeft: "15px" }}
					dangerouslySetInnerHTML={{
						__html: info.user && info.user.lastName ? info.user.lastName : ""
					}}
				></div>
			</Card.Body>
			<Card.Body
				id="cbd"
				style={{ display: "flex", justifyContent: "flex-end" }}
			>
				<Button
					variant="success"
					style={{ margin: "0 10px" }}
					size="sm"
					onClick={() => Approved(info.id)}
				>
					Approve
				</Button>
				<Button
					variant="danger"
					style={{ margin: "0 10px" }}
					size="sm"
					onClick={() => Rejected(info.id)}
				>
					Reject
				</Button>
			</Card.Body>
		</Card>
	));
	return cards;
}

class Requests extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			unapproved: []
		};
	}
	componentDidMount() {
		this.hitApi();
	}
	hitApi = () => {
		aServe
			.getUnApprovedRequests()
			.then(response => {
				console.log("response", response.data.data);
				this.setState({ unapproved: response.data.data });
			})
			.catch(err => {
				console.log("err", err);
			});
	};
	handleUpdate = card => {
		console.log("in handle update", card);
		let index = this.state.unapproved.indexOf(card);
		this.setState({
			unapproved: update(this.state.unapproved, {
				$splice: [[index, 1]]
			})
		});
	};
	render() {
		return (
			<Container fluid style={Mystyle}>
				<ApprovalCards
					data={this.state.unapproved}
					update={this.handleUpdate}
				/>
			</Container>
		);
	}
}

export default Requests;
