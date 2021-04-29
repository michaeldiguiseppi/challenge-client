import React from "react";
import "./stylesheets/SearchBar.css";

export type SearchBarProps = {
  autocomplete: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  clearInput: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  autocomplete,
  value,
  clearInput,
}) => (
  <div className="search-bar-container">
    <input
      data-testid="search-bar"
      className="search-bar-field"
      placeholder="Search employees by first or last name..."
      onChange={e => autocomplete(e)}
      value={value}
    />
    <button
      type="reset"
      className="search-bar-clear-button"
      data-testid="search-bar-clear-button"
      onClick={e => clearInput(e)}
    >
      Clear
    </button>
  </div>
);

export default SearchBar;
