import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "./Card";
import spaceX from "./spaceX.jpg";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import StorageIcon from "@material-ui/icons/Storage";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import TextField from "@material-ui/core/TextField";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Link } from "react-router-dom";
import Table from "./Table";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import DateRangeIcon from "@material-ui/icons/DateRange";
import FindReplaceIcon from "@material-ui/icons/FindReplace";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "4rem",
  },
  paper: {
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  carousel: {
    height: "50vh",
    width: "100%",
  },
  top: {
    ...theme.typography.button,
    padding: theme.spacing(1),
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    top: "15rem",
    color: "#fff",
    fontSize: "2rem",
  },
  center: {
    textAlign: "center",
    color: "#3F51B5",
  },
  switch: {
    right: "0",
    position: "absolute",
  },
  filters: {
    textAlign: "center",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function CenteredGrid(props) {
  const classes = useStyles();
  const [allLaunches, setAllLaunches] = useState(props.data.all);
  const [launches, setLaunches] = useState(props.data.launches);
  const [store, setStore] = useState(null);
  const [value, setValue] = React.useState(0);
  const [grid, setGrid] = React.useState(false);
  const [successFilter, setSuccessFilter] = React.useState(false);
  const [dateFilter, setDateFilter] = React.useState(false);
  const [dateRange, setDateRange] = React.useState("1136073600/1601424000");
  const [initialDateRange, setInitialDateRange] = React.useState("1136073600");
  const [finalDateRange, setFinalDateRange] = React.useState("1601424000");

  const handleGridChange = () => {
    setGrid(!grid);
  };

  const successUrl = () => {
    var store = successFilter
      ? props.data.location.pathname
      : props.data.location.pathname + "?true";
    return store;
  };

  const dateUrl = () => {
    var store = successFilter
      ? props.data.location.pathname + "?true"
      : props.data.location.pathname;
    var newStore = dateFilter ? store + "?date?" + dateRange : store;
    return newStore;
  };

  const searchFilter = () => {
    let search = props.data.location.search;
    if (search.includes("true")) {
      filterSuccess();
    }
    if (search.includes("date") && search.includes("true")) {
      let date = search.split("?")[3] ? search.split("?")[3].split("/") : null;
      filterDate();
      if (date) {
        setDateFilter(true);
        setInitialDateRange(date[0]);
        setFinalDateRange(date[1]);
        let filtered = launches
          .filter((el) => el.launch_date_unix >= date[0])
          .filter((el) => el.launch_date_unix <= date[1]);
        let finalLaunch = filtered.filter((launch) => launch.launch_success);
        setLaunches(finalLaunch);
      }
    }
    if (search.includes("date") && !search.includes("true")) {
      let date = search.split("?")[2] ? search.split("?")[2].split("/") : null;
      filterDate();
      if (date) {
        setDateFilter(true);
        setInitialDateRange(date[0]);
        setFinalDateRange(date[1]);
        let filtered = launches
          .filter((el) => el.launch_date_unix >= date[0])
          .filter((el) => el.launch_date_unix <= date[1]);
        let finalLaunch = filtered.filter((launch) => launch.launch_success);
        setLaunches(finalLaunch);
      }
    }
  };
  const filterAll = () => {
    let all = props.data.all;
    setLaunches(all);
    setSuccessFilter(false);
    setDateFilter(false);
  };
  const filterUpcoming = () => {
    let upcoming = props.data.all.filter((launch) => {
      return launch.upcoming;
    });
    setLaunches(upcoming);
    setSuccessFilter(false);
    setDateFilter(false);
  };

  const filterPast = () => {
    let past = props.data.all.filter((launch) => {
      return !launch.upcoming;
    });
    setLaunches(past);
    setSuccessFilter(false);
    setDateFilter(false);
  };

  const filterSuccess = () => {
    let date = dateRange.split("/");
    let success = launches.filter((launch) => launch.launch_success);
    let finalLaunch =
      dateFilter && dateRange != ""
        ? success
            .filter((el) => el.launch_date_unix >= date[0])
            .filter((el) => el.launch_date_unix <= date[1])
        : success;
    if (!successFilter) {
      setStore(launches);
      setLaunches(finalLaunch);
    } else {
      setLaunches(store);
    }
    setSuccessFilter(!successFilter);
  };

  const filterDate = () => {
    let date = dateRange.split("/");
    let filteredLaunch = allLaunches
      .filter((el) => el.launch_date_unix >= date[0])
      .filter((el) => el.launch_date_unix <= date[1]);
    let finalLaunch = successFilter
      ? filteredLaunch.filter((launch) => launch.launch_success)
      : filteredLaunch;
    setLaunches(finalLaunch);
  };

  const initialDate = (e) => {
    setInitialDateRange(new Date(e.target.value).valueOf() / 1000);
    setDateRange(
      new Date(e.target.value).valueOf() / 1000 + "/" + finalDateRange
    );
  };

  const finalDate = (e) => {
    setFinalDateRange(new Date(e.target.value).valueOf() / 1000);
    setDateRange(
      initialDateRange + "/" + new Date(e.target.value).valueOf() / 1000
    );
  };

  useEffect(() => {
    switch (props.data.value) {
      case 0:
        setValue(0);
        filterAll();
        searchFilter();
        break;
      case 1:
        setValue(1);
        filterUpcoming();
        searchFilter();
        break;
      case 2:
        setValue(2);
        filterPast();
        searchFilter();
        break;
      default:
    }
  }, []);
  return (
    <div className={classes.root}>
      {allLaunches ? (
        <Grid container>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1 className={classes.top}>
                Total No. of Launches - {allLaunches.length}
                <br />
                <ArrowDownwardIcon />
              </h1>
              <img className={classes.carousel} src={spaceX} />
            </Paper>
            <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              showLabels
            >
              <BottomNavigationAction
                component={Link}
                label="All"
                to="/"
                icon={<StorageIcon />}
                onClick={() => filterAll()}
              />
              <BottomNavigationAction
                component={Link}
                to="/upcoming"
                label="Upcoming"
                icon={<RestoreIcon />}
                onClick={() => filterUpcoming()}
              />
              <BottomNavigationAction
                component={Link}
                to="/past"
                label="Past"
                icon={<ClearAllIcon />}
                onClick={() => filterPast()}
              />
            </BottomNavigation>
            <Divider />
            <div className={classes.filters}>
              <BottomNavigationAction
                style={{ color: successFilter ? "blue" : "" }}
                component={Link}
                to={successUrl()}
                icon={<CheckCircleIcon />}
                onClick={() => filterSuccess()}
              />
              <BottomNavigationAction
                style={{ color: dateFilter ? "blue" : "" }}
                icon={<DateRangeIcon />}
                onClick={() => {
                  setDateFilter(!dateFilter);
                }}
              />
              <br />
              {dateFilter ? (
                <div>
                  <TextField
                    id="date"
                    label="From"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={new Date(initialDateRange * 1000)
                      .toISOString()
                      .slice(0, 10)}
                    onChange={(e) => initialDate(e)}
                  />
                  <TextField
                    id="date"
                    label="To"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={new Date(finalDateRange * 1000)
                      .toISOString()
                      .slice(0, 10)}
                    onChange={(e) => finalDate(e)}
                  />

                  <BottomNavigationAction
                    component={Link}
                    to={dateUrl()}
                    icon={<FindReplaceIcon />}
                    onClick={() => filterDate()}
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <div className={classes.center}>
              {launches.length} Launches{" "}
              <FormControlLabel
                className={classes.switch}
                control={
                  <Switch
                    checked={grid}
                    onChange={handleGridChange}
                    name="gilad"
                  />
                }
                label="Grid View"
              />
            </div>
          </Grid>
          {grid ? (
            launches.map((launch) => {
              return (
                <Grid item xs={12} md={3}>
                  <Paper className={classes.paper}>
                    <Card data={launch} />
                  </Paper>
                </Grid>
              );
            })
          ) : (
            <Table data={launches} />
          )}
        </Grid>
      ) : (
        ""
      )}
    </div>
  );
}
