import React from "react";
import type { Employee } from "./types";
import { Link } from "react-router-dom";
import "./stylesheets/EmployeeRow.css";

type Props = {
  employee: Employee;
};

const default_img_url = "/images/blank_profile_image_thumb.png";

const EmployeeRow: React.FC<Props> = ({ employee }) => {
  const { name, picture, email } = employee;
  // Don't render people that don't have email addresses
  // since that is what we use for routing
  if (!email) {
    return null;
  }
  return (
    <Link to={`/people/${encodeURIComponent(email)}`}>
      <div data-testid="employee-row" className="employee-row">
        <div className="employee-row-top-container">
          <div className="employee-row-photo">
            <img
              src={picture?.thumbnail || default_img_url}
              alt={`${name?.first}-${name?.last}`}
            />
          </div>
          <div className="employee-row-name">
            {`${name?.title}. ${name?.first} ${name?.last}`}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EmployeeRow;
