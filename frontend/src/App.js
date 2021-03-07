import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './Home';
//import Blips from './Blips';

function App() {
  return (
    <Router>
    <div>
      <Switch>
        <Route path="/"> <Home /> </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;

