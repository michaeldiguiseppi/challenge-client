import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import "./stylesheets/Home.css";
import EmployeeList from "./EmployeeList";
import SearchBar from "./SearchBar";
import type { Employee } from "./types";
import Loading from "./Loading";
import Error from "./Error";

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
        large
      }
      id
    }
  }
`;

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [people, setPeople] = useState<Employee[]>([]);
  const { loading, error, data } = useQuery(GET_PEOPLE, {
    // For some reason, when this isn't set to no-cache, i only get one user repeated 100 times.
    // Possibly due to the IDs being null from the server.
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (data) {
      setPeople(data.people);
      data.people.map((person: Employee, index: number) => {
        person.id = (index + 1).toString();
        return person;
      });
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
        person.name.first &&
        person.name.last &&
        `${person.name.first} ${person.name.last}`
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      ) {
        suggestionList.push(person);
        setPeople(suggestionList);
      }
    });
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;

  return (
    <div className="home-container">
      <div className="home-content">
        <SearchBar
          clearInput={clearInput}
          autocomplete={autocomplete}
          value={searchValue}
        />
        <EmployeeList employees={people} />
      </div>
    </div>
  );
};

export default Home;
