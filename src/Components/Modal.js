import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import DateFormat from "dateformat";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function AlignItemsList(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <Typography component="h5" variant="h5">
        Site: {props.data.launch_site.site_name}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Site: {props.data.launch_site.site_name_long}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Details: {props.data.details?props.data.details:"N/A"}
      </Typography>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={`Flight No. - ${props.data.flight_number}`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Launch Date —
              </Typography>
              {DateFormat(props.data.launch_date_local, "dddd, mmmm dS, yyyy")}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      {props.data.links.flickr_images[0] ? (
        <Carousel data={props.data.links.flickr_images} />
      ) : (
        ""
      )}
    </List>
  );
}
