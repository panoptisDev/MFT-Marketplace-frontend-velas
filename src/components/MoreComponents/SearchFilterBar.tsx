import React from "react";
import "./styles.css";
const SearchFilterBar = ({ label, icon, className }: any) => {
  return (
    <div className={className}>
      <input placeholder={label} type="text" />
      <div className="email-svg">{icon}</div>
    </div>
  );
};

export default SearchFilterBar;
