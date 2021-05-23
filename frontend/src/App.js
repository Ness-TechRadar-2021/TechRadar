import './App.css';
import React from "react";
import {Router, Switch, Route} from "react-router-dom";
import Layout from './components/Layout/Layout';
import { createBrowserHistory } from "history";

function App() {
  const hist = createBrowserHistory();
  return (
  <Router history={hist}>
    <Switch>
      <Route path="/" component={Layout} />
    </Switch>
  </Router>
  );
}

export default App;

