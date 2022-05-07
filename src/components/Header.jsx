import React from "react";

const Header = ({ header }) => {
  return (
    <div className="create-slot-header">
      <div className="heading">
        <i className="fa-solid fa-bars"></i>
        <h3>{header}</h3>
      </div>
    </div>
  );
};

export default Header;
