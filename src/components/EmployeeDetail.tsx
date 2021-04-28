import React, { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Redirect } from "react-router";
import { EmployeeContext } from "../App";
import DisplayEmployee from "./DisplayEmployee";
import EditEmployee from "./EditEmployee";

const EmployeeDetail: React.FC = () => {
  const [editEmployee, setEditEmployee] = useState(false);
  const { selectedEmployee } = useContext(EmployeeContext);

  if (!selectedEmployee) return <Redirect to="/" />;

  if (!selectedEmployee) return <Redirect to="/" />;
  return (
    <div>
      {editEmployee ? (
        <EditEmployee editFinished={setEditEmployee} />
      ) : (
        <>
          <button type="button" onClick={() => setEditEmployee(!editEmployee)}>
            Edit
          </button>
          <DisplayEmployee />
        </>
      )}
    </div>
  );
};

export default EmployeeDetail;
