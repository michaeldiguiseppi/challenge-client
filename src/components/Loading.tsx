import React from "react";
import "./stylesheets/Loading.css";

const Loading: React.FC = () => (
  <div className="loading-container">
    <div className="loading-title">
      Please wait while your data is loaded...
    </div>
    <div id="loading"></div>
  </div>
);

export default Loading;
