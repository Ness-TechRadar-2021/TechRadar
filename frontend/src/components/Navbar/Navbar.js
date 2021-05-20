import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={props.clicked}
      >
        {props.title}
      </Button>
    </div>
  );
};

export default Navbar;
