import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { blue, red, green, purple } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 230,
    // maxHeight: "100%",
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
  paper: {
    position: "absolute",
    width: "30%",
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
  cardHeaderRoot: {
    overflow: "hidden",
  },
  cardHeaderContent: {
    overflow: "hidden",
  },
  buttonContinue:{
    color: "green",
  }
}));

export default function Blip(props) {
  const { _id, name, quadrant, ring } = props;
  let styleProps;
  let baseColorLevel = 100;

  const colors = {
    "Programming Languages and Frameworks": {
      Hold: blue[baseColorLevel],
      Assess: blue[baseColorLevel + 200],
      Trial: blue[baseColorLevel + 500],
      Adopt: blue[baseColorLevel + 800],
    },
    Tools: {
      Hold: green[baseColorLevel],
      Assess: green[baseColorLevel + 200],
      Trial: green[baseColorLevel + 500],
      Adopt: green[baseColorLevel + 800],
    },
    Platforms: {
      Hold: red[baseColorLevel],
      Assess: red[baseColorLevel + 200],
      Trial: red[baseColorLevel + 500],
      Adopt: red[baseColorLevel + 800],
    },
    Techniques: {
      Hold: purple[baseColorLevel],
      Assess: purple[baseColorLevel + 200],
      Trial: purple[baseColorLevel + 500],
      Adopt: purple[baseColorLevel + 800],
    },
  };

  styleProps = { backgroundColor: colors[quadrant][ring] };

  const classes = useStyles(styleProps);

  const [open, setOpen] = React.useState(false);

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
          classes={{
            root: classes.cardHeaderRoot,
            content: classes.cardHeaderContent,
          }}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {name[0]}
            </Avatar>
          }
          title={
            <Typography
              variant="h6"
              // color="textSecondary"
              component="h4"
              noWrap
            >
              {name}
            </Typography>
          }
          subheader={ring}
        />
        <CardMedia className={classes.media} title={name} />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            noWrap
          >
            Quadrant : {quadrant}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <NavLink
              className={classes.link}
              to={`/blips/edit/${_id}`}
              style={{ textDecoration: "none" }}
            >
              <EditIcon></EditIcon>
            </NavLink>
          </IconButton>
          <IconButton aria-label="share">
            <DeleteIcon onClick={handleOpen} />
          </IconButton>

          <IconButton aria-label="add to favorites">
            <NavLink
              className={classes.link}
              to={`/blips/view/${_id}`}
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
              className={classes.buttonContinue}
              onClick={() => {
                props.onRemoveBlip(props.blip);
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

Blip.propTypes = {
  name: PropTypes.string,
  quadrant: PropTypes.string,
  ring: PropTypes.string,
  description: PropTypes.string,
  handleExpandClick: PropTypes.func,
  expanded: PropTypes.bool,
  classes: PropTypes.func,
};
