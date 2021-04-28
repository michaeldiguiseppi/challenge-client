import React from "react";
import { Employee } from "./EmployeeList";
import "./EmployeeRow.css";

type Props = {
  employee: Employee;
};

const default_img_url = "/images/blank_profile_image_thumb.png";

const EmployeeRow: React.FC<Props> = ({ employee }) => {
  const { name, email, picture } = employee;
  return (
    <div data-testid="employee-row" className="employee-row">
      <div className="employee-row-top-container">
        <div className="employee-row-photo">
          <img
            src={picture?.thumbnail || default_img_url}
            alt={`${name?.first}-${name?.last}`}
          />
        </div>
        <h4>{`${name?.title}. ${name?.first} ${name?.last}`}</h4>
      </div>
      <div className="employee-row-bottom-container">
        <p>Email: {email}</p>
      </div>
    </div>
  );
};

export default EmployeeRow;
