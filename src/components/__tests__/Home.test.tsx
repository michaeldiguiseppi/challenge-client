import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Home, { GET_PEOPLE } from "../Home";

beforeEach(cleanup);

const mocks = [
  {
    request: {
      query: GET_PEOPLE,
    },
    result: {
      data: {
        people: [
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
        ],
      },
    },
  },
];

describe("<Home />", () => {
  it("renders without crashing and shows the loading state", () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <Home />
      </MockedProvider>
    );
    getByText(/Please wait while your data is loaded/i);
  });
});
