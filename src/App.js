import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Components/Common/Header";
import DashBoard from "./Components/Dashboard";
import Loader from "./Components/Common/Loader";
import Axios from "axios";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    Axios.get("https://api.spacexdata.com/v3/launches").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <Router>
      <Header />
      {data ? (
        <Switch>
          <Route exact path="/">
            <DashBoard data={{ launches: data, value: 0 }} />
          </Route>
          <Route exact path="/upcoming">
            <DashBoard data={{ launches: data, value: 1 }} />
          </Route>
          <Route exact path="/past">
            <DashBoard data={{ launches: data, value: 2 }} />
          </Route>
          <Route exact path="/date">
            <DashBoard data={{ launches: data, value: 3 }} />
          </Route>
          <Route exact path="/failed">
            <DashBoard data={{ launches: data, value: 4 }} />
          </Route>
          <Route exact path="/success">
            <DashBoard data={{ launches: data, value: 5 }} />
          </Route>
        </Switch>
      ) : (
        <Loader />
      )}
    </Router>
  );
}

export default App;
