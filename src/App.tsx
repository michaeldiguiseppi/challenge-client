import React, { useState, useEffect } from "react";
import "./App.css";
import EmployeeList, { Employee } from "./components/EmployeeList";
import SearchBar from "./components/SearchBar";
import { gql, useQuery } from "@apollo/client";

export const GET_PEOPLE = gql`
  query GetPeople {
    people {
      name {
        first
        last
        title
      }
      email
      picture {
        thumbnail
      }
      id
    }
  }
`;

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [people, setPeople] = useState<Employee[]>([]);
  const { loading, error, data } = useQuery(GET_PEOPLE, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (data) {
      setPeople(data.people);
      data.people.map(
        (person: Employee) =>
          person.name &&
          (person.name.full_name = `${person?.name?.first} ${person?.name?.last}`)
      );
    }
  }, [data]);

  const clearInput = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSearchValue("");
    setPeople(data.people);
  };

  const suggestionList: Employee[] = [];

  const autocomplete = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    data.people.forEach((person: Employee) => {
      if (
        person &&
        person.name &&
        person.name.full_name &&
        person.name.full_name
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      ) {
        suggestionList.push(person);
        setPeople(suggestionList);
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <h2>Error: {error.message}</h2>;

  return (
    <div className="App">
      <h3>Employee Directory</h3>
      <SearchBar
        clearInput={clearInput}
        autocomplete={autocomplete}
        value={searchValue}
      />
      <EmployeeList employees={people} />
    </div>
  );
}

export default App;
