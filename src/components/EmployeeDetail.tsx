import React, { useContext, useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Redirect, useParams } from "react-router";
// import { EmployeeContext } from "../App";
import DisplayEmployee from "./DisplayEmployee";
import EditEmployee from "./EditEmployee";

export const GET_PERSON = gql`
  query getPerson($email: String!) {
    person(email: $email) {
      name {
        first
        last
        title
      }
      email
      picture {
        large
      }
    }
  }
`;

interface ParamTypes {
  person?: string;
}

const EmployeeDetail: React.FC = () => {
  const { person } = useParams<ParamTypes>();
  const [editEmployee, setEditEmployee] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_PERSON, {
    variables: { email: decodeURIComponent(person!) },
    skip: !person,
  });

  useEffect(() => {
    refetch();
  }, [editEmployee]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {editEmployee ? (
        <EditEmployee editFinished={setEditEmployee} employee={data?.person} />
      ) : (
        <>
          <button type="button" onClick={() => setEditEmployee(!editEmployee)}>
            Edit
          </button>
          <DisplayEmployee employee={data?.person} />
        </>
      )}
    </div>
  );
};

export default EmployeeDetail;
