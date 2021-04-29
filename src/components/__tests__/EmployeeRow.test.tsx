import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import EmployeeRow from "../EmployeeRow";
import { mockEmployees } from "../utils";

beforeEach(cleanup);

describe("<EmployeeRow />", () => {
  it("renders without crashing", () => {
    const { getByText, container } = render(
      <Router>
        <EmployeeRow employee={mockEmployees[1]} />
      </Router>
    );
    getByText(/erik banks/i);
    expect(container).toMatchSnapshot();
  });

  it("should render a thumbnail image for each employee", () => {
    const { getByAltText } = render(
      <Router>
        <EmployeeRow employee={mockEmployees[1]} />
      </Router>
    );
    getByAltText(/erik-banks/i);
  });

  it("should render a name for each employee", () => {
    const { getByText } = render(
      <Router>
        <EmployeeRow employee={mockEmployees[1]} />
      </Router>
    );
    getByText(/erik banks/i);
  });
});
