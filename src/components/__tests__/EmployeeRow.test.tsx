import React from "react";
import { render, cleanup } from "@testing-library/react";
import EmployeeRow from "../EmployeeRow";
import { mockEmployees } from "./EmployeeList.test";

beforeEach(cleanup);

describe("<EmployeeRow />", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<EmployeeRow employee={mockEmployees[1]} />);
    getByText(/erik banks/i);
  });

  it("should render a thumbnail image for each employee", () => {
    const { getByAltText } = render(
      <EmployeeRow employee={mockEmployees[1]} />
    );
    getByAltText(/erik-banks/i);
  });

  it("should render the email address for each employee", () => {
    const { getByText } = render(<EmployeeRow employee={mockEmployees[1]} />);
    getByText(/erik.banks@example.com/i);
  });
});
