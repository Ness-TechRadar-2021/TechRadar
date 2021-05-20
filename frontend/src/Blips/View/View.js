import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/axios";
import { Timeline, Event } from "./components/Components";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  p: {
    marginLeft: "2%",
  },
  containerView: {
    paddingLeft: "5%"
  }
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
    <div className={classes.containerView}>
      <h1 className={classes.p}>{blip.name}</h1>
      <p className={classes.p}>{blip.quadrant}</p>
      <Timeline>
        <Event interval={blip.ring} title={""} subtitle={""}>
          {blip.description}
        </Event>
      </Timeline>
    </div>
  );
}

export default View;