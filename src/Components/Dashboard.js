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
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateRangeIcon from "@material-ui/icons/DateRange";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Link } from "react-router-dom";

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
}));

export default function CenteredGrid(props) {
  const classes = useStyles();
  const [allLaunches, setAllLaunches] = useState(props.data.launches);
  const [launches, setLaunches] = useState(props.data.launches);
  const [value, setValue] = React.useState(0);
  const [dateResultActive, setDateResultActive] = React.useState(null);

  const filterUpcoming = () => {
    let upcoming = allLaunches.filter((launch) => {
      return launch.upcoming;
    });
    setLaunches(upcoming);
  };

  const filterPast = () => {
    let upcoming = allLaunches.filter((launch) => {
      return !launch.upcoming;
    });
    setLaunches(upcoming);
  };

  const filterFailed = () => {
    let failed = allLaunches.filter(
      (launch) =>
        !launch.launch_success && typeof launch.launch_success != "object"
    );
    setLaunches(failed);
  };

  const filterSuccess = () => {
    let success = allLaunches.filter((launch) => launch.launch_success);
    setLaunches(success);
  };

  const [selectedStartDate, setSelectedStartDate] = React.useState(
    new Date("2006-03-25T21:11:54")
  );

  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());

  const [startDate, setStartDate] = React.useState(null);

  const handleDateChangeStart = (date) => {
    let unixTime = new Date(date).valueOf() / 1000;
    setStartDate(unixTime);
    let filteredLaunch = allLaunches.filter((el) => {
      return el.launch_date_unix >= unixTime;
    });
    setLaunches(filteredLaunch);
    setSelectedStartDate(date);
    setSelectedEndDate(new Date());
  };

  const handleDateChangeEnd = (date) => {
    let unixTime = new Date(date).valueOf() / 1000;
    setSelectedEndDate(date);
    dateWiseResult(unixTime);
  };

  const dateWiseResult = (endDate) => {
    let filteredLaunch = allLaunches
      .filter((el) => el.launch_date_unix >= startDate)
      .filter((el) => el.launch_date_unix <= endDate);
    setLaunches(filteredLaunch);
  };

  useEffect(() => {
    switch (props.data.value) {
      case 1:
        setValue(1);
        filterUpcoming();
        break;
      case 2:
        setValue(2);
        filterPast();
        break;
      case 3:
        setValue(3);
        break;
      case 4:
        setValue(4);
        filterFailed();
        break;
      case 5:
        setValue(5);
        filterSuccess();
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
                setDateResultActive(false);
                setStartDate(null);
              }}
              showLabels
            >
              <BottomNavigationAction
                component={Link}
                label="All"
                to="/"
                icon={<StorageIcon />}
                onClick={() => setLaunches(allLaunches)}
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
              <BottomNavigationAction
                component={Link}
                to="/date"
                label="Date Range"
                icon={<DateRangeIcon />}
                onClick={() => setDateResultActive(!dateResultActive)}
              />
              <BottomNavigationAction
                component={Link}
                to="/failed"
                label="Failed Launch"
                icon={<CancelIcon />}
                onClick={() => filterFailed()}
              />
              <BottomNavigationAction
                component={Link}
                to="/success"
                label="Successful Launch"
                icon={<CheckCircleIcon />}
                onClick={() => filterSuccess()}
              />
            </BottomNavigation>
            {dateResultActive ? (
              <div className={classes.center}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Start Date"
                    format="MM/dd/yyyy"
                    value={selectedStartDate}
                    onChange={handleDateChangeStart}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  {startDate ? (
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="End Date"
                      format="MM/dd/yyyy"
                      value={selectedEndDate}
                      onChange={handleDateChangeEnd}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </MuiPickersUtilsProvider>
              </div>
            ) : (
              ""
            )}

            <div className={classes.center}>{launches.length} Launches</div>
          </Grid>

          {launches.map((launch) => {
            return (
              <Grid item xs={12} md={3}>
                <Paper className={classes.paper}>
                  <Card data={launch} />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        ""
      )}
    </div>
  );
}
