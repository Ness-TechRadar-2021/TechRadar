import React, { useState, useContext, useRef, useEffect } from "react";
import { ItemWrapper } from "./Item.style";
import { ThemeContext } from "../theme-context";
import PropTypes from "prop-types";
import axios from "../../axios/axios";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

const MAX_LENGTH = 3;

const MAX_LENGTH_DESC = 150;

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
    maxWidth: "70%",
  },
  paper: {
    padding: theme.spacing(1),
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
}));

function Item(props) {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    axios
      .get("/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  let nrProjects = 0;

  if (!error) {
    projects.map((project) => {
      if (project.blips.find((blip) => props.data.id == blip) !== undefined) {
        nrProjects = nrProjects + 1;
      }
    });
  }

  let list = [];

  if (!error) {
    projects.map((project) => {
      if (project.blips.find((blip) => props.data.id == blip) !== undefined) {
        list.push(project.name);
      }
    });
  }

  //create ref
  let ref = useRef(null);

  //context variables
  const { itemFontSize, fontFamily } = useContext(ThemeContext);

  //state variables
  const [isHovered, setIsHovered] = useState(false);

  const shortName =
    props.data.name.length > MAX_LENGTH
      ? props.data.name.substr(0, MAX_LENGTH) + "..."
      : props.data.name;

  const description =
    props.data.description.length > MAX_LENGTH_DESC
      ? props.data.description.substr(0, MAX_LENGTH_DESC) + "..."
      : props.data.description;

  const long = (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <Typography>Name: {props.data.name}</Typography>
      <Typography>Description: {description}</Typography>
      <Typography>
        List of projects it is found in:{" "}
        {list.length ? list.join("; ") : "None"}
      </Typography>
    </Popover>
  );

  const onMouseToggle = (event) => {
    setIsHovered(!isHovered);
    setAnchorEl(event.currentTarget);
  };

  return (
    <NavLink
    className={classes.link}
    to={`/blips/view/${props.data.id}`}
    style={{ textDecoration: "none" }}
  >
    <ItemWrapper
      className="blip"
      id={"blip-" + props.data.id}
      transform={
        " rotate(" +
        props.rotateDegrees +
        ") translate(" +
        props.data.x +
        "," +
        props.data.y +
        ")"
      }
      onMouseEnter={onMouseToggle}
      onMouseLeave={onMouseToggle}
      ref={ref}
      style={{
        opacity: isHovered ? "1.0" : "0.7",
        fontWeight: "Bold",
      }}
    >
      <text
        className={"name"}
        dx={"-3px"}
        dy={"7px"}
        fontSize={itemFontSize}
        fontFamily={fontFamily}
      >
        {nrProjects}
        {isHovered ? long : shortName}
      </text>
    </ItemWrapper>
  </NavLink>
  );
}

Item.propTypes = {
  rotateDegrees: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
};

export default Item;
