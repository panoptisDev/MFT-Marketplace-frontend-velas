import React, { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import SearchFilterBar from "../MoreComponents/SearchFilterBar";
import "./styles.css";

const initialCheck = {
  listings: false,
  purchases: false,
  sales: false,
  transfers: false,
  bids: false,
  likes: false,
  followings: false,
};

const Filter = () => {
  const [checked, setChecked] = useState(initialCheck);

  const clearChecks = () => {
    setChecked(initialCheck);
  };

  const checkHandler = (e: any) => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  return (
    <div className="filter">
      <SearchFilterBar
        className="activity-filter-search email-send"
        icon={<AiOutlineSearch />}
        label="info@yourgmail.com"
      />
      <div className="filter-checkboxes">
        <div>
          <h3>Filter</h3>
          <button onClick={clearChecks} className="clear-checks">
            Clear All
          </button>
        </div>
        <div className="checkbox">
          <input
            onChange={checkHandler}
            name="listings"
            checked={checked.listings}
            type="checkbox"
          />
          <label htmlFor="">Listings</label>
        </div>
        <div className="checkbox">
          <input
            onChange={checkHandler}
            name="purchases"
            checked={checked.purchases}
            type="checkbox"
          />
          <label htmlFor="">Purchases</label>
        </div>
        <div className="checkbox">
          <input
            onChange={checkHandler}
            name="sales"
            checked={checked.sales}
            type="checkbox"
          />
          <label htmlFor="">Sales</label>
        </div>
        <div className="checkbox">
          <input
            onChange={checkHandler}
            name="transfers"
            checked={checked.transfers}
            type="checkbox"
          />
          <label htmlFor="">Transfers</label>
        </div>
        {/* <div className="checkbox">
          <input
            onChange={checkHandler}
            name="bids"
            checked={checked.bids}
            type="checkbox"
          />
          <label htmlFor="">Bids</label>
        </div> */}
        {/* <div className="checkbox">
          <input
            onChange={checkHandler}
            name="likes"
            checked={checked.likes}
            type="checkbox"
          />
          <label htmlFor="">Likes</label>
        </div>
        <div className="checkbox">
          <input
            onChange={checkHandler}
            name="followings"
            checked={checked.followings}
            type="checkbox"
          />
          <label htmlFor="">Followings</label>
        </div> */}
      </div>
    </div>
  );
};

export default Filter;
