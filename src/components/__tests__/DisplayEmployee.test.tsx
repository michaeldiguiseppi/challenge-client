import React from "react";
import { render, cleanup } from "@testing-library/react";
import DisplayEmployee from "../DisplayEmployee";
import type { Employee } from "../types";
import { mockEmployees } from "../utils";

beforeEach(cleanup);

const employee: Employee = mockEmployees[1];

describe("<DisplayEmployee />", () => {
  it("renders without crashing", async () => {
    const { container } = render(<DisplayEmployee employee={employee} />);
    expect(container).toMatchSnapshot();
  });

  it("should render a large profile image for the selected employee", () => {
    const { getByAltText } = render(<DisplayEmployee employee={employee} />);
    getByAltText(/erik-banks/i);
  });

  it("should render the full name of the selected employee", () => {
    const { getByText } = render(<DisplayEmployee employee={employee} />);
    getByText(/erik banks/i);
  });

  it("should render the contact email for the selected employee", () => {
    const { getByText } = render(<DisplayEmployee employee={employee} />);
    getByText(/contact:/i);
    getByText(/erik.banks@example.com/i);
  });
});
