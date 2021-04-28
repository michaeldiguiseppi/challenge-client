import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import EmployeeDetail from "../EmployeeDetail";
import type { Employee } from "../types";
import { mockEmployees } from "../utils";
import { EmployeeContext } from "../../App";
import type { EmployeeContextType } from "../../App";

beforeEach(cleanup);

const renderEmployeeDetailWithContext = ({
  selectedEmployee,
  selectEmployee,
}: EmployeeContextType) => {
  return render(
    <Router>
      <EmployeeContext.Provider value={{ selectedEmployee, selectEmployee }}>
        <EmployeeDetail />
      </EmployeeContext.Provider>
    </Router>
  );
};

const selectedEmployee: Employee = mockEmployees[1];

describe("<EmployeeDetail />", () => {
  it("renders without crashing", () => {
    const { getByText } = renderEmployeeDetailWithContext({
      selectedEmployee,
      selectEmployee: jest.fn(),
    });
    getByText(/erik banks/i);
  });

  it("should render a large profile image for the selected employee", () => {
    const { getByAltText } = renderEmployeeDetailWithContext({
      selectedEmployee,
      selectEmployee: jest.fn(),
    });
    getByAltText(/erik-banks/i);
  });

  it("should render the full name of the selected employee", () => {
    const { getByText } = renderEmployeeDetailWithContext({
      selectedEmployee,
      selectEmployee: jest.fn(),
    });
    getByText(/erik banks/i);
  });

  it("should render the contact email for the selected employee", () => {
    const { getByText } = renderEmployeeDetailWithContext({
      selectedEmployee,
      selectEmployee: jest.fn(),
    });
    getByText(/contact:/i);
    getByText(/erik.banks@example.com/i);
  });

  it("should render an edit button", () => {
    const { getByText } = renderEmployeeDetailWithContext({
      selectedEmployee,
      selectEmployee: jest.fn(),
    });
    getByText(/edit/i);
  });
});
