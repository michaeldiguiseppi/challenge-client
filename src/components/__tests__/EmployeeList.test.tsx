import React from "react";
import { getByTestId, render } from "@testing-library/react";
import EmployeeList, { Employee } from "../EmployeeList";

export const mockEmployees: Employee[] = [
  {
    name: {
      first: "Niclas",
      last: "Stornes",
      title: "Mr",
    },
    email: "niclas.stornes@example.com",
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/78.jpg",
    },
    id: null,
  },
  {
    name: {
      first: "Erik",
      last: "Banks",
      title: "Mr",
    },
    email: "erik.banks@example.com",
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/67.jpg",
      large: "https://randomuser.me/api/portraits/men/67.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/67.jpg",
    },
    id: null,
  },
  {
    name: {
      first: "Andrea",
      last: "Crespo",
      title: "Mrs",
    },
    email: "andrea.crespo@example.com",
    picture: {
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/41.jpg",
      large: "https://randomuser.me/api/portraits/women/41.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/41.jpg",
    },
    id: null,
  },
];

describe("<EmployeeList />", () => {
  it("renders without crashing", () => {
    render(<EmployeeList employees={mockEmployees} />);
  });

  it("should render a list of employees", () => {
    const { getByText } = render(<EmployeeList employees={mockEmployees} />);
    // Get the name of the first user in the list
    getByText(/niclas stornes/i);
  });

  it("should have the same number of rows as employees passed in", () => {
    const { getAllByTestId } = render(
      <EmployeeList employees={mockEmployees} />
    );
    // Get all rows in the employee list
    const employeeRows = getAllByTestId(/employee-row/i);
    // Expect there to be 3 rows since there are 3 employees passed in.
    expect(employeeRows).toHaveLength(3);
  });
});
