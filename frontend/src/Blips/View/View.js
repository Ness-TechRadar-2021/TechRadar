import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { Timeline, Event } from "./components/Components";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  p: {
    marginLeft: "2%",
  },
}));

function View() {
  const { id } = useParams();
  const [blip, setBlip] = useState({});
  const classes = useStyles();

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get("/blips/" + id).then((response) => setBlip(response.data));
  }, []);

  return (
    <Fragment>
      <h1 className={classes.p}>{blip.name}</h1>
      <p className={classes.p}>{blip.quadrant}</p>
      <Timeline>
        <Event interval={blip.ring} title={""} subtitle={""}>
          {/* {blip.ring} */}
          {blip.description}
        </Event>
        {/* <Event interval={"Description"} title={""} subtitle={""}>
                {blip.description}
              </Event> */}
      </Timeline>
    </Fragment>
  );
}

export default View;
