import React from "react";

const PageIcon = ({ iconClasses }) => {
  return (
    <div className="user my-3">
      <i className={iconClasses}></i>
      <h4 className="login">Login</h4>
    </div>
  );
};

export default PageIcon;
