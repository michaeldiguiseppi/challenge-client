import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import EmployeeDetail from "./components/EmployeeDetail";
import "./App.css";

const App: React.FC = () => (
  <Router>
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-title">Employee Directory</div>
        <Link to="/" className="navbar-link">
          Home
        </Link>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/people/:person">
          <EmployeeDetail />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
