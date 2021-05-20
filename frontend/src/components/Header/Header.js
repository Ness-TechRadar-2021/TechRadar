import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    alignItems: "flex-end",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const islogged = true;
  return (
    <div className={classes.root}>
      <AppBar
        color="transparent"
        position="static"
        className={classes.container}
      >
        <Toolbar variant="dense">
          {islogged ? (
            <Button color="inherit">Login</Button>
          ) : (
            <div>
              <Button color="inherit">User</Button>
              <Button color="inherit">Logout</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
