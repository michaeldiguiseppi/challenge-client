import React from "react";
import EmployeeRow from "./EmployeeRow";
import type { Employee } from "./types";

type Props = {
  employees: Employee[];
};

const EmployeeList: React.FC<Props> = ({ employees }) => (
  <div>
    {employees.map((employee, index) => (
      <EmployeeRow employee={employee} key={index} />
    ))}
  </div>
);

export default EmployeeList;
