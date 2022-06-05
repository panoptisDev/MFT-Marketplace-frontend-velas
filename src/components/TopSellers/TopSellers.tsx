import React from "react";
import Title from "../Title/Title";
import "./styles.css";
import { AiOutlineCheck } from "react-icons/ai";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const data = [
    { name: "Harper Wilcher", price: "214.2ETH" },
    { name: "Harper Wilcher", price: "214.2ETH" },
    { name: "Harper Wilcher", price: "214.2ETH" },
    { name: "Harper Wilcher", price: "214.2ETH" },
    { name: "Harper Wilcher", price: "214.2ETH" },
    { name: "Harper Wilcher", price: "214.2ETH" },
    { name: "Harper Wilcher", price: "214.2ETH" },
    { name: "Harper Wilcher", price: "214.2ETH" },
    { name: "Harper Wilcher", price: "214.2ETH" },
    { name: "Harper Wilcher", price: "214.2ETH" },
    { name: "Harper Wilcher", price: "214.2ETH" },
    { name: "Harper Wilcher", price: "214.2ETH" },
  ];

  return (
    <div className="top-sellers">
      <Title title="Top Seller" />
      <div className="sellers">
        {data.map((item, index) => (
          <div key={index} className="each-seller">
            <div className="seller-left">
              <div>
                <AiOutlineCheck />
              </div>
            </div>
            <div className="seller-right">
              <Link to="/">
                <h6>{item.name}</h6>
              </Link>
              <span>{item.price}</span>
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellers;
