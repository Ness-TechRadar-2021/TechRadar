/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "../../style/footerStyle";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  // var visibilityState = props.vis ? "visible" : "hidden"  ;
  // style={{visibility: visibilityState}}
  return (
    <footer  className={classes.footer} >
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
          <ListItem className={classes.inlineBlock}>
              <a href="/" className={classes.block}>
                Dashboard
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/blips" className={classes.block}>
                Blips
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/projects" className={classes.block}>
                Projects
              </a>
            </ListItem>
          </List>
        </div>
      </div>
    </footer>
  );
}
