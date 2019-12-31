import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Admin from "./components/Admin";
function App() {
  return (
    <div>
      <BrowserRouter> 
        <Route path="/" exact component={Login}></Route>
        <Route path="/admin" component={Admin}></Route>
        {/* <Route path="/dashboard/" component={}></Route> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
