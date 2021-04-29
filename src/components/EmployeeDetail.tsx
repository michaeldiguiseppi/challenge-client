import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import DisplayEmployee from "./DisplayEmployee";
import EditEmployee from "./EditEmployee";
import "./stylesheets/EditAndDisplayEmployee.css";

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
  }, [editEmployee, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="employee-detail">
      {editEmployee ? (
        <EditEmployee editFinished={setEditEmployee} employee={data?.person} />
      ) : (
        <>
          <button
            className="edit-button"
            type="button"
            onClick={() => setEditEmployee(!editEmployee)}
          >
            Edit
          </button>
          <DisplayEmployee employee={data?.person} />
        </>
      )}
    </div>
  );
};

export default EmployeeDetail;
