import React from "react";
import { render, cleanup, waitFor, fireEvent } from "@testing-library/react";
import EditEmployee, { EDIT_EMPLOYEE } from "../EditEmployee";
import type { EditEmployeeProps } from "../EditEmployee";
import type { Employee } from "../types";
import { mockEmployees } from "../utils";
import { MockedProvider } from "@apollo/client/testing";

const mocks = [
  {
    request: {
      query: EDIT_EMPLOYEE,
      variables: {
        email: mockEmployees[0].email,
        payload: {
          title: mockEmployees[0].name.title,
          first: mockEmployees[0].name.first,
          last: mockEmployees[0].name.last,
          email: mockEmployees[0].email,
        },
      },
    },
    newData: jest.fn(() => ({
      data: {
        person: {
          name: {
            first: "Niclas",
            last: "Stornes",
            title: "Mr",
          },
          email: "niclas.stornes@example.com",
          picture: {
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/78.jpg",
            large: "https://randomuser.me/api/portraits/large/men/78.jpg",
            medium: "https://randomuser.me/api/portraits/medium/men/78.jpg",
          },
        },
      },
    })),
  },
];

beforeEach(cleanup);

const employee: Employee = mockEmployees[0];

const Props: EditEmployeeProps = {
  employee,
  editFinished: jest.fn(),
};

describe("<EditEmployee />", () => {
  it("renders without crashing", async () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <EditEmployee {...Props} />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render a large profile image for the selected employee", () => {
    const { getByAltText } = render(
      <MockedProvider mocks={mocks}>
        <EditEmployee {...Props} />
      </MockedProvider>
    );
    getByAltText(/niclas-stornes/i);
  });

  it("should render an input field for the first name", () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <EditEmployee {...Props} />
      </MockedProvider>
    );
    getByTestId(/edit-employee-first-name/i);
  });

  it("should render an input field for the last name", () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <EditEmployee {...Props} />
      </MockedProvider>
    );
    getByTestId(/edit-employee-last-name/i);
  });

  it("should render an input field for the email", () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <EditEmployee {...Props} />
      </MockedProvider>
    );
    getByTestId(/edit-employee-email/i);
  });

  it("should render a save button", () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <EditEmployee {...Props} />
      </MockedProvider>
    );
    getByText(/save/i);
  });

  it("should call the edit employee mutation when the save button is pressed", async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EditEmployee {...Props} />
      </MockedProvider>
    );
    const saveButton = getByText(/save/i);
    fireEvent.click(saveButton);
    const editEmployeeMutationMock = mocks[0].newData;
    await waitFor(() => expect(editEmployeeMutationMock).toHaveBeenCalled());
  });
});
