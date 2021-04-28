import React from "react";
import EmployeeRow from "./EmployeeRow";

export type Employee = {
  name?: {
    first?: string;
    last?: string;
    title?: string;
    full_name?: string;
  };
  email?: string;
  picture?: {
    thumbnail?: string;
    large?: string;
    medium?: string;
  };
  id?: string | null;
};

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
