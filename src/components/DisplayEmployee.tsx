import React, { useContext } from "react";
import { Redirect } from "react-router";
import { EmployeeContext } from "../App";

const DisplayEmployee: React.FC = () => {
  const { selectedEmployee } = useContext(EmployeeContext);
  if (!selectedEmployee) return <Redirect to="/" />;
  const { name, picture, email } = selectedEmployee;
  return (
    <div className="employee-display-detail">
      <div className="employee-display-header-photo">
        <img src={picture?.large} alt={`${name.first}-${name.last}`} />
      </div>
      <div className="employee-display-header-details">
        <div className="employee-display-header-name">
          {name.title} {name.full_name}
        </div>
      </div>
      <div className="employee-display-contact-info">Contact: {email}</div>
    </div>
  );
};

export default DisplayEmployee;
