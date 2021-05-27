import React, { useState, useEffect } from "react";
import Radar from "../components/Radar/Radar";
import axios from "../axios/axios";

function Dashboard() {
  const [blips, setBlips] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("/blips")
      .then((response) => {
        const blips = response.data;
        setBlips(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  const setup = {
    rings: ["Adopt", "Trial", "Assess", "Hold"],
    quadrants: [
      "Platforms",
      "Programming Languages and Frameworks",
      "Tools",
      "Techniques",
    ],
    data: blips,
  };

  return (
    <div className="App">
      <Radar {...setup} />
    </div>
  );
}

export default Dashboard;
