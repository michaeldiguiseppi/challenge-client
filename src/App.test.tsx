import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App, { GET_PEOPLE } from "./App";
import { JsxEmit } from "typescript";

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

describe("<App />", () => {
  it("renders without crashing and shows the loading state", () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    );
    getByText(/loading/i);
  });
});
