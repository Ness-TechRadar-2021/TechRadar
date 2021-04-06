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
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 230,
    maxHeight: '100%',
    boxSizing: 'content-box',
    justifyContent: 'space-between',
    backgroundColor: "ghostwhite",
    marginBottom: 30
  },
  media: {
    height: 0,
  },
  avatar: (props) => ({
    backgroundColor: props.backgroundColor,
  }),
  link: {
    color: 'inherit', 
    textDecoration: 'none'
  },
  truncate: {
    width: '200px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: 20,
    fontSize: '1.3rem',
    margin: 0,
    lineClamp: 1
  
  }
}));

export default function Blip(props) {
  const { _id, name, quadrant, ring, description } = props;
  let styleProps;
  let baseColorLevel = 100;

  const colors = {
    'Programming Languages and Frameworks': {
      Hold: blue[baseColorLevel],
      Assess: blue[baseColorLevel + 200],
      Trial: blue[baseColorLevel + 500],
      Adopt: blue[baseColorLevel + 800]
    },
    'Tools': {
      Hold: green[baseColorLevel],
      Assess: green[baseColorLevel + 200],
      Trial: green[baseColorLevel + 500],
      Adopt: green[baseColorLevel + 800]
    },
    'Platforms': {
      Hold: red[baseColorLevel],
      Assess: red[baseColorLevel + 200],
      Trial: red[baseColorLevel + 500],
      Adopt: red[baseColorLevel + 800]
    },
    'Techniques': {
      Hold: purple[baseColorLevel],
      Assess: purple[baseColorLevel + 200],
      Trial: purple[baseColorLevel + 500],
      Adopt: purple[baseColorLevel + 800]
    }
  }
  
  styleProps = { backgroundColor: colors[quadrant][ring] };

  const classes = useStyles(styleProps);

  return (
    <Card className={classes.root} onClick={props.clicked}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {name[0]}
          </Avatar>
        }
        title={name}
        subheader={ring}
        className={classes.truncate}
      />
      <CardMedia className={classes.media} title={name} />
      <CardContent className={classes.truncate}>
        <Typography variant="body2" color="textSecondary" component="p">
          Quadrant : {quadrant}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <NavLink className={classes.link} to={`/blips/edit/${_id}`} style={{ textDecoration: "none" }}>
            <EditIcon></EditIcon>
          </NavLink>
        </IconButton>
        <IconButton aria-label="share">
          <DeleteIcon
            onClick={() => {
              props.onRemoveBlip(props.blip);
            }}
          />
        </IconButton>

        <IconButton aria-label="add to favorites">
          <NavLink className={classes.link} to={`/blips/view/${_id}`} style={{ textDecoration: "none" }}>
            <VisibilityIcon />
          </NavLink>
        </IconButton>
      </CardActions>
    </Card>
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
