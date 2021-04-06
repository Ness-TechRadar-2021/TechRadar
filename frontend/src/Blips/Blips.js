import React, { Component } from "react";
import Blip from "./Blip/Blip";
import "./Blips.css";
import axios from "../axios";
import Navbar from "./Navbar/Navbar";
import Aux from '../auxilliary/Auxilliary';

class Blips extends Component {
  constructor() {
    super();
    this.state = {
      blips: [],
      error: false,
    };
    this.removeBlip = this.removeBlip.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/blips")
      .then((response) => {
        const blips = response.data;
        console.log(blips);
        const updateBlips = blips.map((blip) => {
          return {
            ...blip,
          };
        });
        this.setState({ blips: updateBlips });
        console.log(this.state.blips);
      })
      .catch((error) => {
        console.log(error);
        //this.setState({error: true});
      });
  }

  removeBlip(blipRemoved) {
    console.log(blipRemoved.description);
    axios
      .delete("/blips/" + blipRemoved._id)
      .then((deleted) => {
        console.log(deleted.data);
        console.log(deleted);
        axios.get("/blips").then((response) => {
          const blips = response.data;
          console.log(blips);
          const updateBlips = blips.map((blip) => {
            return {
              ...blip,
            };
          });
          this.setState({ blips: updateBlips });
          console.log(this.state.blips);
        });
      })
      .catch((error) => {
        console.log(error);
        //this.setState({error: true});
      });
  }

  postSelectedHandler = (_id) => {
    this.props.history.push({ pathname: "/blips/view/" + _id });
    //this.props.history.push('/' + id);
  };

  addSelectedHandler = (_id) => {
    this.props.history.push({ pathname: "/blips/new" });
    //this.props.history.push('/' + id);
  };

  render() {
    let blips = <p style={{ textAlign: "center" }}>Something went wrong</p>;
    if (!this.state.error) {
      blips = this.state.blips.map((blip, index) => {
        return (
          <div className="blip" key={index}>
            <Blip
              onRemoveBlip={this.removeBlip}
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
      <Aux className="container">
        <Navbar clicked={() => this.addSelectedHandler()} />
        {blips}
      </Aux>
    );
  }
}

export default Blips;
