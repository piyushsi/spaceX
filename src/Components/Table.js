import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import falcon9 from "./falcon9.jpeg";
import falcon1 from "./falcon1.jpeg";
import falconHeavy from "./falconheavy.jpeg";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Modal from "./Modal";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const columns = [
  { id: "name", label: "Mission", minWidth: 170 },
  { id: "rocket", label: "Rocket", minWidth: 170 },
  {
    id: "year",
    label: "Year",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "sts",
    label: "Status",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "logo",
    label: "",
    minWidth: 170,
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  img: {
    height: "5rem",
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
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [singleData, setSingleData] = React.useState(null);

  const handleClickOpen = (data) => {
    setOpen(true);
    setSingleData(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImage = (id) => {
    return id.includes("9")
      ? falcon9
      : id.includes("1")
      ? falcon1
      : falconHeavy;
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  onClick={() => handleClickOpen(row)}
                >
                  <TableCell>{row.mission_name}</TableCell>
                  <TableCell>{row.rocket.rocket_name}</TableCell>

                  <TableCell>{row.launch_year}</TableCell>

                  <TableCell>
                    {row.launch_success
                      ? "Success"
                      : typeof row.launch_success == "boolean"
                      ? "Failed"
                      : "Progress"}
                  </TableCell>
                  <TableCell>
                    <img
                      className={classes.img}
                      src={
                        row.links.mission_patch_small
                          ? row.links.mission_patch_small
                          : handleImage(row.rocket.rocket_id)
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {singleData ? (
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
              Mission: {singleData.mission_name}
              <br />
              Rocket: {singleData.rocket.rocket_name}
              <br />
              Launch Status:{" "}
              {singleData.launch_success
                ? "Success"
                : typeof singleData.launch_success == "boolean"
                ? "Failed"
                : "In Progress"}
            </div>
            <img
              className={classes.image}
              src={
                singleData.links.mission_patch_small
                  ? singleData.links.mission_patch_small
                  : handleImage(singleData.rocket.rocket_id)
              }
            />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Modal data={singleData} />
            </DialogContentText>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      ) : (
        ""
      )}
    </Paper>
  );
}
