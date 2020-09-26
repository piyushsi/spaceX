import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import Card from "./Card";
import spaceX from "./spaceX.jpg";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Loader from "./Common/Loader";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import StorageIcon from "@material-ui/icons/Storage";
import ClearAllIcon from "@material-ui/icons/ClearAll";

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
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [allLaunches, setAllLaunches] = useState(null);
  const [launches, setLaunches] = useState(null);
  const [value, setValue] = React.useState(0);

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

  useEffect(() => {
    Axios.get("https://api.spacexdata.com/v3/launches").then((res) => {
      setLaunches(res.data);
      setAllLaunches(res.data);
    });
  }, []);
  console.log(allLaunches);
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
                label="All"
                icon={<StorageIcon />}
                onClick={() => setLaunches(allLaunches)}
              />
              <BottomNavigationAction
                label="Upcoming"
                icon={<RestoreIcon />}
                onClick={() => filterUpcoming()}
              />
              <BottomNavigationAction
                label="Past"
                icon={<ClearAllIcon />}
                onClick={() => filterPast()}
              />
            </BottomNavigation>
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
        <Loader />
      )}
    </div>
  );
}
