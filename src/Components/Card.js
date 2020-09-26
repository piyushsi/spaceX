import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import falcon9 from "./falcon9.jpeg";
import falcon1 from "./falcon1.jpeg";
import falconHeavy from "./falconheavy.jpeg";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import LaunchImg from "./Launch.png";
import Success from "./success.png";
import Failure from "./failure.png";
import Progress from "./progress.png";
import Modal from './Modal'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    width: "19rem",
    height: "8rem",
  },
  cover: {
    width: 151,
    backgroundSize: "contain",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    justifyContent: "center",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  launch: {
    height: "4rem",
    padding: ".5rem",
  },
  launch_status: {
    height: "2rem",
    width: "2rem",
    padding: ".5rem",
  },
  image: {
    position: "absolute",
    height: "8rem",
    padding: ".5rem",
    left: 0,
    top: 0,
  },
  title: {
    marginLeft: "8rem",
  },
}));

export default function MediaControlCard(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImage = () => {
    const id = props.data.rocket.rocket_id;
    return id.includes("9")
      ? falcon9
      : id.includes("1")
      ? falcon1
      : falconHeavy;
  };

  console.log(props);
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.data.mission_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.data.rocket.rocket_name}
          </Typography>
          <div className="year-tag">{props.data.launch_year}</div>
        </CardContent>

        <div className={classes.controls}>
          <img
            className={classes.launch_status}
            src={
              props.data.launch_success
                ? Success
                : typeof props.data.launch_success == "boolean"
                ? Failure
                : Progress
            }
          />
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Details
          </Button>
          <img className={classes.launch} src={LaunchImg} />

          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              <div className={classes.title}>
                Mission: {props.data.mission_name}
                <br />
                Rocket: {props.data.rocket.rocket_name}
                <br />
                Launch Status:{" "}
                {props.data.launch_success
                  ? "Success"
                  : typeof props.data.launch_success == "boolean"
                  ? "Failed"
                  : "In Progress"}
              </div>
              <img
                className={classes.image}
                src={
                  props.data.links.mission_patch_small
                    ? props.data.links.mission_patch_small
                    : handleImage()
                }
              />
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
              <Modal data={props.data}/>
              </DialogContentText>
            </DialogContent>
            <DialogActions></DialogActions>
          </Dialog>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={
          props.data.links.mission_patch_small
            ? props.data.links.mission_patch_small
            : handleImage()
        }
        title="Live from space album cover"
      />
    </Card>
  );
}
