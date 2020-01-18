import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard";
import Unapproved from "./components/Unapproved";
import Requests from "./components/Requests";
function App() {
	return (
		<Container fluid style={{ padding: "0" }} className="d-flex flex-column justify-content-center">
			<BrowserRouter>
				<Route path="/" exact component={Login} />
				<Route path="/admin" component={Admin} />
				<Route path="/admin/dashboard" component={Dashboard} />
				<Route path="/admin/unapproved" component={Unapproved}/>
				<Route path="/admin/requests" component={Requests}/>
				{/* <Route path="/dashboard/" component={}></Route> */}
			</BrowserRouter>
		</Container>
	);
}

export default App;
