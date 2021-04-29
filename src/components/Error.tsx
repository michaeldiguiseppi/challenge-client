import React from "react";
import "./stylesheets/Error.css";

type Props = {
  error: string;
};

const Error: React.FC<Props> = ({ error }) => (
  <div className="error-container">
    <div className="error-title">
      Sorry, we encountered the following error: {error}
    </div>
  </div>
);

export default Error;
