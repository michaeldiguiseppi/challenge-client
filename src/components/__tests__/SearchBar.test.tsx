import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import SearchBar, { SearchBarProps } from "../SearchBar";

beforeEach(cleanup);

const searchBarProps: SearchBarProps = {
  autocomplete: jest.fn(),
  value: "",
  clearInput: jest.fn(),
};

describe("<SearchBar />", () => {
  it("renders without crashing", () => {
    render(<SearchBar {...searchBarProps} />);
  });

  it("should render a search bar", () => {
    const { getByTestId } = render(<SearchBar {...searchBarProps} />);
    getByTestId(/^search-bar$/);
  });

  xit("should call the autocomplete function from props when changing the input value of the search bar", () => {});

  xit("should call the autocomplete function from props the same number of times as characters input to the search bar", () => {});

  it("should render a clear input button", () => {
    const { getByTestId } = render(<SearchBar {...searchBarProps} />);
    getByTestId(/search-bar-clear-button/);
  });

  it("should clear the search bar when the clear button is pressed", () => {
    const { getByTestId } = render(<SearchBar {...searchBarProps} />);
    const searchBarField = getByTestId(/^search-bar$/);
    const clearButton = getByTestId(/search-bar-clear-button/);
    fireEvent.change(searchBarField, { target: { value: "a" } });
    fireEvent.click(clearButton);
    expect(searchBarProps.clearInput).toHaveBeenCalledTimes(1);
  });
});
