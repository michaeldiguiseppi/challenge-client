import React from "react";
import type { Employee } from "./types";

type Props = {
  employee: Employee;
};

const DisplayEmployee: React.FC<Props> = ({ employee }) => {
  const { name, picture, email } = employee;
  return (
    <div className="employee-display-detail">
      <div className="employee-display-header-photo">
        <img src={picture?.large} alt={`${name.first}-${name.last}`} />
      </div>
      <div className="employee-display-header-details">
        <div className="employee-display-header-name">
          {`${name.title} ${name.first} ${name.last}`}
        </div>
      </div>
      <div className="employee-display-contact-info">Contact: {email}</div>
    </div>
  );
};

export default DisplayEmployee;
