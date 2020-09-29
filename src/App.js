import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Components/Common/Header";
import DashBoard from "./Components/Dashboard";
import Loader from "./Components/Common/Loader";
import Axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const filterUpcoming = () => {
    let upcoming = data.filter((launch) => {
      return launch.upcoming;
    });
    return upcoming;
  };

  const filterPast = () => {
    let past = data.filter((launch) => {
      return !launch.upcoming;
    });
    return past;
  };
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
          <Route
            exact
            path="/"
            render={(props) => (
              <DashBoard
                data={{ launches: data, value: 0, all: data, ...props }}
              />
            )}
          ></Route>
          <Route
            exact
            path="/upcoming"
            render={(props) => (
              <DashBoard
                data={{
                  launches: filterUpcoming(),
                  value: 1,
                  all: data,
                  ...props,
                }}
              />
            )}
          ></Route>
          <Route
            exact
            path="/past"
            render={(props) => (
              <DashBoard
                data={{ launches: filterPast(), value: 2, all: data, ...props }}
              />
            )}
          ></Route>
        </Switch>
      ) : (
        <Loader />
      )}
    </Router>
  );
}

export default App;
