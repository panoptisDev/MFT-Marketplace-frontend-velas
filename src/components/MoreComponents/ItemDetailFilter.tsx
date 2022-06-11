import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";

const initialCheck = {
  listings: false,
  offers: false,
  sales: false,
  transfers: false,
};

const ItemDetailFilter = () => {
  const [checked, setChecked] = useState(initialCheck);

  const clearChecks = () => {
    setChecked(initialCheck);
  };

  //   const filteredCards = (e: any): void => {
  //     !statusButtonsFilter.includes(e.target.value) &&
  //       setStatusButtonsFilter([...statusButtonsFilter, e.target.value]);
  //   };

  const checkHandler = (e: any) => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  const closeFilterdTag = (param: any) => {
    setChecked({ ...checked, [param]: false });
  };

  return (
    <>
      <div className="item-detail-filter">
        <Dropdown>
          <Dropdown.Toggle
            //   value={first}
            //   onChange={handleSelect}
            name="first"
            style={{
              width: "99%",
              backgroundColor: "#3e3e49",
              margin: "0 auto",
            }}
            id="dropdown-button-dark-example1"
            variant="secondary"
          >
            Filter
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{
              width: "99%",
              backgroundColor: "#3e3e49",
              margin: "0 auto",
            }}
            variant="dark"
          >
            <Dropdown.Item href="#/ac tion-1">
              <div className="checkbox">
                <input
                  onChange={checkHandler}
                  name="listings"
                  checked={checked.listings}
                  type="checkbox"
                />
                <label htmlFor="">Listings</label>
              </div>
            </Dropdown.Item>
            <Dropdown.Item href="#/ac tion-1">
              <div className="checkbox">
                <input
                  onChange={checkHandler}
                  name="offers"
                  checked={checked.offers}
                  type="checkbox"
                />
                <label htmlFor="">Offers</label>
              </div>
            </Dropdown.Item>
            <Dropdown.Item href="#/ac tion-1">
              <div className="checkbox">
                <input
                  onChange={checkHandler}
                  name="sales"
                  checked={checked.sales}
                  type="checkbox"
                />
                <label htmlFor="">Sales</label>
              </div>
            </Dropdown.Item>
            <Dropdown.Item href="#/ac tion-1">
              <div className="checkbox">
                <input
                  onChange={checkHandler}
                  name="transfers"
                  checked={checked.transfers}
                  type="checkbox"
                />
                <label htmlFor="">Transfers</label>
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {checked.listings ||
        checked.offers ||
        checked.sales ||
        checked.transfers ? (
          <div>
            <button
              onClick={clearChecks}
              className="clear-checks item-details-clear-filers"
            >
              Clear All
            </button>
            <div className="filter-displayed-data">
              {checked.listings && (
                <p onClick={(listings) => closeFilterdTag(listings)}>
                  Listings <AiOutlineClose />
                </p>
              )}
              {checked.offers && (
                <p onClick={(offers) => closeFilterdTag(offers)}>
                  Offers <AiOutlineClose />
                </p>
              )}
              {checked.transfers && (
                <p onClick={(transfers) => closeFilterdTag(transfers)}>
                  Transfers <AiOutlineClose />
                </p>
              )}
              {checked.sales && (
                <p onClick={(sales) => closeFilterdTag(sales)}>
                  Sales <AiOutlineClose />
                </p>
              )}
            </div>
          </div>
        ) : undefined}
      </div>
    </>
  );
};

export default ItemDetailFilter;
