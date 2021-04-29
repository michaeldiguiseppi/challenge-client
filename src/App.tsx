import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import EmployeeDetail from "./components/EmployeeDetail";
import type { Employee } from "./components/types";
import "./App.css";

export type EmployeeContextType = {
  selectEmployee: (employee: Employee) => void;
  selectedEmployee: Employee | undefined;
};

export const EmployeeContext = createContext<EmployeeContextType>({
  selectEmployee: () => {},
  selectedEmployee: undefined,
});

const App: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<
    Employee | undefined
  >(undefined);

  const selectEmployee = (employee?: Employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <Router>
      <div className="navbar-container">
        <nav className="navbar">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <div className="navbar-title">Employee Directory</div>
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
};

export default App;
