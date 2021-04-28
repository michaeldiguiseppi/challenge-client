import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Home from "./components/Home";
import EmployeeDetail from "./components/EmployeeDetail";
import type { Employee } from "./components/types";

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
      <EmployeeContext.Provider value={{ selectedEmployee, selectEmployee }}>
        <div className="navbar">
          <div className="navbar-container">
            <div className="navbar-link">
              {selectedEmployee ? (
                <Link
                  to="/"
                  className="back-button"
                  onClick={() => selectEmployee(undefined)}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
              ) : null}
            </div>
          </div>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/people/:person">
              <EmployeeDetail />
            </Route>
          </Switch>
        </div>
      </EmployeeContext.Provider>
    </Router>
  );
};

export default App;
