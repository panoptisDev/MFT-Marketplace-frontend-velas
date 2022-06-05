import React, { useState } from "react";

import "./styles.css";
import { ReactComponent as Magnifier } from "../../assets/icons/magnifier.svg";
import { AiOutlineSearch } from "react-icons/ai";
const Search = () => {
  const [showSearch, setShowSearch] = useState(false);
  const handleClick = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="search-component">
      <Magnifier onClick={handleClick} />
      {showSearch && (
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <AiOutlineSearch />
        </div>
      )}
    </div>
  );
};

export default Search;
