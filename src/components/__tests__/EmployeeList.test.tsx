import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import EmployeeList from "../EmployeeList";
import { mockEmployees } from "../utils";

beforeEach(cleanup);

describe("<EmployeeList />", () => {
  it("renders without crashing", () => {
    render(
      <Router>
        <EmployeeList employees={mockEmployees} />
      </Router>
    );
  });

  it("should render a list of employees", () => {
    const { getByText } = render(
      <Router>
        <EmployeeList employees={mockEmployees} />
      </Router>
    );
    getByText(/niclas stornes/i);
  });

  it("should have the same number of rows as employees passed in", () => {
    const { getAllByTestId } = render(
      <Router>
        <EmployeeList employees={mockEmployees} />
      </Router>
    );
    const employeeRows = getAllByTestId(/employee-row/i);
    expect(employeeRows).toHaveLength(3);
  });
});
