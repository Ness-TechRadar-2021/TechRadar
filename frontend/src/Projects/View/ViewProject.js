import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/axios";
import { Timeline, Event } from "../../Blips/View/components/Components";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  p: {
    marginLeft: "2%",
  },
  containerView: {
    paddingLeft: "5%",
  },
  divP: {
    width: "200px",
    overflow: "hidden",
    display: "inline-block",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  root: {
    minWidth: 100,
    backgroundColor: "transparent",
    color: "black",
    border: "1px solid black",
    marginBottom: "10px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    color: "black",
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
}));

function ViewProject() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  // const [error, setError] = useState(false);
  const classes = useStyles();
  const [Blips, setBlips] = useState([]);

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios
      .get("/projects/" + id)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.log(error);
        // setError(true);
      });
  }, []);

  useEffect(() => {
    if (project.blips !== undefined)
      project.blips.map((Blipid) => {
        axios
          .get("/blips/" + Blipid)
          .then((response) => {
            setBlips((oldBlips) => [...oldBlips, response.data]);
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
            // setError(true);
          });
      });
  }, [project.blips]);

  let blips = <p style={{ textAlign: "center" }}>Something went wrong</p>;

  if (Blips !== undefined) {
    blips = Blips.map((blip, index) => {
      return (
        <Card key={index} className={classes.root}>
          <CardContent>
            <Typography
              noWrap
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {blip.name}
            </Typography>
            <Typography noWrap variant="body2" component="p">
              {blip.description}
            </Typography>
          </CardContent>
          <CardActions>
            <NavLink
              className={classes.link}
              to={`/blips/view/${blip._id}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="outlined"
                color="primary"
                // style={{ color: "ghostwhite" }}
                size="small"
              >
                Learn More
              </Button>
            </NavLink>
          </CardActions>
        </Card>
      );
    });
  }

  return (
    <div className={classes.containerView}>
      <h1 className={classes.divP} className={classes.p}>
        {project.name}
      </h1>
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
