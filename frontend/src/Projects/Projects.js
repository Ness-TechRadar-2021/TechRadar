import React, { useState, useEffect } from "react";
import Project from "./Project/Project";
import "./Projects.css";
import axios from "../axios/axios";
import Navbar from "../components/Navbar/Navbar";
import Aux from "../auxilliary/Auxilliary";

const Projects = (props) => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  let config;
  if(currentUser) {
    config = {
    headers: {
      'x-access-token': currentUser.accessToken
    }
  }
  } 

  useEffect(() => {
    axios
      .get("/projects")
      .then((response) => {
        // const projects = response.data;
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  const removeProject = (projectRemoved) => {
    console.log(projectRemoved.description);
    axios
      .delete("/projects/" + projectRemoved._id, config)
      .then((deleted) => {
        console.log(deleted.data);
        console.log(deleted);
        axios.get("/projects").then((response) => {
          const projects = response.data;
          console.log(projects);
          const updateProjects = projects.map((project) => {
            return {
              ...project,
            };
          });
          setProjects(updateProjects);
        });
      })

      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  // const postSelectedHandler = (_id) => {
  //   props.history.push({ pathname: "/projects/view/" + _id });
  // };

  const addSelectedHandler = (_id) => {
    props.history.push({ pathname: "/projects/new" });
  };

  let Projects = <p style={{ textAlign: "center" }}>Something went wrong</p>;

  if (!error) {
    Projects = projects.map((project, index) => {
      return (
        <div className="project" key={index}>
          <Project
            onRemoveProject={removeProject}
            _id={project._id}
            name={project.name}
            description={project.description}
            project={project}
            blips={project.blips}
          />{" "}
        </div>
      );
    });
  }
  return (
    <Aux>
      {currentUser ? (
        <Navbar clicked={() => addSelectedHandler()} title="Add project" />
      ) : null}

      <div className="container">{Projects}</div>
    </Aux>
  );
};

export default Projects;
