import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { Timeline, Event } from "../../Blips/View/components/Components";
import { makeStyles } from "@material-ui/core/styles";
import Blip from '../../Blips/Blip/Blip'

const useStyles = makeStyles((theme) => ({
  p: {
    marginLeft: "2%",
  },
  containerView: {
    paddingLeft: "5%",
  },
}));

function ViewProject() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [error, setError] = useState(false)
  const classes = useStyles();

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get("/projects/" + id).then((response) => setProject(response.data)) .catch((error) => {
      console.log(error);
      setError(true);
    });;
  }, []);
  console.log( project.blips);

  let blips = <p style={{ textAlign: "center" }}>Something went wrong</p>;

  if(project.blips !== undefined) {
    blips = project.blips.map((blip, index) => {
      return (
        <div className="blip" key={index}>
          <Blip
            // onRemoveBlip={this.removeBlip}
            _id={blip._id}
            name={blip.name}
            quadrant={blip.quadrant}
            ring={blip.ring}
            description={blip.description}
            blip={blip}
            // clicked={() => this.postSelectedHandler(blip._id)}
          />{" "}
        </div>
      );
    });
  }
    
  return (
    <div className={classes.containerView}>
      <h1 className={classes.p}>{project.name}</h1>
      <Timeline>
        <Event interval="Description" title={""} subtitle={""}>
          {project.description}
        </Event>
        <Event interval="Blips" title={""} subtitle={""}>
          {blips}
        </Event>
      </Timeline>
    </div>
  );
}

export default ViewProject;
