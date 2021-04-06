import './App.css';
import React from "react";
import {Router, Switch, Route} from "react-router-dom";
import Admin from './Admin';
import { createBrowserHistory } from "history";

function App() {
  const hist = createBrowserHistory();
  return (
  <Router history={hist}>
    <Switch>
      <Route path="/" component={Admin} />
    </Switch>
  </Router>
  );
}

export default App;

