import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { NavLink } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 230,
    maxHeight: "100%",
    boxSizing: "content-box",
    justifyContent: "space-between",
    backgroundColor: "ghostwhite",
    marginBottom: 30,
  },
  media: {
    height: 0,
  },
  avatar: (props) => ({
    backgroundColor: props.backgroundColor,
  }),
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  truncate: {
    width: "200px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: 20,
    fontSize: "1.3rem",
    margin: 0,
    lineClamp: 1,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: "black",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

export default function Project(props) {
  const { _id, name } = props;
  let styleProps;

  const classes = useStyles(styleProps);

  const [open, setOpen] = React.useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  //this is for the modals
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.root} onClick={props.clicked}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {name[0]}
            </Avatar>
          }
          title={name}
          className={classes.truncate}
        />
        <CardMedia className={classes.media} title={name} />
        <CardActions disableSpacing>
          {currentUser ? (
            <div>
              <IconButton aria-label="add to favorites">
                <NavLink
                  className={classes.link}
                  to={`/projects/edit/${_id}`}
                  style={{ textDecoration: "none" }}
                >
                  <EditIcon></EditIcon>
                </NavLink>
              </IconButton>
              <IconButton onClick={handleOpen} aria-label="share">
                <DeleteIcon />
              </IconButton>
            </div>
          ) : null}

          <IconButton aria-label="add to favorites">
            <NavLink
              className={classes.link}
              to={`/projects/view/${_id}`}
              style={{ textDecoration: "none" }}
            >
              <VisibilityIcon />
            </NavLink>
          </IconButton>
        </CardActions>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <h3>Are you sure you want to do this?</h3>
          <div className={classes.buttonsContainer}>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                props.onRemoveProject(props.project);
                setOpen(false);
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

// Blip.propTypes = {
//   name: PropTypes.string,
//   quadrant: PropTypes.string,
//   ring: PropTypes.string,
//   description: PropTypes.string,
//   handleExpandClick: PropTypes.func,
//   expanded: PropTypes.bool,
//   classes: PropTypes.func,
// };
