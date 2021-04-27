import React, { Component } from "react";
import Project from "./Project/Project";
import "./Projects.css";
import axios from "../axios";
import Navbar from "../Blips/Navbar/Navbar";
import Aux from "../auxilliary/Auxilliary";

class Projects extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      error: false,
    };
    this.removeProject = this.removeProject.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/projects")
      .then((response) => {
        const projects = response.data;
        console.log(projects);
        const updateProjects = projects.map((project) => {
          return {
            ...project,
          };
        });
        this.setState({ projects: updateProjects });
        console.log(this.state.projects);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeProject(projectRemoved) {
    console.log(projectRemoved.description);
    axios
      .delete("/projects/" + projectRemoved._id)
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
          this.setState({ projects: updateProjects });
          console.log(this.state.projects);
        });
      })

      .catch((error) => {
        console.log(error);
      });
  }

  postSelectedHandler = (_id) => {
    this.props.history.push({ pathname: "/projects/view/" + _id });
  };

  addSelectedHandler = (_id) => {
    this.props.history.push({ pathname: "/projects/new" });
  };

  render() {
    let projects = <p style={{ textAlign: "center" }}>Something went wrong</p>;

    if (!this.state.error) {
      projects = this.state.projects.map((project, index) => {
        return (
          <div className="project" key={index}>
            <Project
              onRemoveProject={this.removeProject}
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
        <Navbar clicked={() => this.addSelectedHandler()} />
        <div className="container">{projects}</div>
      </Aux>
    );
  }
}

export default Projects;
