import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import Card from "./Card";
import spaceX from "./spaceX.jpg";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Loader from "./Common/Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5rem",
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
    top: "17rem",
    color: "#fff",
    fontSize: "2rem",
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [allLaunches, setAllLaunches] = useState(null);
  const [launches, setLaunches] = useState(null);
  useEffect(() => {
    Axios.get("https://api.spacexdata.com/v3/launches").then((res) => {
      setLaunches(res.data);
      setAllLaunches(res.data);
    });
  }, []);

  return (
    <div className={classes.root}>
      {launches ? (
        <Grid container>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1 className={classes.top}>
                Total No. of Launches - {launches.length}
                <br />
                <ArrowDownwardIcon />
              </h1>
              <img className={classes.carousel} src={spaceX} />
            </Paper>
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
        <Loader/>
      )}
    </div>
  );
}
