import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sass/Unapproved.sass";
import Container from "react-bootstrap/Container";
import { Button, Card } from "react-bootstrap";
import adminService from "../services/adminServices";
import background from "../assets/tile2.jpg";
import update from 'immutability-helper';
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
    aServe.approve(info).then(response => {
      console.log("approved reply", response);
      props.update(info);
    }).catch(err => {
      console.log("failed to approve",err);
    }) 
  }
  function Rejected(info) {
    aServe.reject(info).then(response => {
      console.log("rejected reply", response);
      props.update(info);
    }).catch(err => {
      console.log("failed to reject",err);
    }) 
  }
	const cards = props.data.map(info => (
		<Card key={info.id} id="una">
			<Card.Body id="cbd">
				<div style={{fontSize:"25px",paddingLeft:"15px"}} dangerouslySetInnerHTML={{ __html: info.message }}></div>
			</Card.Body>
			<Card.Body id="cbd" style={{display:"flex",justifyContent:"flex-end"}}>
				<Button variant="success" style={{margin:"0 10px"}} size="sm" onClick={()=>Approved(info)}>Approve</Button>
				<Button variant="danger" style={{margin:"0 10px"}} size="sm" onClick={()=>Rejected(info)}>Reject</Button>
			</Card.Body>
		</Card>
	));
	return cards;
}

class Unapproved extends React.Component {
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
			.getUnApproved()
			.then(response => {
				console.log("response", response.data.data);
				this.setState({ unapproved: response.data.data });
			})
			.catch(err => {
				console.log("err", err);
			});
  };
  handleUpdate = (card) => {
    console.log("in handle update",card);
    let index = this.state.unapproved.indexOf(card);
    this.setState({
      unapproved: update(this.state.unapproved,{
				$splice: [[index, 1]]
			})
    });
  }
	render() {
		return (
			<Container fluid style={Mystyle}>
				<ApprovalCards data={this.state.unapproved} update={this.handleUpdate} />
			</Container>
		);
	}
}

export default Unapproved;
