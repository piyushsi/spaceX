import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Components/Common/Header";
import DashBoard from "./Components/Dashboard";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <DashBoard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
