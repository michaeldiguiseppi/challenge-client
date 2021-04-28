import React, { useContext } from "react";
import { Redirect } from "react-router";
import { EmployeeContext } from "../App";

const EmployeeDetail: React.FC = () => {
  const { selectedEmployee } = useContext(EmployeeContext);
  if (!selectedEmployee) return <Redirect to="/" />;
  const { name, picture, email } = selectedEmployee;
  return (
    <div className="employee-detail">
      <div className="employee-header-photo">
        <img src={picture?.large} alt={`${name.first}-${name.last}`} />
      </div>
      <div className="employee-header-details">
        <div className="employee-header-name">
          {name.title} {name.full_name}
        </div>
        <div className="employee-header-buttons">
          <button
            type="button"
            onClick={() => console.log("Edit button clicked")}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="employee-contact-info">Contact: {email}</div>
    </div>
  );
};

export default EmployeeDetail;
