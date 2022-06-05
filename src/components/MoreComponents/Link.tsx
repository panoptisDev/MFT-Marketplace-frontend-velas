import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const CustomLink = ({ title, navgitor, className }: any) => {
  return (
    <Link className={className} to={navgitor}>
      {title}
    </Link>
  );
};

export default CustomLink;
